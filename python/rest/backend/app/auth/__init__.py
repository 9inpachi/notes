from datetime import datetime
from functools import wraps
from app.helpers import json_res
from flask import request, current_app as app
import jwt


def auth_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        auth_header = request.headers.get("authorization")
        auth_token = auth_header.split(" ")[1]

        try:
            data = jwt.decode(auth_token, app.config["AUTH_SECRET"], algorithm="HS256")
        except Exception as e:
            return json_res(
                {"error": "Invalid authorization token", "exception": str(e)},
                status=401,
            )

        return f(*args, **kwargs)

    return decorated


def encode_token(user_id):
    auth_token = jwt.encode(
        {"user_id": user_id}, app.config["AUTH_SECRET"], algorithm="HS256"
    )

    return auth_token


def encode_refresh_token(user_id):
    refresh_token = jwt.encode(
        {"user_id": user_id, "exp": datetime.now() + datetime.timedelta(weeks=4)},
        app.config["AUTH_SECRET"],
        algorithm="HS256",
    )

    return refresh_token

def refresh_auth_token(refresh_token):
    try:
        decoded_info = jwt.decode(refresh_token, app.config["AUTH_SECRET"], algorith="HS256")
        new_auth_token = encode_token(decoded_info["user_id"])

        decoded_info["refreshed_token"] = new_auth_token

        return json_res(decoded_info)
    except:
        return json_res({"error": "Refresh token has expired"})

        
