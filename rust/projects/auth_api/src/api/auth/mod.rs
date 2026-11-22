mod handlers;
mod middleware;
mod model;

use crate::state::AppState;
use axum::{Router, middleware::from_fn, routing::post};
use middleware::require_auth_middleware;

pub fn router() -> Router<AppState> {
  let protected = Router::new()
    .route("/refresh", post(handlers::refresh_token))
    // `.layer()` runs on fallback routes like 404 as well. While `route_layer`
    // only runs for our defined routes.
    // The outermost middleware runs first.
    .route_layer(from_fn(require_auth_middleware));

  Router::new()
    .route("/login", post(handlers::login_user))
    .merge(protected)
}
