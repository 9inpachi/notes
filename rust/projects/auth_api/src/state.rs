use sqlx::{Pool, Postgres};

#[derive(Clone)]
pub struct AppState {
  pub db: Pool<Postgres>,
}
