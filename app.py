from flask import Flask, render_template, request, jsonify
import librosa
import tempfile
import os

app = Flask(__name__)

@app.route("/")
def home():
    return render_template("index.html")



@app.route("/process_data", methods=["POST"])

def process_data():
    print("Starting")
    music_file = request.files["music"]
    print("File received")
    with tempfile.NamedTemporaryFile(delete=False, suffix=".wav") as tmp:
        music_file.save(tmp.name)
        temp_path = tmp.name
    print("File saved")

    try:
        y, sr = librosa.load(temp_path, sr=None)
        tempo, beat_frames = librosa.beat.beat_track(y=y, sr=sr)
        print("File analyzed")
        print(f"Tempo: {tempo}")
        return jsonify("File analyzed")
        
    
    finally:
        if os.path.exists(temp_path):
            os.remove(temp_path)
    



if __name__ == "__main__":
    app.run(debug=True)