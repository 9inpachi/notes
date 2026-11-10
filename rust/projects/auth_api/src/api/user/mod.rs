mod handlers;
mod model;

use crate::state::AppState;
use axum::{Router, routing::post};

pub fn router() -> Router<AppState> {
  Router::new().route("/create", post(handlers::create_user))
}
