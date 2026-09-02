from pydantic import BaseModel, Field


# =========================================================
# SOIL TYPE INPUT
# =========================================================

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


# =========================================================
# SOIL QUALITY INPUT
# =========================================================

class SoilQualityInput(BaseModel):

    nitrogen: float = Field(
        ...,
        ge=0,
        le=200,
        description="Nitrogen level"
    )

    phosphorus: float = Field(
        ...,
        ge=0,
        le=100,
        description="Phosphorus level"
    )

    potassium: float = Field(
        ...,
        ge=0,
        le=200,
        description="Potassium level"
    )

    ph_value: float = Field(
        ...,
        ge=0,
        le=14,
        description="Soil pH value"
    )

    soil_moisture: float = Field(
        ...,
        ge=0,
        le=100,
        description="Soil moisture percentage"
    )

    organic_carbon: float = Field(
        ...,
        ge=0,
        description="Organic carbon content"
    )

    electrical_conductivity: float = Field(
        ...,
        ge=0,
        description="Electrical conductivity"
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

    rainfall: float = Field(
        ...,
        ge=0,
        le=3000,
        description="Rainfall in mm"
    )
