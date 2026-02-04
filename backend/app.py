# app.py
from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import numpy as np

# Initialize Flask app
app = Flask(__name__)

CORS(app,origins=["https://supraja-koppisetty.github.io"])

# Load the pre-trained model
model = joblib.load('temperature_prediction_model_rf.pkl')

# Define the prediction endpoint
@app.route('/predict', methods=['POST'])
def predict():
    # Get the data from the POST request
    data = request.get_json()

    # Extract features (humidity, wind speed)
    humidity = data['humidity']
    visibility = data['visibility']
    
    # Prepare the input data for prediction
    input_features = np.array([[humidity, visibility]])
    
    # Make the prediction
    prediction = model.predict(input_features)

    # Return the prediction as JSON
    return jsonify({'predicted_temperature': prediction[0]})

# Run the Flask app
if __name__ == '__main__':
    app.run(debug=True)
