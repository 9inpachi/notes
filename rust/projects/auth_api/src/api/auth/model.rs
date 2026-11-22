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

#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct JwtClaims {
  // pub aud: String, // Optional. Audience
  pub exp: usize, // Required (validate_exp defaults to true in validation). Expiration time (as UTC timestamp)
  // pub iat: usize, // Optional. Issued at (as UTC timestamp)
  // pub iss: String, // Optional. Issuer
  // pub nbf: usize, // Optional. Not Before (as UTC timestamp)
  pub sub: String, // Optional. Subject (whom token refers to)
}
