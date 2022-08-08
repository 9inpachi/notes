import json
from os import environ

from marshmallow import ValidationError
from app.auth import auth_required, encode_token
from flask import Flask, request

from flask_cors import CORS
from app.katsu.schema import GitHubRepoSchema
from app.katsu.service import Service as KatsuService
from app.helpers import json_res


def create_app():
    app = Flask(__name__)
    app.config["AUTH_SECRET"] = environ.get("AUTH_SECRET")
    CORS(app)

    # Anyone can authorize by passing in a `user_id` in the request.
    @app.route("/auth", methods=["POST"])
    def auth():
        user_id = request.json.get("user_id")
        if not user_id:
            return json_res({"error": "user_id is required"}, status=400)

        return json_res({"auth_token": encode_token(user_id)})

    @app.route("/katsus", methods=["GET"])
    @auth_required
    # `auth_user_id comes from `@auth_required`.
    def index(auth_user_id):
        katsuService = KatsuService(auth_user_id)
        return json_res(katsuService.find_katsus())

    @app.route("/katsu/create", methods=["POST"])
    @auth_required
    def create(auth_user_id):
        try:
            github_repo = GitHubRepoSchema().load(json.loads(request.data))
        except ValidationError as error:
            return json_res({"error": error.messages_dict}, 422)

        katsu = KatsuService(auth_user_id).create_katsu_for(github_repo)

        return json_res(katsu)

    @app.route("/katsu/<int:repo_id>", methods=["GET"])
    @auth_required
    def show(repo_id, auth_user_id):
        katsu = KatsuService(auth_user_id).find_one_katsu(repo_id)

        if katsu:
            return json_res(katsu)

        return json_res({"error": "Katsu not found."}, 404)

    @app.route("/katsu/<int:repo_id>", methods=["PUT"])
    @auth_required
    def update(repo_id, auth_user_id):
        try:
            repo_data = json.loads(request.data)
            repo_data["repo_id"] = repo_id
            github_repo = GitHubRepoSchema().load(repo_data)
        except ValidationError as error:
            return json_res({"error": error.messages_dict}, 422)

        katsu_service = KatsuService(auth_user_id)
        if katsu_service.update_katsu_with(repo_id, github_repo):
            return json_res(github_repo)
        else:
            return json_res({"error": "Katsu not found."}, 404)

    @app.route("/katsu/<int:repo_id>", methods=["DELETE"])
    @auth_required
    def delete(repo_id, auth_user_id):
        katsu_service = KatsuService(auth_user_id)

        if katsu_service.delete_katsu_for(repo_id):
            return json_res({"success": "Katsu deleted successfully."})

        return json_res({"error": "Katsu not found"})

    return app
