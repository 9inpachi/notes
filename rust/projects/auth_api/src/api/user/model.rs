use serde::{Deserialize, Serialize};

#[derive(Deserialize)]
pub struct CreateUserRequest {
  pub username: String,
  pub password: String,
  pub full_name: String,
}

#[derive(Serialize)]
#[serde(rename_all = "lowercase")]
pub enum CreateUserStatus {
  Success,
  Failed,
}

#[derive(Serialize)]
pub struct CreateUserResponse {
  pub username: String,
  pub status: CreateUserStatus,
}
