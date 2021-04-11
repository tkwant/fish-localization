from flask import Flask, request, jsonify, make_response, Response
import pymongo
from flask_cors import CORS
from bson.objectid import ObjectId
from werkzeug.utils import secure_filename
from datetime import datetime
import os
app = Flask(__name__)
CORS(app)

myclient = pymongo.MongoClient("mongodb://mongodb:27017/")
mydb = myclient["fish_count"]
mycol = mydb["items"]
mydict = {"original_video_path": "John", "address": "Highway 37"}

# app_path = 'backend/app/'

o_videos_dir = 'static/original_videos/'
if not os.path.exists(o_videos_dir):
    os.makedirs(o_videos_dir)


@app.route('/', methods=['GET'])
def get():
    # test = "Hello Workd"

    # x = mycol.insert_one(mydict)
    return 'Hello world'


@app.route('/items', methods=['GET'])
def get_videos():
    items = list(mycol.find({}))
    return jsonify(items)

@app.route('/delete/<videoId>', methods=['DELETE'])
def delete_video(videoId):
    res = mycol.find_one_and_delete({'_id': videoId})
    if res:
        # os.remove(res['original_video_path'])
        print("removed: " + res['original_video_path'])
        return make_response(jsonify({}), 204)
    else:
        return make_response("Video Id not found in database", 400)

@app.route('/upload', methods=["POST"])
def upload_video():
    uploaded_file = request.files['video']
    if uploaded_file.filename != '':
        obj_id = str(ObjectId())
        original_video_path = o_videos_dir + obj_id + "." + uploaded_file.filename.split('.')[-1]
        x = mycol.insert_one({
            "_id": obj_id,
            "name": uploaded_file.filename,
            "original_video_path": original_video_path,
            "timestamp": datetime.utcnow(),
            "predicted_video_path": None,
            "counts": None,
            "thumbnail_path": None
        })
        uploaded_file.save(original_video_path)
        return "success"
    return 'bad request!', 400



if __name__ == '__main__':
    app.run(host='0.0.0.0', port=9999, debug=True)

