use serde::{Deserialize, Serialize};

#[derive(Deserialize)]
pub struct CreateUserRequest {
  pub username: String,
  pub password: String,
  pub full_name: String,
}

#[derive(Serialize)]
pub struct CreateUserResponse {
  pub username: String,
  pub status: String,
}

#[derive(Serialize, sqlx::FromRow)]
pub struct UserResponse {
  pub username: String,
  pub full_name: String,
}
