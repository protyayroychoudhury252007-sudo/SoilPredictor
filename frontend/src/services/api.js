const API_URL = "http://127.0.0.1:8000";

const makePrediction = async (endpoint, payload) => {
  const response = await fetch(`${API_URL}${endpoint}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload)
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.detail || "Prediction failed");
  }

  return data;
};

export const predictSoilType = (data) =>
  makePrediction("/predict/soil-type", data);

export const predictSoilQuality = (data) =>
  makePrediction("/predict/soil-quality", data);

export const predictGeneralCrop = (data) =>
  makePrediction("/predict/general", data);

export const predictLocationCrop = (data) =>
  makePrediction("/predict/location-aware", data);