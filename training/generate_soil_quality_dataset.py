import numpy as np
import pandas as pd
from pathlib import Path


# =========================================================
# SETTINGS
# =========================================================

np.random.seed(42)

NUM_SAMPLES = 15000


# =========================================================
# GENERATE FEATURES
# =========================================================

nitrogen = np.random.uniform(0, 200, NUM_SAMPLES)
phosphorus = np.random.uniform(0, 100, NUM_SAMPLES)
potassium = np.random.uniform(0, 200, NUM_SAMPLES)

ph_value = np.random.uniform(3.5, 10, NUM_SAMPLES)

soil_moisture = np.random.uniform(5, 60, NUM_SAMPLES)

organic_carbon = np.random.uniform(0.1, 3.5, NUM_SAMPLES)

electrical_conductivity = np.random.uniform(
    0.1,
    8,
    NUM_SAMPLES
)

temperature = np.random.uniform(10, 45, NUM_SAMPLES)

humidity = np.random.uniform(20, 100, NUM_SAMPLES)

rainfall = np.random.uniform(0, 3000, NUM_SAMPLES)


# =========================================================
# SOIL QUALITY CALCULATION
# =========================================================

# Nitrogen score
nitrogen_score = np.clip(
    100 - abs(nitrogen - 100) * 0.8,
    0,
    100
)


# Phosphorus score
phosphorus_score = np.clip(
    100 - abs(phosphorus - 50) * 1.5,
    0,
    100
)


# Potassium score
potassium_score = np.clip(
    100 - abs(potassium - 100) * 0.8,
    0,
    100
)


# Ideal soil pH around 6.5
ph_score = np.clip(
    100 - abs(ph_value - 6.5) * 25,
    0,
    100
)


# Ideal moisture around 30%
moisture_score = np.clip(
    100 - abs(soil_moisture - 30) * 2.5,
    0,
    100
)


# Organic carbon
organic_carbon_score = np.clip(
    organic_carbon * 30,
    0,
    100
)


# Low EC is generally better
ec_score = np.clip(
    100 - electrical_conductivity * 12,
    0,
    100
)


# Temperature score
temperature_score = np.clip(
    100 - abs(temperature - 25) * 5,
    0,
    100
)


# Humidity score
humidity_score = np.clip(
    100 - abs(humidity - 60) * 1.2,
    0,
    100
)


# Rainfall score
rainfall_score = np.clip(
    100 - abs(rainfall - 1200) / 20,
    0,
    100
)


# =========================================================
# FINAL SOIL QUALITY SCORE
# =========================================================

soil_quality = (
    nitrogen_score * 0.15 +
    phosphorus_score * 0.10 +
    potassium_score * 0.10 +
    ph_score * 0.15 +
    moisture_score * 0.10 +
    organic_carbon_score * 0.15 +
    ec_score * 0.10 +
    temperature_score * 0.05 +
    humidity_score * 0.05 +
    rainfall_score * 0.05
)


# Add realistic noise
soil_quality += np.random.normal(
    0,
    3,
    NUM_SAMPLES
)


# Keep score between 0 and 100
soil_quality = np.clip(
    soil_quality,
    0,
    100
)


# =========================================================
# CREATE DATAFRAME
# =========================================================

df = pd.DataFrame({
    "Nitrogen": nitrogen.round(2),
    "Phosphorus": phosphorus.round(2),
    "Potassium": potassium.round(2),
    "pH_Value": ph_value.round(2),
    "Soil_Moisture": soil_moisture.round(2),
    "Organic_Carbon": organic_carbon.round(2),
    "Electrical_Conductivity": electrical_conductivity.round(2),
    "Temperature": temperature.round(2),
    "Humidity": humidity.round(2),
    "Rainfall": rainfall.round(2),
    "Soil_Quality": soil_quality.round(2)
})


# =========================================================
# SAVE DATASET
# =========================================================

PROJECT_DIR = Path(__file__).resolve().parent.parent

DATASET_DIR = PROJECT_DIR / "datasets"

DATASET_DIR.mkdir(
    parents=True,
    exist_ok=True
)


DATASET_PATH = (
    DATASET_DIR /
    "soil_quality_dataset.csv"
)


df.to_csv(
    DATASET_PATH,
    index=False
)


print("\n" + "=" * 60)
print("SOIL QUALITY DATASET GENERATED SUCCESSFULLY!")
print("=" * 60)

print(f"\nDataset Path:\n{DATASET_PATH}")

print(f"\nNumber of Samples: {len(df)}")

print("\nFirst 5 Rows:")
print(df.head())

print("\nSoil Quality Statistics:")
print(df["Soil_Quality"].describe())