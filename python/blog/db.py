import os
import sqlite3

db_file = os.path.join(os.path.dirname(__file__), "db/blogs.db")


def get_db_connection():
    connection = sqlite3.connect(db_file)
    connection.row_factory = sqlite3.Row

    return connection
