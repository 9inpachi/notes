use serde::{Deserialize, Serialize};

#[derive(Debug, Serialize, Deserialize, Clone)]
#[serde(rename_all = "lowercase")]
pub enum TokenType {
  Access,
  Refresh,
}

#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct JwtClaims {
  // pub aud: String, // Optional. Audience
  pub exp: usize, // Required (validate_exp defaults to true in validation). Expiration time (as UTC timestamp)
  // pub iat: usize, // Optional. Issued at (as UTC timestamp)
  // pub iss: String, // Optional. Issuer
  // pub nbf: usize, // Optional. Not Before (as UTC timestamp)
  pub sub: String, // Optional. Subject (whom token refers to)
  pub typ: TokenType,
}
