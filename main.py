from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import joblib
import os
import pandas as pd


# ---------------- FASTAPI APP ----------------

app = FastAPI(
    title="AgriShare API",
    description="Crop recommendation API using Machine Learning",
    version="1.0.0"
)


# ---------------- CORS CONFIGURATION ----------------

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ---------------- MODEL PATHS ----------------

BASE_DIR = os.path.dirname(os.path.abspath(__file__))

LOCATION_MODEL_PATH = os.path.join(
    BASE_DIR,
    "models",
    "agrishare_crop_location_aware.joblib"
)

GENERAL_MODEL_PATH = os.path.join(
    BASE_DIR,
    "models",
    "agrishare_crop_general.joblib"
)


# ---------------- LOAD MODELS ----------------

location_model = joblib.load(LOCATION_MODEL_PATH)
general_model = joblib.load(GENERAL_MODEL_PATH)


# ---------------- INPUT SCHEMAS ----------------

class BaseCropInput(BaseModel):
    nitrogen: float
    phosphorus: float
    potassium: float
    soil_ph: float
    soil_moisture: float
    organic_carbon: float
    electrical_conductivity: float
    temperature: float
    humidity: float
    rainfall: float


# General Model Input
class CropInput(BaseCropInput):
    soil_type: str
    crop_season: str


# Location-Aware Model Input
class LocationCropInput(CropInput):
    state: str


# ---------------- BASIC ENDPOINTS ----------------

@app.get("/")
def home():
    return {
        "message": "AgriShare API is running!",
        "models_loaded": True
    }


@app.get("/model-status")
def model_status():
    return {
        "location_aware_model": "Loaded",
        "general_model": "Loaded"
    }


# ---------------- GENERAL CROP PREDICTION ----------------

@app.post("/predict/general")
def predict_general(data: CropInput):

    try:
        input_data = pd.DataFrame([{
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
        }])

        probabilities = general_model.predict_proba(input_data)[0]
        crops = general_model.classes_

        results = [
            {
                "crop": crop,
                "probability": round(float(probability) * 100, 2)
            }
            for crop, probability in zip(crops, probabilities)
        ]

        results = sorted(
            results,
            key=lambda x: x["probability"],
            reverse=True
        )

        return {
            "model": "general",
            "top_5_crops": results[:5]
        }

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Prediction failed: {str(e)}"
        )


# ---------------- LOCATION-AWARE CROP PREDICTION ----------------

@app.post("/predict/location-aware")
def predict_location_aware(data: LocationCropInput):

    try:
        input_data = pd.DataFrame([{
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
        }])

        probabilities = location_model.predict_proba(input_data)[0]
        crops = location_model.classes_

        results = [
            {
                "crop": crop,
                "probability": round(float(probability) * 100, 2)
            }
            for crop, probability in zip(crops, probabilities)
        ]

        results = sorted(
            results,
            key=lambda x: x["probability"],
            reverse=True
        )

        return {
            "model": "location-aware",
            "top_5_crops": results[:5]
        }

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Prediction failed: {str(e)}"
        )