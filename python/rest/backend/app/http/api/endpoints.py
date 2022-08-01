from flask import Flask, json, g, request

# from flask_oidc import OpenIDConnect
from flask_cors import CORS
from katsu.service import Service as KatsuService
from helpers import json_res

app = Flask(__name__)

app.config.update(
    {
        "OIDC_CLIENTS_SECRETS": "./../../../../client_secrets.json",
        "OIDC_RESOURCE_SERVER_ONLY": True,
    }
)
# oidc = OpenIDConnect(app)
CORS(app)


@app.route("/katsus", methods=["GET"])
# @oidc.accept_token(True)
def index():
    katsuService = KatsuService("test")
    return json_res(katsuService.find_katsus())


