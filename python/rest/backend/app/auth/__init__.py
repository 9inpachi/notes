from datetime import datetime, timedelta
from functools import wraps
from inspect import signature
from app.helpers import json_res
from flask import request, current_app as app
import jwt


def auth_required(func):
    @wraps(func)
    def decorated(*args, **kwargs):
        auth_header = request.headers.get("authorization")
        if not auth_header:
            return json_res(
                {"error": "An authorization header is required."}, status=401
            )

        auth_token = auth_header.split(" ")[1]

        try:
            data = jwt.decode(
                auth_token, app.config.get("AUTH_SECRET"), algorithms=["HS256"]
            )
        except Exception as e:
            return json_res(
                {"error": "Invalid authorization token", "exception": str(e)},
                status=401,
            )

        # If the function has a `user_id` parameter, then pass the parameter.
        if "auth_user_id" in signature(func).parameters:
            kwargs["auth_user_id"] = data["user_id"]

        return func(*args, **kwargs)

    return decorated


def encode_token(user_id):
    auth_token = jwt.encode(
        {"user_id": user_id, "exp": datetime.now() + timedelta(minutes=5)},
        app.config.get("AUTH_SECRET"),
        algorithm="HS256",
    )

    return auth_token


def encode_refresh_token(user_id):
    refresh_token = jwt.encode(
        {"user_id": user_id, "exp": datetime.now() + timedelta(weeks=4)},
        app.config.get("AUTH_SECRET"),
        algorithm="HS256",
    )

    return refresh_token


def refresh_auth_token(refresh_token):
    try:
        decoded_info = jwt.decode(
            refresh_token, app.config.get("AUTH_SECRET"), algorith=["HS256"]
        )
        new_auth_token = encode_token(decoded_info["user_id"])

        decoded_info["refreshed_token"] = new_auth_token

        return json_res(decoded_info)
    except:
        return json_res({"error": "Refresh token has expired"})
