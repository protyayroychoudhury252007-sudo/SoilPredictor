from pathlib import Path
import joblib
import pandas as pd

BASE_DIR = Path(__file__).resolve().parent.parent
SOIL_TYPE_MODEL_PATH = (BASE_DIR/ "models" / "soil_type_model.joblib")
SOIL_QUALITY_MODEL_PATH = (BASE_DIR/ "models"/ "soil_quality_model.joblib")
soil_model = joblib.load(SOIL_TYPE_MODEL_PATH)
soil_quality_model = joblib.load(SOIL_QUALITY_MODEL_PATH)

def predict_soil(data):
    input_data = pd.DataFrame([
        {
            "Nitrogen": data.nitrogen,
            "Phosphorus": data.phosphorus,
            "Potassium": data.potassium,
            "Temperature": data.temperature,
            "Humidity": data.humidity,
            "pH_Value": data.ph_value,
            "Rainfall": data.rainfall,
            "Crop": data.crop
        }
    ])
    prediction = soil_model.predict(input_data)[0]
    probabilities = soil_model.predict_proba(input_data)[0]
    soil_types = soil_model.classes_
    results = [
        {
            "soil_type": str(soil_type),
            "probability": round(
                float(probability) * 100,
                2
            )
        }
        for soil_type, probability
        in zip(soil_types, probabilities)
    ]
    results.sort(
        key=lambda x: x["probability"],
        reverse=True
    )
    return {
        "model": "soil_type_predictor",
        "predicted_soil_type": str(prediction),
        "confidence": results[0]["probability"],
        "top_3_soil_types": results[:3]
    }

def predict_soil_quality(data):
    input_data = pd.DataFrame([
        {
            "Nitrogen": data.nitrogen,
            "Phosphorus": data.phosphorus,
            "Potassium": data.potassium,
            "pH_Value": data.ph_value,
            "Soil_Moisture": data.soil_moisture,
            "Organic_Carbon": data.organic_carbon,
            "Electrical_Conductivity": data.electrical_conductivity,
            "Temperature": data.temperature,
            "Humidity": data.humidity,
            "Rainfall": data.rainfall
        }
    ])
    prediction = soil_quality_model.predict(input_data )[0]
    return {
        "model": "soil_quality_predictor",
        "soil_quality_score": round(
            float(prediction),
            2
        )
    }
