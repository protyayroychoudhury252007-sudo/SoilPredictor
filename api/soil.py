from fastapi import APIRouter, HTTPException

from schemas.soil_schema import SoilInput
from services.soil_service import predict_soil


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