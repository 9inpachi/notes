from flask import Flask, render_template
from helpers import get_db_connection, get_post

app = Flask(__name__)


@app.route("/")
def index():
    connection = get_db_connection()
    posts = connection.execute("SELECT * FROM posts").fetchall()
    connection.close()

    return render_template("index.html", posts=posts)


@app.route("/post/<int:post_id>")
def post(post_id):
    return render_template("post.html", post=get_post(post_id))
