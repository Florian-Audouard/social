"""
Server Flask avec react
"""

import os

from flask import Flask, jsonify, send_from_directory, request
from flask_cors import CORS

import json

os.chdir(os.path.dirname(__file__))
app = Flask(__name__, static_folder="./build")
CORS(app, origins="http://localhost:3000")
from database.database import (
    get_feed_database,
    reset_table,
    add_message,
    is_username_available,
    create_account,
    connection,
)


@app.route("/test", methods=["GET"])
def test():  # pylint: disable=missing-function-docstring
    return jsonify({"test": "test"})


@app.route("/getFeed", methods=["GET"])
def get_feed():  # pylint: disable=missing-function-docstring
    return jsonify(get_feed_database())


@app.route("/msgFromHtml", methods=["POST"])
def receive_msg():  # pylint: disable=missing-function-docstring
    result = json.loads(request.get_data().decode("utf-8"))
    if "/reset" in result["message"]:
        reset_table()
        return "reset"
    add_message(result["username"], result["message"])
    return "ok"


@app.route("/AvailableUsername", methods=["POST"])
def available_username():  # pylint: disable=missing-function-docstring
    result = request.get_data()
    username = result.decode("utf-8")
    return jsonify(str(is_username_available(username)))


@app.route("/SignIn", methods=["POST"])
def sign_in():  # pylint: disable=missing-function-docstring
    result = request.get_data()
    id = json.loads(result.decode("utf-8"))
    return jsonify(str(create_account(id["username"], id["password"])))


@app.route("/LogIn", methods=["POST"])
def log_in():  # pylint: disable=missing-function-docstring
    result = request.get_data()
    id = json.loads(result.decode("utf-8"))
    return jsonify(str(connection(id["username"], id["password"])))


@app.route("/", defaults={"path": ""})
@app.route("/<path:path>")
def index(path):  # pylint: disable=missing-function-docstring
    if path != "" and os.path.exists(app.static_folder + "/" + path):
        return send_from_directory(app.static_folder, path)
    return send_from_directory(app.static_folder, "index.html")


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=80)
