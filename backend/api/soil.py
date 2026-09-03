from fastapi import APIRouter, HTTPException

from schemas.soil_schema import (SoilInput,SoilQualityInput)
from services.soil_service import (predict_soil,predict_soil_quality)

router = APIRouter()

@router.post("/soil-type")
def predict_soil_type(data: SoilInput):
    try:
        return predict_soil(data)
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Soil prediction failed: {str(e)}"
        )
    
@router.post("/soil-quality")
def predict_soil_quality_endpoint(data: SoilQualityInput):
    try:
        return predict_soil_quality(data)
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Soil quality prediction failed: {str(e)}"
        )
