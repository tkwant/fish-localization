from flask import Flask, request, jsonify, make_response, Response
import pymongo
from pymongo import ReturnDocument
from flask_cors import CORS
from bson.objectid import ObjectId
from werkzeug.utils import secure_filename
from datetime import datetime
# from concurrent.futures import ThreadPoolExecutor, FIRST_COMPLETED
# from concurrent.futures import thread
from threading import Thread
import threading
import cv2
import queue

from DeepFish.predict import trainval
import os
import time
import pandas as pd





q = queue.Queue()

# executor = ThreadPoolExecutor(max_workers=1)

app = Flask(__name__)
CORS(app)

myclient = pymongo.MongoClient("mongodb://mongodb:27017/")
mydb = myclient["fish_localization"]
videos = mydb["videos"]
fish_counts = mydb["fish_counts"]
# app_path = 'backend/app/'


videos.update_many(
    {"predict_progress": {"$lt": 1}}, 
    {
        '$set': {
            'predict_progress': 0
        }})

ORIGINAL_VIDEOS_DIR_NAME = 'original_videos'
PREDICT_VIDEOS_DIR_NAME = 'predicted_videos'
THUMBNAIL_DIR_NAME = 'thumbnails'
FISH_COUNTS_CSV_DIR_NAME = 'fish_counts_csv'

o_videos_dir = f"static/{ORIGINAL_VIDEOS_DIR_NAME}/"
if not os.path.exists(o_videos_dir):
    os.makedirs(o_videos_dir)
p_videos_dir = o_videos_dir.replace(ORIGINAL_VIDEOS_DIR_NAME, PREDICT_VIDEOS_DIR_NAME)
if not os.path.exists(p_videos_dir):
    os.makedirs(p_videos_dir)

thumbnail_dir = o_videos_dir.replace(ORIGINAL_VIDEOS_DIR_NAME, THUMBNAIL_DIR_NAME)
if not os.path.exists(thumbnail_dir):
    os.makedirs(thumbnail_dir)
fish_counts_csv_dir = o_videos_dir.replace(ORIGINAL_VIDEOS_DIR_NAME, FISH_COUNTS_CSV_DIR_NAME)
if not os.path.exists(fish_counts_csv_dir):
    os.makedirs(fish_counts_csv_dir)

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
        os.remove(res['original_video_path'])
        print("removed: " + res['original_video_path'])
        return make_response(jsonify({}), 204)
    else:
        return make_response("Video Id not found in database", 400)



def onFishCounted(item_id, fish_count_arr):
    df = pd.DataFrame(fish_count_arr, columns=['count'])
    df.index.name = "frame"
    item = videos.find_one({'_id': item_id})
    df.to_csv(item['fish_counts_csv_path'])
    fish_counts.insert_one({
            "_id": item_id,
            "fish_counts_arr": fish_count_arr.tolist()
    })
    onProgressUpload(item_id, 1)

def checkUploadCanceled(item_id):
    # if not q.empty():
    try: 
        q.get(False)
        job_is_running = False
        videos.update_one({
        '_id': item_id
    }, {
        '$set': {
            'predict_progress': 0
        }
    }, upsert=False)
        # executor.shutdown()
        return True
    except queue.Empty:
        return False
    return False

def onProgressUpload(item_id, progress):
    if progress == 1:
        job_is_running = False
    videos.update_one({
        '_id': item_id
    }, {
        '$set': {
            'predict_progress': progress
        }
    }, upsert=False)
    print(f"progress ${progress}")

@app.route('/predict_progress/<item_id>', methods=["GET"])
def predict_progress(item_id):
    item = videos.find_one({"_id": item_id})
    return make_response(jsonify({"progress": item['predict_progress']}), 201) 



@app.route('/predict', methods=["POST"])
def predict_video():

    # item = videos.find_one_and_update({'_id': item_id}, {'$set': {'predicted_video_path': p_videos_dir}}, return_document=ReturnDocument.AFTER)
    try:
        item_id = request.json['id']
        item = videos.find_one({'_id': item_id})

    #     videos.update_one({
    #     '_id': item_id
    # }, {
    #     '$set': {
    #         'predicted_video_path': predicted_video_path
    #     }
    # }, upsert=False)
        job_is_running = False
        for thread in threading.enumerate(): 
            if thread.name == 'fish_loc_predict':
                job_is_running = True
        if not job_is_running:
            thread = Thread(target=trainval, args=(
                checkUploadCanceled, 
                onProgressUpload, 
                onFishCounted,
                item_id, 
                item['original_video_path'],
                item['predicted_video_path']
                ))
            thread.name = 'fish_loc_predict'
            thread.daemon = True
            thread.start()
        else:
            raise Exception('Currenty only one thread can be used for Prediction')
    except Exception as e:
        return make_response(str(e), 400)
    # print(future.result())
    return make_response(jsonify({}), 204)
    
@app.route('/predict_cancel', methods=["POST"])
def cancel_prediciting():
    q.put(True)
    return make_response(jsonify({}), 204)

@app.route('/upload', methods=["POST"])
def upload_video():
    uploaded_file = request.files['video']
    if uploaded_file.filename != '':
        obj_id = str(ObjectId())
        # original_video_path = o_videos_dir + obj_id + "." + uploaded_file.filename.split('.')[-1]
        original_video_path = os.path.join(o_videos_dir, obj_id + "." + uploaded_file.filename.split('.')[-1])
        uploaded_file.save(original_video_path)
        thumbnail_path = original_video_path.replace(ORIGINAL_VIDEOS_DIR_NAME, THUMBNAIL_DIR_NAME)
        thumbnail_path = thumbnail_path.replace('mp4', 'png')
        cap = cv2.VideoCapture(original_video_path)
        ret, thumbnail = cap.read()
        cv2.imwrite(thumbnail_path, thumbnail)
        predicted_video_path = original_video_path.replace(ORIGINAL_VIDEOS_DIR_NAME, PREDICT_VIDEOS_DIR_NAME)
        predicted_video_path = predicted_video_path.replace('mp4', 'webm')
        csv_save_dir = os.path.join(fish_counts_csv_dir, f"{obj_id}.csv")
        videos.insert_one({
            "_id": obj_id,
            "name": uploaded_file.filename,
            "original_video_path": original_video_path,
            "timestamp": datetime.utcnow(),
            "predicted_video_path": predicted_video_path,
            "fish_counts_csv_path": csv_save_dir,
            "predict_progress": 0,
            "counts": None,
            "thumbnail_path": thumbnail_path
        })
        return "success"
    return 'bad request!', 400



if __name__ == '__main__':
    app.run(host='0.0.0.0', port=9999, debug=True)

