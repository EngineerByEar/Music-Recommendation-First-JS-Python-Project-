Hey, thanks for Checking out my Music Recommender Project!

Here´s how to get it running:

	-Install the requirements: pip install -r requirements.txt
	-The app was built on python Version: 3.12.7
	- run: python app.py
	- Open http://127.0.0.1:5000/ in your browser | Or the URL that´s logged in the console.

Have fun trying out the app and leave a star on my GitHub-Repo! ;)
https://github.com/EngineerByEar/Music-Recommendation-First-JS-Python-Project-

The recommender gives content based recommendations. Contrary to popular music recommendation algorithms it looks at different qualities of the audio itself and determines which song fits the selected parameters best.
The model uses data from the high-popularity-spotify-music dataset which already includes the audio features: Spotify Music Dataset.
The relevant audio features and genre are min-max scaled/one-hot encoded and then used to fit a k-nearest neighbors model which returns the 1 most similar song.
Since the data-set only includes the most popular songs, the main advantage of content based music recommendation (equally recommending less well known songs) is lost. This recommender still serves the purpose of exploring content based music recommendation.
