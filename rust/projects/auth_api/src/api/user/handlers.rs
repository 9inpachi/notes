use anyhow::anyhow;
use argon2::{Argon2, PasswordHasher};
use axum::{Json, extract::State, http::StatusCode};

use crate::{
  api::user::model::{CreateUserRequest, CreateUserResponse, CreateUserStatus},
  error::AppError,
  state::AppState,
};

pub async fn create_user(
  State(s): State<AppState>,
  Json(body): Json<CreateUserRequest>,
) -> Result<(StatusCode, Json<CreateUserResponse>), AppError> {
  tracing::info!(
    "Received user creation request for username {}",
    body.username
  );

  let password_hash = get_password_hash(body.password)?;

  Ok((
    StatusCode::CREATED,
    Json(CreateUserResponse {
      username: "test".into(),
      status: CreateUserStatus::Success.into(),
    }),
  ))
}

fn get_password_hash(raw_password: String) -> Result<String, AppError> {
  // Argon2 initialization with a random salt.
  let argon2 = Argon2::default();

  let password_hash = argon2
    .hash_password(raw_password.as_bytes())
    .map_err(|e| AppError::Internal(anyhow!("Failed to hash password: {e:#}")))?;

  Ok(password_hash.to_string())
}
