from flask import Flask, request, jsonify, make_response, Response
import pymongo
from flask_cors import CORS
from bson.objectid import ObjectId
from werkzeug.utils import secure_filename
from datetime import datetime
from concurrent.futures import ThreadPoolExecutor
from DeepFish.predict import trainval
import os
import time

executor = ThreadPoolExecutor(1)

app = Flask(__name__)
CORS(app)

myclient = pymongo.MongoClient("mongodb://mongodb:27017/")
mydb = myclient["fish_count"]
videos = mydb["videos"]
jobs = mydb["jobs"]

# app_path = 'backend/app/'

o_videos_dir = 'static/original_videos/'
if not os.path.exists(o_videos_dir):
    os.makedirs(o_videos_dir)


@app.route('/', methods=['GET'])
def get():
    # test = "Hello Workd"

    # x = videos.insert_one(mydict)
    return 'Hello world'


@app.route('/items', methods=['GET'])
def get_videos():
    items = list(videos.find({}))
    return jsonify(items)

@app.route('/delete/<videoId>', methods=['DELETE'])
def delete_video(videoId):
    res = videos.find_one_and_delete({'_id': videoId})
    if res:
        # os.remove(res['original_video_path'])
        print("removed: " + res['original_video_path'])
        return make_response(jsonify({}), 204)
    else:
        return make_response("Video Id not found in database", 400)


@app.route('/predict', methods=["POST"])
def predict_video():
    print(f"preditct infos: {request.form}")
    try:
        result = executor.submit(trainval)
        print(result)
    except Exception as e:
        return make_response(str(e), 400)
    # print(future.result())
    return make_response(jsonify({}), 204)
    


@app.route('/upload', methods=["POST"])
def upload_video():
    uploaded_file = request.files['video']
    if uploaded_file.filename != '':
        obj_id = str(ObjectId())
        original_video_path = o_videos_dir + obj_id + "." + uploaded_file.filename.split('.')[-1]
        x = videos.insert_one({
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

