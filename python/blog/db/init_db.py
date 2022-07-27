import sqlite3

connection = sqlite3.connect("blogs.db")

with open("schema.sql") as f:
    connection.executescript(f.read())

cursor = connection.cursor()

cursor.execute(
    "INSERT INTO posts (title, content) VALUES ('First Post', 'First post content');"
)
cursor.execute(
    "INSERT INTO posts (title, content) VALUES ('Second Post', 'Second post content');"
)

connection.commit()
connection.close()
