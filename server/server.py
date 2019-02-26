from flask import Flask, request, session, send_file
import numpy as np
import cv2
import uuid
import base64
from io import BytesIO
app = Flask(__name__)


app.secret_key = 'testing'
app.config['UPLOAD_FOLDER'] = '/images'


images = {}


@app.after_request
def enable_cors(response):
    response.headers["Access-Control-Allow-Origin"] = "*"
    return response


@app.route("/")
def hello():
    return "Hello Flask!"


@app.route("/image", methods=["POST"])
def processImage():
    if 'file' in request.files:
        filestr = request.files['file'].read()
        npimg = np.fromstring(filestr, np.uint8)
        img = cv2.imdecode(npimg, cv2.IMREAD_UNCHANGED)

        if 'uid' not in session:
            uid = uuid.uuid4()
            session['uid'] = uid
        else:
            uid = session['uid']

        images[uid] = img

        img_str = cv2.imencode('.png', img)[1].tostring()

        return base64.b64encode(img_str)
    else:
        return 'No file uploaded', 500
