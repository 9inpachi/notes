use axum::{
  Json,
  http::StatusCode,
  response::{IntoResponse, Response},
};
use serde_json::json;

#[derive(Debug, thiserror::Error)]
pub enum AppError {
  #[error("{0}")]
  BadRequest(String),
  #[error("{0}")]
  NotFound(String),
  #[error("{0}")]
  Unauthorized(String),
  #[error("Internal Server Error")]
  Internal(#[from] anyhow::Error),
}

impl IntoResponse for AppError {
  fn into_response(self) -> Response {
    let (status, message) = match &self {
      AppError::BadRequest(msg) => (StatusCode::BAD_REQUEST, msg.clone()),
      AppError::NotFound(msg) => (StatusCode::NOT_FOUND, msg.clone()),
      AppError::Unauthorized(msg) => (StatusCode::UNAUTHORIZED, msg.clone()),
      AppError::Internal(error) => {
        tracing::error!("Internal error: {error:#}");
        (
          StatusCode::INTERNAL_SERVER_ERROR,
          "Internal Server Error".into(),
        )
      }
    };

    (status, Json(json!({ "error": message }))).into_response()
  }
}
