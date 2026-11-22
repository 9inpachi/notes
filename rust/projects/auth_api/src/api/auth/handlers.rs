use std::time::{SystemTime, UNIX_EPOCH};

use anyhow::anyhow;
use argon2::{
  Argon2, PasswordVerifier,
  password_hash::{Error as HashError, phc::PasswordHash},
};
use axum::{Extension, Json, extract::State, http::StatusCode};
use jsonwebtoken::{EncodingKey, Header};

use crate::{
  api::auth::model::{JwtClaims, LoginRequest, TokensResponse},
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
  Extension(jwt_claims): Extension<JwtClaims>,
) -> Result<(StatusCode, Json<TokensResponse>), AppError> {
  let (access_token, refresh_token) = get_auth_tokens(&jwt_claims.sub)?;

  Ok((
    StatusCode::OK,
    Json(TokensResponse {
      access_token,
      refresh_token,
    }),
  ))
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
    exp: now * 60 * 60,
  };
  let access_token =
    jsonwebtoken::encode(&header, &access_token_claims, &secret).map_err(|error| anyhow!(error))?;

  let refresh_token_claims = JwtClaims {
    sub: username.clone(),
    // 7 days
    exp: now * 7 * 24 * 60 * 60,
  };
  let refresh_token = jsonwebtoken::encode(&header, &refresh_token_claims, &secret)
    .map_err(|error| anyhow!(error))?;

  Ok((access_token, refresh_token))
}
