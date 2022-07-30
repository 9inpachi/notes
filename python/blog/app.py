from os import environ
from flask import Flask, render_template, flash, request, redirect, url_for
from helpers import get_db_connection, get_post

app = Flask(__name__)
app.config["SECRET_KEY"] = environ.get("SECRET_KEY")


@app.route("/")
def index():
    connection = get_db_connection()
    posts = connection.execute("SELECT * FROM posts").fetchall()
    connection.close()

    return render_template("index.html", posts=posts)


@app.route("/post/<int:post_id>")
def post(post_id):
    return render_template("post.html", post=get_post(post_id))


@app.route("/post/create", methods=("POST", "GET"))
def create():
    if request.method == "POST":
        title = request.form["title"]
        content = request.form["content"]

        if not title or not content:
            flash("Title and Content are required")
        else:
            connection = get_db_connection()
            cursor = connection.cursor()

            cursor.execute(
                "INSERT INTO posts (title, content) VALUES (?, ?)", (title, content)
            )
            insertedId = cursor.lastrowid

            connection.commit()
            connection.close()

            # `url_for` here creates the URL to the post endpoint defined above (`/post/<int:post_id>`).
            # It uses the method name (`def post`) as the first argument and
            # the `post_id` argument in the method as the parameter.
            return redirect(url_for("post", post_id=insertedId))

    return render_template("create.html")
