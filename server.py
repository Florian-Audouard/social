"""
Server Flask avec react
"""

import os

from flask import Flask, jsonify, send_from_directory
from flask_cors import CORS


os.chdir(os.path.dirname(__file__))
app = Flask(__name__, static_folder="./build")
CORS(app, origins="http://localhost:3000")
from database.database import get_database


@app.route("/test", methods=["GET"])
def test():  # pylint: disable=missing-function-docstring
    return jsonify({"test": "test"})


@app.route("/getDatabase", methods=["GET"])
def get_database_server():  # pylint: disable=missing-function-docstring
    # return jsonify(get_database())
    return jsonify(["test server"])


@app.route("/", defaults={"path": ""})
@app.route("/<path:path>")
def index(path):  # pylint: disable=missing-function-docstring
    if path != "" and os.path.exists(app.static_folder + "/" + path):
        return send_from_directory(app.static_folder, path)
    return send_from_directory(app.static_folder, "index.html")


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=80)
