from flask import Flask, render_template, request, jsonify

app = Flask(__name__)

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/send", methods=["POST"])
def send():
    data=request.get_json()
    doubletime = data["bpm"]*2
    response ={
        "tempo": doubletime
    }
    return jsonify(response)


if __name__ == "__main__":
    app.run(debug=True)