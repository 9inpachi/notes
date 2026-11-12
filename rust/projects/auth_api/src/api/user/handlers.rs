use anyhow::anyhow;
use argon2::{Argon2, PasswordHasher};
use axum::{
  Json,
  extract::{Path, State},
  http::StatusCode,
};
use regex::Regex;

use crate::{
  api::user::{
    constants::{FULL_NAME_RE, PASSWORD_RE, USERNAME_RE},
    model::{CreateUserRequest, CreateUserResponse, CreateUserStatus, GetUserResponse},
  },
  error::AppError,
  state::AppState,
};

/// POST /api/v1/user/create
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

  sqlx::query("INSERT INTO users (username, full_name, password_hash) VALUES ($1, $2, $3);")
    .bind(&body.username)
    .bind(&body.full_name)
    .bind(&password_hash)
    .execute(&state.db)
    .await
    .map_err(|error| match error {
      // If the error is because of a UNIQUE contraint violation, then return
      // "CONFLICT" status code.
      sqlx::Error::Database(err) if err.is_unique_violation() => {
        AppError::Conflict("Username already exists".to_string())
      }
      _ => AppError::Internal(anyhow!(error)),
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
  let username_re = Regex::new(USERNAME_RE).unwrap();
  if !username_re.is_match(&request.username) {
    return Err(AppError::BadRequest("Invalid username".to_string()));
  }

  let full_name_re = Regex::new(FULL_NAME_RE).unwrap();
  if !full_name_re.is_match(&request.full_name) {
    return Err(AppError::BadRequest("Invalid full_name".to_string()));
  }

  let password_re = Regex::new(PASSWORD_RE).unwrap();
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
    .map_err(|error| AppError::Internal(anyhow!(error)))?;

  Ok(password_hash.to_string())
}

/// GET /api/v1/user/{username}
pub async fn get_user(
  State(state): State<AppState>,
  Path(username): Path<String>,
) -> Result<(StatusCode, Json<GetUserResponse>), AppError> {
  tracing::info!("Fetching user with username {}", username);

  let username_re = Regex::new(USERNAME_RE).unwrap();
  if !username_re.is_match(&username) {
    return Err(AppError::BadRequest("Invalid username".to_string()));
  }

  let user = sqlx::query_as::<_, GetUserResponse>(
    "SELECT username, full_name from users where username = $1",
  )
  .bind(&username)
  .fetch_optional(&state.db)
  .await
  .map_err(|error| AppError::Internal(anyhow!(error)))?;

  match user {
    Some(user) => Ok((StatusCode::OK, Json(user))),
    None => Err(AppError::NotFound(format!(
      "User with username {username} not found"
    ))),
  }
}
