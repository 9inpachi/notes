pub struct CreateUserRequest {
  pub username: String,
  pub password: String,
  pub full_name: String,
}

pub enum CreateUserStatus {
  Success,
  Failed,
}

#[derive(Serialize)]
pub struct CreateUserResponse {
  pub username: String,
  pub status: CreateUserStatus,
}
