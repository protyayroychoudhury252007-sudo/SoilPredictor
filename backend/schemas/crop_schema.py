from pydantic import BaseModel


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


class CropInput(BaseCropInput):

    soil_type: str
    crop_season: str


class LocationCropInput(CropInput):

    state: str