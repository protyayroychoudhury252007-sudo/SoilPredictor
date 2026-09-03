const API_BASE_URL = "http://127.0.0.1:8000";

async function apiRequest(endpoint, data) {
  try {
    const response = await fetch(
      `${API_BASE_URL}${endpoint}`,
      {
        method: "POST",
        headers: {"Content-Type": "application/json",},
        body: JSON.stringify(data),
      }
    );

    const result = await response.json();
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
  return apiRequest("/predict/soil-type",payload);
}

export async function predictSoilQuality(data) {
  const payload = {
    nitrogen: Number(data.nitrogen),
    phosphorus: Number(data.phosphorus),
    potassium: Number(data.potassium),
    ph_value: Number(data.ph_value),
    soil_moisture: Number(data.soil_moisture),
    organic_carbon: Number(data.organic_carbon),
    electrical_conductivity:Number(data.electrical_conductivity),
    temperature: Number(data.temperature),
    humidity: Number(data.humidity),
    rainfall: Number(data.rainfall),
  };
  return apiRequest("/predict/soil-quality",payload );}

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
    electrical_conductivity:Number(data.electrical_conductivity),
    temperature: Number(data.temperature),
    humidity: Number(data.humidity),
    rainfall: Number(data.rainfall),
  };
  return apiRequest("/predict/general",payload);
}

export async function predictLocationAwareCrop(data) {
  const payload = {
    state: String(data.state),
    soil_type: String(data.soil_type),
    crop_season:String(data.crop_season),
    nitrogen: Number(data.nitrogen),
    phosphorus:Number(data.phosphorus),
    potassium:Number(data.potassium),
    soil_ph:Number(data.soil_ph),
    soil_moisture:Number(data.soil_moisture),
    organic_carbon:Number(data.organic_carbon),
    electrical_conductivity:Number(data.electrical_conductivity),
    temperature:Number(data.temperature),
    humidity:Number(data.humidity),
    rainfall:Number(data.rainfall),
  };
  return apiRequest("/predict/location-aware",payload);
}

export async function analyzeSoil(data) {
  const [soilType,soilQuality,] = await Promise.all([predictSoilType(data),predictSoilQuality(data),]);
  return {soilType,soilQuality,};
}