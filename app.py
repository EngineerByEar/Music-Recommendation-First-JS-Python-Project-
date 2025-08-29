from flask import Flask, render_template, request, jsonify
import pandas as pd
import numpy as np
from sklearn.preprocessing import MinMaxScaler, OneHotEncoder
from sklearn.neighbors import NearestNeighbors

#Creating Model.
#Importing Data
df=pd.read_csv('Files/high_popularity_spotify_data.csv')
#Selecting Data
numerical_features = ["energy", "danceability", "valence"]
categorical_features = ["playlist_genre"]
#Preproess Data
#Numerical Data
scaler = MinMaxScaler()
scaled_data = scaler.fit_transform(df[numerical_features])
#Categorical Data
encoder = OneHotEncoder()
encoded_data = encoder.fit_transform(df[categorical_features]).toarray()
#Combine Data
processed_data = np.hstack([scaled_data, encoded_data])
#Create Model
model = NearestNeighbors(n_neighbors=1)
model.fit(processed_data)

#model for random genre
model_random = NearestNeighbors(n_neighbors=1)
model_random.fit(scaled_data)


app = Flask(__name__)

@app.route("/")

def home():
    return render_template("index.html")

@app.route("/get_genres", methods =["POST"])

def get_genres():
    genres = df["playlist_genre"].unique().tolist()
    return jsonify(genres)

@app.route("/get_recommendation", methods =["POST"])

def get_recommendation():
    #get user indput data
    print(request.get_json())
    print('gettin recommendation')
    user_input = pd.DataFrame([request.get_json()])
    #Preprocess user input data
    scaled_input = scaler.transform(user_input[numerical_features])
    print(user_input["playlist_genre"][0])

    if user_input["playlist_genre"][0] == "random":    
        processed_input = scaled_input
        distances, indices = model_random.kneighbors(processed_input)
        recommendation = df.iloc[indices[0][0]]
    elif user_input["playlist_genre"][0] != "random":
        encoded_input = encoder.transform(user_input[categorical_features]).toarray()
        processed_input = np.hstack([scaled_input, encoded_input])
        #get recommendation 
        distances, indices = model.kneighbors(processed_input)
        recommendation = df.iloc[indices[0][0]]
    response = {}
    for key in recommendation.keys().tolist():
        if type(recommendation[key]) == np.int64:
            response[key] = int(recommendation[key])
        else:
            response[key] = recommendation[key]
    jsonify(response)
    return jsonify(response)








if __name__ == "__main__":
    app.run(debug=True)