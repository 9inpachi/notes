use std::error::Error;

use sqlx::{Pool, Postgres, postgres::PgPoolOptions};

pub async fn setup_db() -> Result<Pool<Postgres>, Box<dyn Error>> {
  let db_url = std::env::var("DATABASE_URL")?;
  let db = PgPoolOptions::new()
    .max_connections(10)
    .connect(&db_url)
    .await?;

  sqlx::migrate!("./migrations").run(&db).await?;

  Ok(db)
}
