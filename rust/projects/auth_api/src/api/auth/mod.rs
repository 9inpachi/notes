mod handlers;

use crate::state::AppState;
use axum::{Router, routing::post};

pub fn router() -> Router<AppState> {
  Router::new().route("/login", post(handlers::login_user))
}
