CREATE TABLE IF NOT EXISTS users
(
    id       varchar(60) DEFAULT RANDOM_UUID() PRIMARY KEY,
    username varchar(10) NOT NULL UNIQUE,
    password varchar     NOT NULL
);
