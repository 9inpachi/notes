CREATE TABLE users (
  username TEXT PRIMARY KEY NOT NULL UNIQUE,
  full_name TEXT NOT NULL,
  password_hash TEXT NOT NULL
);
