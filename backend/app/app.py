from flask import Flask, request, jsonify
import pymongo
from flask_cors import CORS
from bson.objectid import ObjectId
from werkzeug.utils import secure_filename
from datetime import datetime
app = Flask(__name__)
CORS(app)

myclient = pymongo.MongoClient("mongodb://mongodb:27017/")
mydb = myclient["fish_count"]
mycol = mydb["items"]
mydict = {"original_video_path": "John", "address": "Highway 37"}



@app.route('/', methods=['GET'])
def get():
    # test = "Hello Workd"

    # x = mycol.insert_one(mydict)
    return 'Hello world'


@app.route('/items', methods=['GET'])
def videos():
    items = list(mycol.find({}))
    return jsonify(items)

@app.route('/upload', methods=["POST"])
def upload():
    uploaded_file = request.files['video']
    if uploaded_file.filename != '':
        obj_id = str(ObjectId())
        original_video_path = "static/original_videos/" + obj_id + "." + uploaded_file.filename.split('.')[-1]
        x = mycol.insert_one({
            "_id": obj_id,
            "name": uploaded_file.filename,
            "original_video_path": original_video_path,
            "timestamp": datetime.utcnow(),
            "predicted_video_path": None,
            "counts": None,
            "thumbnail_path": None
        })
        # print("obj_id: "+ str(obj_id))
        print("uploaded_file:" + str(uploaded_file.filename))
        uploaded_file.save(original_video_path)
        # if "video" in request.files:
        #     video = request.files["video"]
        #     # filename = secure_filename(file.filename) # Secure the filename to prevent some kinds of attack
        #     media.save(video, name="filename.mp4")
        return "success"
            # Video saved
    return 'bad request!', 400



if __name__ == '__main__':
    app.run(host='0.0.0.0', port=9999, debug=True)

