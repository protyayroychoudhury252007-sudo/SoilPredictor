from pathlib import Path
import joblib
import pandas as pd

BASE_DIR = Path(__file__).resolve().parent.parent
MODELS_DIR = BASE_DIR / "models"
GENERAL_MODEL_PATH = (MODELS_DIR/ "agrishare_crop_general.joblib")
LOCATION_MODEL_PATH = (MODELS_DIR/ "agrishare_crop_location_aware.joblib")

general_model = joblib.load(GENERAL_MODEL_PATH)
location_model = joblib.load(LOCATION_MODEL_PATH)

def predict_general_crop(data):
    input_data = pd.DataFrame([
        {
            "soil_type": data.soil_type,
            "crop_season": data.crop_season,
            "nitrogen": data.nitrogen,
            "phosphorus": data.phosphorus,
            "potassium": data.potassium,
            "soil_ph": data.soil_ph,
            "soil_moisture": data.soil_moisture,
            "organic_carbon": data.organic_carbon,
            "electrical_conductivity": data.electrical_conductivity,
            "temperature": data.temperature,
            "humidity": data.humidity,
            "rainfall": data.rainfall
        }
    ])
    probabilities = general_model.predict_proba(input_data)[0]
    crops = general_model.classes_
    results = [
        {
            "crop": str(crop),
            "probability": round(
                float(probability) * 100,
                2
            )
        }
        for crop, probability
        in zip(crops, probabilities)
    ]
    results.sort(
        key=lambda x: x["probability"],
        reverse=True
    )
    return {
        "model": "general_crop_recommendation",
        "top_5_crops": results[:5]
    }

def predict_location_crop(data):
    input_data = pd.DataFrame([
        {
            "state": data.state,
            "soil_type": data.soil_type,
            "crop_season": data.crop_season,
            "nitrogen": data.nitrogen,
            "phosphorus": data.phosphorus,
            "potassium": data.potassium,
            "soil_ph": data.soil_ph,
            "soil_moisture": data.soil_moisture,
            "organic_carbon": data.organic_carbon,
            "electrical_conductivity": data.electrical_conductivity,
            "temperature": data.temperature,
            "humidity": data.humidity,
            "rainfall": data.rainfall
        }
    ])
    probabilities = location_model.predict_proba(input_data)[0]
    crops = location_model.classes_
    results = [
        {
            "crop": str(crop),
            "probability": round(
                float(probability) * 100,
                2
            )
        }
        for crop, probability
        in zip(crops, probabilities)
    ]
    results.sort(
        key=lambda x: x["probability"],
        reverse=True
    )
    return {
        "model": "location_aware_crop_recommendation",
        "top_5_crops": results[:5]
    }