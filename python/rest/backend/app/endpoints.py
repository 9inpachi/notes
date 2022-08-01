from os import environ
from app.auth import auth_required
from flask import Flask, json, g, request

# from flask_oidc import OpenIDConnect
from flask_cors import CORS
from app.katsu.service import Service as KatsuService
from app.helpers import json_res

app = Flask(__name__)
app.config["AUTH_SECRET"] = environ.get("AUTH_SECRET")
CORS(app)


@app.route("/katsus", methods=["GET"])
@auth_required
def index():
    katsuService = KatsuService("test")
    return json_res(katsuService.find_katsus())
