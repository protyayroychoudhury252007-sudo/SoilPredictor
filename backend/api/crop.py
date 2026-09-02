from fastapi import APIRouter, HTTPException

from schemas.crop_schema import (
    CropInput,
    LocationCropInput
)

from services.crop_service import (
    predict_general_crop,
    predict_location_crop
)


router = APIRouter()


# =========================================================
# GENERAL CROP PREDICTION
# =========================================================

@router.post("/general")
def general_crop_prediction(data: CropInput):

    try:

        return predict_general_crop(data)

    except Exception as e:

        raise HTTPException(
            status_code=500,
            detail=f"General crop prediction failed: {str(e)}"
        )


# =========================================================
# LOCATION-AWARE CROP PREDICTION
# =========================================================

@router.post("/location-aware")
def location_crop_prediction(
    data: LocationCropInput
):

    try:

        return predict_location_crop(data)

    except Exception as e:

        raise HTTPException(
            status_code=500,
            detail=f"Location-aware prediction failed: {str(e)}"
        )