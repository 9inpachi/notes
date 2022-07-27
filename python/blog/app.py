from flask import Flask, render_template
from db import get_db_connection

app = Flask(__name__)

@app.route("/")
def index():
  connection = get_db_connection()
  posts = connection.execute("SELECT * FROM posts").fetchall()
  return render_template("index.html", posts=posts)
