mod constants;
mod handlers;
mod model;

use crate::{api::middleware, state::AppState};
use axum::{
  Router,
  middleware::from_fn,
  routing::{get, post},
};

pub fn router() -> Router<AppState> {
  let protected = Router::new()
    .route("/profile", get(handlers::get_user_profile))
    // `.layer()` runs on fallback routes like 404 as well. While `route_layer`
    // only runs for our defined routes.
    // The outermost middleware runs first.
    .route_layer(from_fn(middleware::require_auth_middleware));

  Router::new()
    .route("/create", post(handlers::create_user))
    .route("/{username}", get(handlers::get_user))
    .merge(protected)
}
