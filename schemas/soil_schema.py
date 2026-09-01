from pydantic import BaseModel, Field


class SoilInput(BaseModel):

    nitrogen: float = Field(
        ...,
        ge=0,
        le=200,
        description="Nitrogen level (0-200)"
    )

    phosphorus: float = Field(
        ...,
        ge=0,
        le=100,
        description="Phosphorus level (0-100)"
    )

    potassium: float = Field(
        ...,
        ge=0,
        le=200,
        description="Potassium level (0-200)"
    )

    temperature: float = Field(
        ...,
        ge=10,
        le=45,
        description="Temperature in Celsius"
    )

    humidity: float = Field(
        ...,
        ge=0,
        le=100,
        description="Humidity percentage"
    )

    ph_value: float = Field(
        ...,
        ge=0,
        le=14,
        description="Soil pH value"
    )

    rainfall: float = Field(
        ...,
        ge=0,
        le=3000,
        description="Rainfall in mm"
    )

    crop: str = Field(
        ...,
        min_length=1,
        description="Crop name, e.g. Wheat, Rice, Maize"
    )