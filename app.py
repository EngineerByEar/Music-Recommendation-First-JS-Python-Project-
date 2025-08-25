from flask import Flask, render_template, jsonify, request
import librosa
import tempfile
import os
import numpy as np

app = Flask(__name__)

#"/" leads to the default port
@app.route("/")
def home():
    #load the main page on startup from the tempplates folder
    return render_template("index.html")

#"/analyze" add this to the default link in the fetch function. 
#Define method ("POST")
@app.route("/analyze", methods=["POST"])
def analyze():
    print("Starting")
    #load the Form Data File
    music_file = request.files["music"]
    print("File received")
    #to handle the file with librosa it needs to be temporarily saved
    with tempfile.NamedTemporaryFile(delete=False, suffix=".wav")as tmp:
        music_file.save(tmp.name)
        temp_path = tmp.name
        print("File saved")

        
    try:
        #processing file with librosa. 
        #sr=None prevents downsampling
        y, sr = librosa.load(temp_path, sr=None)
        tempo, beat_frames = librosa.beat.beat_track(y=y, sr=sr)
        print("File analyzed")
        #Turn numpy array to a jsonifyable list
        result = tempo.tolist()[0]
        #tempo is a numpy object and can´t be jsonifyed without further processing
        return jsonify(result)


    finally:
        #delete the temprarily saved file. Try & Finally is necessary for this to work
        if os.path.exists(temp_path):
            os.remove(temp_path)
            print("Success!")


#This Statement runs the Flask Server
if __name__ == "__main__":
    app.run(debug = True)

