use serde::{Deserialize, Serialize};

#[derive(Deserialize)]
pub struct LoginRequest {
  pub username: String,
  pub password: String,
}

#[derive(Serialize)]
pub struct TokensResponse {
  pub access_token: String,
  pub refresh_token: String,
}
