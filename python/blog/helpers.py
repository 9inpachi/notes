import os
import sqlite3
from werkzeug.exceptions import abort

db_file = os.path.join(os.path.dirname(__file__), "db/blogs.db")


def get_db_connection():
    connection = sqlite3.connect(db_file)
    connection.row_factory = sqlite3.Row

    return connection


def get_post(post_id):
    connection = get_db_connection()
    post = connection.execute("SELECT * FROM posts WHERE id = ?", (post_id,)).fetchone()
    connection.close()

    if post is None:
        abort(404)

    return post
