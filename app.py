from flask import Flask, render_template, request, jsonify
import json

app = Flask(__name__)

@app.route("/")
def home():
    return render_template("index.html")



@app.route("/process_data", methods=["POST"])

def process_data():
    dataURL = json.loads(request.get_json())
    print(dataURL)
    return jsonify("Something")



if __name__ == "__main__":
    app.run(debug=True)