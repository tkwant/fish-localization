import os 
import pandas as pd
import imagesize
import json
import numpy as np
from PIL import Image
from matplotlib import pyplot as plt

result_path = 'mask'
df = pd.read_csv('./annos.csv')
df = pd.DataFrame(df)
mask = df['img.is_junk'] != True
df = df[mask]
localization_list = []
img_list = df['img.img_path'].unique()
for i,lost_img in enumerate(img_list):
    mask = df['img.img_path'] == lost_img
    img_name = lost_img.split('/')[-1]
    path = "images/" + img_name
    width, height = imagesize.get(path)
    anno_df = df[mask]
    img = np.zeros((height, width))
    o_img = Image.open(path)
    o_img = np.array(o_img)
    count = 0
    for index, row in anno_df.iterrows():
        count += 1
        anno_data = row['anno.data']
        anno_data = json.loads(anno_data)
        px = anno_data['x']
        py = anno_data['y']
        px_abs = int(width * px)
        py_abs = int(height * py)

        img[py_abs, px_abs] = 255    
        o_img[py_abs:py_abs+10, px_abs:px_abs+10, :] = 255

    localization_list.append(["valid/" + img_name, count, 0, 1, 'valid', img_name])
    loc_df = pd.DataFrame(localization_list)
    loc_df.columns =['ID', 'counts', 'habitats', 'labels', 'classes', 'frames']
    loc_df.to_csv('test.csv', sep=',', index = False)
    img = Image.fromarray(np.uint8(img), 'L')
    result_img_path = result_path + "/"+ img_name.split('.jpg')[0] + '.png'
    # print(result_img_path)
    # plt.imshow(img, interpolation='nearest')
    # plt.show()
    img.save(result_img_path)


    # img = row['img.img_path']
    # anno_data = row['anno.data']
    # anno_data = json.loads(anno_data)
    # px = anno_data['x']
    # py = anno_data['y']
    # width, height = imagesize.get(path)
    # px = px 
    # img_name = img.split('/')[-1]
    # path = 'images/' + img_name
    
    # print(f"width: {width} height:{height}") 