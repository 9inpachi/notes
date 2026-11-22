use anyhow::anyhow;
use axum::{extract::Request, http::header, middleware::Next, response::Response};
use jsonwebtoken::{DecodingKey, Validation};

use crate::{api::auth::model::JwtClaims, error::AppError};

pub async fn require_auth(mut req: Request, next: Next) -> Result<Response, AppError> {
  let access_token = req
    .headers()
    .get(header::AUTHORIZATION)
    .and_then(|header| header.to_str().ok())
    .and_then(|value| value.strip_prefix("Bearer "))
    .ok_or(AppError::Unauthorized(
      "Missing or invalid access token".to_string(),
    ))?;

  let jwt_secret = std::env::var("JWT_SECRET").map_err(|error| anyhow!(error))?;
  let secret = DecodingKey::from_secret(jwt_secret.as_bytes()).map_err(|error| anyhow!(error))?;

  let claims = jsonwebtoken::decode::<JwtClaims>(access_token, &secret, &Validation::default())
    .map(|data| data.claims)
    .map_err(|_| AppError::Unauthorized("Invalid access token".to_string()))?;

  req.extensions_mut().insert(claims);

  Ok(next.run(req).await)
}
