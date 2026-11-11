use anyhow::anyhow;
use argon2::{Argon2, PasswordHasher};
use axum::{Json, extract::State, http::StatusCode};
use regex::Regex;

use crate::{
  api::user::model::{CreateUserRequest, CreateUserResponse, CreateUserStatus},
  error::AppError,
  state::AppState,
};

pub async fn create_user(
  State(state): State<AppState>,
  Json(body): Json<CreateUserRequest>,
) -> Result<(StatusCode, Json<CreateUserResponse>), AppError> {
  tracing::info!(
    "Received user creation request for username {}",
    body.username
  );

  validate_user(&body)?;

  let password_hash = get_password_hash(body.password)?;

  sqlx::query("INSERT INTO users (username, full_name, password_hash) VALUES ($1, $2, $3) RETURNING username;")
      .bind(&body.username)
      .bind(&body.full_name)
      .bind(&password_hash)
      .execute(&state.db)
      .await
      .map_err(|e| match e {
        // If the error is because of a UNIQUE contraint violation, then return
        // "CONFLICT" status code.
        sqlx::Error::Database(err) if err.is_unique_violation() => {
          AppError::Conflict("Username already exists".to_string())
        }
        _ => AppError::Internal(anyhow!("Error creating user")),
      })?;

  tracing::info!("Successfully created user with username {}", body.username);

  Ok((
    StatusCode::CREATED,
    Json(CreateUserResponse {
      username: body.username,
      status: CreateUserStatus::Success,
    }),
  ))
}

fn validate_user(request: &CreateUserRequest) -> Result<(), AppError> {
  let username_re = Regex::new(r"^[a-zA-Z0-9_]{3,20}$").unwrap();
  if !username_re.is_match(&request.username) {
    return Err(AppError::BadRequest("Invalid username".to_string()));
  }

  let full_name_re = Regex::new(r"^[\p{L}]+(?:[ '-][\p{L}]+)*$").unwrap();
  if !full_name_re.is_match(&request.full_name) {
    return Err(AppError::BadRequest("Invalid full_name".to_string()));
  }

  let password_re = Regex::new(r"^[A-Za-z0-9!@#$%^&*()_+\-=.,?]{8,}$").unwrap();
  if !password_re.is_match(&request.password) {
    return Err(AppError::BadRequest("Invalid password".to_string()));
  }

  Ok(())
}

fn get_password_hash(raw_password: String) -> Result<String, AppError> {
  // Argon2 initialization with a random salt.
  let argon2 = Argon2::default();

  let password_hash = argon2
    .hash_password(raw_password.as_bytes())
    .map_err(|_| AppError::Internal(anyhow!("Failed to hash password")))?;

  Ok(password_hash.to_string())
}
