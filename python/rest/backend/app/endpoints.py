from os import environ
from app.auth import auth_required, encode_token
from flask import Flask, request

# from flask_oidc import OpenIDConnect
from flask_cors import CORS
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
    katsuService = KatsuService("test")
    return json_res(katsuService.find_katsus())
