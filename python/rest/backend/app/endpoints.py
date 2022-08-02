import json
from os import environ
from app.auth import auth_required, encode_token
from flask import Flask, request, session

from flask_cors import CORS
from app.katsu.schema import GitHubRepoSchema
from app.katsu.service import Service as KatsuService
from app.helpers import json_res

app = Flask(__name__)
app.config["AUTH_SECRET"] = environ.get("AUTH_SECRET")
CORS(app)


@app.route("/auth", methods=["POST"])
def auth():
    user_id = request.json.get("user_id")
    if not user_id:
        return json_res({"error": "user_id is required"}, status=400)

    return json_res({"auth_token": encode_token(user_id)})


@app.route("/katsus", methods=["GET"])
@auth_required
def index():
    katsuService = KatsuService(session["user_id"])
    return json_res(katsuService.find_katsus())


@app.route("/katsus", methods=["POST"])
@auth_required
def create():
    github_repo = GitHubRepoSchema().load(json.loads(request.data))

    if github_repo.errors:
        return json_res({"error": github_repo.errors}, 422)

    katsu = KatsuService(session["user_id"]).create_katsu_for(github_repo)

    return json_res(katsu)


@app.route("/katsu/<int:repo_id>", methods=["GET"])
@auth_required
def show(repo_id):
    katsu = KatsuService(session["user_id"]).find_one_katsu(repo_id)

    if katsu:
        return json_res(katsu)

    return json_res({"error": "Katsu not found."}, 404)


@app.route("/katsu/<int:repo_id>", methods=["PUT"])
@auth_required
def show(repo_id):
    github_repo = GitHubRepoSchema().load(json.loads(request.data))

    if github_repo.errors:
        return json_res({"error": github_repo.errors}, 422)

    katsu_service = KatsuService(session["user_id"])
    if katsu_service.update_katsu_with(repo_id, github_repo):
        return json_res(github_repo.data)
    else:
        return json_res({"error": "Katsu not found."}, 404)


@app.route("/katsu/<int:repo_id>", methods=["DELETE"])
@auth_required
def delete(repo_id):
    katsu_service = KatsuService(session["user_id"])

    if katsu_service.delete_katsu_for(repo_id):
        return json_res({"success": "Katsu deleted successfully."})

    return json_res({"error": "Katsu not found"})
