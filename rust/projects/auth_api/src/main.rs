mod api;
mod db;
mod error;
mod state;

use api::auth;
use api::user;
use axum::routing::{Router, get};
use tracing_subscriber::EnvFilter;

use crate::state::AppState;

#[tokio::main]
async fn main() {
  dotenvy::dotenv().ok();
  tracing_subscriber::fmt()
    .with_env_filter(EnvFilter::from_default_env())
    .init();

  let db = db::setup_db().await.unwrap();

  let state = AppState { db };

  let app = Router::new()
    .route("/health", get(|| async { "Healthy" }))
    .nest("/api/v1/user", user::router())
    .nest("/api/v1/auth", auth::router())
    .with_state(state);

  let host = std::env::var("HOST").unwrap_or("127.0.0.1".into());
  let port = std::env::var("PORT").unwrap_or("8080".into());

  let listener = tokio::net::TcpListener::bind(format!("{host}:{port}"))
    .await
    .unwrap();

  tracing::info!("Server running: {}", listener.local_addr().unwrap());

  axum::serve(listener, app).await.unwrap();
}
