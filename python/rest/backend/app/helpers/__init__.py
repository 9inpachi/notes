import json


def json_res(payload, status=200):
    return (json.dumps(payload), status, {"content-type": "application/json"})
