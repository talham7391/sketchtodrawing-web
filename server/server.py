from flask import Flask
import cv2
app = Flask(__name__)


@app.after_request
def enable_cors(response):
    response.headers["Access-Control-Allow-Origin"] = "*"
    return response


@app.route("/")
def hello():
    return "Hello Flask!"