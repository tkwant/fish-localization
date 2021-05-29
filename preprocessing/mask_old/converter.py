from PIL import Image
import os

directory = './jpg/'
for filename in os.listdir(directory):
    if filename.endswith(".jpg"):
        im = Image.open(directory + filename)
        output_path = 'png/'
        name= output_path+filename.split('.jpg')[0] +'.png'
        rgb_im = im.convert('RGB')
        rgb_im.save(name)
        print(os.path.join(directory, filename))
        continue
    else:
        continue
