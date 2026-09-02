const API_BASE_URL = "http://127.0.0.1:8000";

/**
 * Generic API request helper
 */
async function apiRequest(endpoint, data) {
  try {
    const response = await fetch(
      `${API_BASE_URL}${endpoint}`,
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(data),
      }
    );

    // Safely parse FastAPI response
    const result = await response.json();

    // Handle backend errors
    if (!response.ok) {
      throw new Error(
        result?.detail ||
        `Request failed with status ${response.status}`
      );
    }

    return result;

  } catch (error) {

    console.error(
      `API Error [${endpoint}]:`,
      error
    );

    throw error;
  }
}


/* =====================================================
   SOIL TYPE PREDICTION
   POST /predict/soil-type
===================================================== */

export async function predictSoilType(data) {

  const payload = {
    nitrogen: Number(data.nitrogen),
    phosphorus: Number(data.phosphorus),
    potassium: Number(data.potassium),

    temperature: Number(data.temperature),
    humidity: Number(data.humidity),

    ph_value: Number(data.ph_value),

    rainfall: Number(data.rainfall),

    crop: String(data.crop),
  };

  return apiRequest(
    "/predict/soil-type",
    payload
  );
}


/* =====================================================
   SOIL QUALITY PREDICTION
   POST /predict/soil-quality
===================================================== */

export async function predictSoilQuality(data) {

  const payload = {
    nitrogen: Number(data.nitrogen),
    phosphorus: Number(data.phosphorus),
    potassium: Number(data.potassium),

    ph_value: Number(data.ph_value),

    soil_moisture: Number(data.soil_moisture),

    organic_carbon: Number(data.organic_carbon),

    electrical_conductivity:
      Number(data.electrical_conductivity),

    temperature: Number(data.temperature),

    humidity: Number(data.humidity),

    rainfall: Number(data.rainfall),
  };

  return apiRequest(
    "/predict/soil-quality",
    payload
  );
}


/* =====================================================
   GENERAL CROP PREDICTION
   POST /predict/general
===================================================== */

export async function predictGeneralCrop(data) {

  const payload = {
    soil_type: String(data.soil_type),
    crop_season: String(data.crop_season),

    nitrogen: Number(data.nitrogen),
    phosphorus: Number(data.phosphorus),
    potassium: Number(data.potassium),

    soil_ph: Number(data.soil_ph),

    soil_moisture: Number(data.soil_moisture),

    organic_carbon: Number(data.organic_carbon),

    electrical_conductivity:
      Number(data.electrical_conductivity),

    temperature: Number(data.temperature),

    humidity: Number(data.humidity),

    rainfall: Number(data.rainfall),
  };

  return apiRequest(
    "/predict/general",
    payload
  );
}


/* =====================================================
   LOCATION-AWARE CROP PREDICTION
   POST /predict/location-aware
===================================================== */

export async function predictLocationAwareCrop(data) {

  const payload = {
    state: String(data.state),

    soil_type: String(data.soil_type),

    crop_season:
      String(data.crop_season),

    nitrogen: Number(data.nitrogen),

    phosphorus:
      Number(data.phosphorus),

    potassium:
      Number(data.potassium),

    soil_ph:
      Number(data.soil_ph),

    soil_moisture:
      Number(data.soil_moisture),

    organic_carbon:
      Number(data.organic_carbon),

    electrical_conductivity:
      Number(data.electrical_conductivity),

    temperature:
      Number(data.temperature),

    humidity:
      Number(data.humidity),

    rainfall:
      Number(data.rainfall),
  };

  return apiRequest(
    "/predict/location-aware",
    payload
  );
}


/* =====================================================
   COMPLETE SOIL ANALYSIS

   Optional helper that calls both soil ML models
   simultaneously.
===================================================== */

export async function analyzeSoil(data) {

  const [
    soilType,
    soilQuality,
  ] = await Promise.all([

    predictSoilType(data),

    predictSoilQuality(data),

  ]);

  return {
    soilType,
    soilQuality,
  };
}