use std::time::{SystemTime, UNIX_EPOCH};

use anyhow::anyhow;
use argon2::{
  Argon2, PasswordVerifier,
  password_hash::{Error as HashError, phc::PasswordHash},
};
use axum::{
  Extension, Json,
  extract::State,
  http::{HeaderMap, StatusCode, header},
};
use jsonwebtoken::{
  DecodingKey, EncodingKey, Header, Validation,
  errors::{Error, ErrorKind},
};
use serde_json::{Value, json};

use crate::{
  api::{
    auth::model::{LoginRequest, TokensResponse},
    common::model::{JwtClaims, TokenType},
  },
  error::AppError,
  state::AppState,
};

pub async fn login_user(
  State(state): State<AppState>,
  Json(body): Json<LoginRequest>,
) -> Result<(StatusCode, Json<TokensResponse>), AppError> {
  tracing::info!("Received request for login from username {}", body.username);

  let password_hash: String =
    sqlx::query_scalar("SELECT password_hash FROM users where username = $1")
      .bind(&body.username)
      .fetch_optional(&state.db)
      .await
      .map_err(|error| anyhow!(error))?
      .ok_or(AppError::Unauthorized(
        "Invalid username or password".to_string(),
      ))?;

  verify_password(body.password, password_hash)?;

  let (access_token, refresh_token) = get_auth_tokens(&body.username)?;

  Ok((
    StatusCode::OK,
    Json(TokensResponse {
      access_token,
      refresh_token,
    }),
  ))
}

pub async fn refresh_token(
  headers: HeaderMap,
) -> Result<(StatusCode, Json<TokensResponse>), AppError> {
  tracing::info!("Received request to refresh token");

  let refresh_token = headers
    .get(header::AUTHORIZATION)
    .and_then(|header| header.to_str().ok())
    .and_then(|value| value.strip_prefix("Bearer "))
    .ok_or(AppError::Unauthorized(
      "Missing or invalid refresh token".to_string(),
    ))?;

  let jwt_secret = std::env::var("JWT_SECRET").map_err(|error| anyhow!(error))?;
  let secret = DecodingKey::from_secret(jwt_secret.as_bytes()).map_err(|error| anyhow!(error))?;

  let jwt_claims =
    jsonwebtoken::decode::<JwtClaims>(refresh_token, &secret, &Validation::default())
      .and_then(|data| match data.claims.typ {
        TokenType::Refresh => Ok(data.claims),
        _ => Err(Error::from(ErrorKind::InvalidToken)),
      })
      .map_err(|_| AppError::Unauthorized("Invalid refresh token".to_string()))?;

  tracing::info!("Received refresh token with the following claims: {jwt_claims:?}");

  // If JWT is successfully verified, then generate a new set of tokens.
  let (access_token, refresh_token) = get_auth_tokens(&jwt_claims.sub)?;

  Ok((
    StatusCode::OK,
    Json(TokensResponse {
      access_token,
      refresh_token,
    }),
  ))
}

pub async fn authenticated_me(
  Extension(jwt_claims): Extension<JwtClaims>,
) -> Result<(StatusCode, Json<Value>), AppError> {
  Ok((StatusCode::OK, Json(json!({ "username": jwt_claims.sub }))))
}

fn verify_password(password: String, password_hash: String) -> Result<(), AppError> {
  let parsed_hash = PasswordHash::new(&password_hash)
    .map_err(|error| anyhow!("Stored password hash is invalid: {error}"))?;

  Argon2::default()
    .verify_password(password.as_bytes(), &parsed_hash)
    .map_err(|error| match error {
      HashError::PasswordInvalid => {
        AppError::Unauthorized("Invalid username or password".to_string())
      }
      other => anyhow!("Password verification failed: {other}").into(),
    })?;

  Ok(())
}

fn get_auth_tokens(username: &String) -> Result<(String, String), AppError> {
  let jwt_secret = std::env::var("JWT_SECRET").map_err(|error| anyhow!(error))?;

  let now = SystemTime::now()
    .duration_since(UNIX_EPOCH)
    .unwrap()
    .as_secs() as usize;
  let header = Header::default();
  let secret = EncodingKey::from_secret(jwt_secret.as_bytes()).map_err(|error| anyhow!(error))?;

  let access_token_claims = JwtClaims {
    sub: username.clone(),
    // 1 hour
    exp: now + 60 * 60,
    typ: TokenType::Access,
  };
  let access_token =
    jsonwebtoken::encode(&header, &access_token_claims, &secret).map_err(|error| anyhow!(error))?;

  let refresh_token_claims = JwtClaims {
    sub: username.clone(),
    // 7 days
    exp: now + 7 * 24 * 60 * 60,
    typ: TokenType::Refresh,
  };
  let refresh_token = jsonwebtoken::encode(&header, &refresh_token_claims, &secret)
    .map_err(|error| anyhow!(error))?;

  Ok((access_token, refresh_token))
}
