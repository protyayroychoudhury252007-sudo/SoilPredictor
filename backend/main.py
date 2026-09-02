from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from api.soil import router as soil_router
from api.crop import router as crop_router

app = FastAPI(
    title="AgriShare AI API",
    description="Soil Type Prediction and Crop Recommendation API",
    version="2.0.0"
)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.include_router(
    soil_router,
    prefix="/predict",
    tags=["Soil Prediction"]
)
app.include_router(
    crop_router,
    prefix="/predict",
    tags=["Crop Recommendation"]
)
@app.get("/")
def home():
    return {
        "message": "AgriShare AI API is running!",
        "services": {
            "soil_prediction": "/predict/soil-type",
            "general_crop": "/predict/general",
            "location_aware_crop": "/predict/location-aware",
            "health": "/health",
            "docs": "/docs"
        }
    }
@app.get("/health")
def health():
    return {
        "status": "healthy",
        "message": "API is running"
    }