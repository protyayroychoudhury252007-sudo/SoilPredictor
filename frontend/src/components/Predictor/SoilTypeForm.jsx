import { useState } from "react";
import InputField from "../InputField";
import { predictSoilType } from "../../services/api";

function SoilTypeForm({ setResult, setError, loading, setLoading }) {
  const [data, setData] = useState({
    nitrogen: 90,
    phosphorus: 45,
    potassium: 80,
    temperature: 25,
    humidity: 60,
    ph_value: 6.5,
    rainfall: 1200,
    crop: "Rice"
  });

  const handleChange = (e) => {
    const { name, value, type } = e.target;

    setData({
      ...data,
      [name]: type === "number" ? Number(value) : value
    });
  };

  const handlePredict = async () => {
    try {
      setLoading(true);
      setResult(null);
      setError("");

      const response = await predictSoilType(data);

      setResult(response);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <h2>🌱 Soil Type Predictor</h2>

      <p className="form-description">
        Enter soil nutrients and environmental conditions.
      </p>

      <div className="form-grid">
        <InputField label="Nitrogen (N)" name="nitrogen"
          value={data.nitrogen} onChange={handleChange}
          min="0" max="200" description="Range: 0–200" />

        <InputField label="Phosphorus (P)" name="phosphorus"
          value={data.phosphorus} onChange={handleChange}
          min="0" max="100" description="Range: 0–100" />

        <InputField label="Potassium (K)" name="potassium"
          value={data.potassium} onChange={handleChange}
          min="0" max="200" description="Range: 0–200" />

        <InputField label="Temperature (°C)" name="temperature"
          value={data.temperature} onChange={handleChange}
          min="10" max="45" description="Range: 10–45°C" />

        <InputField label="Humidity (%)" name="humidity"
          value={data.humidity} onChange={handleChange}
          min="0" max="100" description="Range: 0–100%" />

        <InputField label="pH Value" name="ph_value"
          value={data.ph_value} onChange={handleChange}
          min="0" max="14" step="0.1"
          description="Range: 0–14" />

        <InputField label="Rainfall (mm)" name="rainfall"
          value={data.rainfall} onChange={handleChange}
          min="0" max="3000" description="Range: 0–3000 mm" />

        <InputField label="Crop" name="crop" type="text"
          value={data.crop} onChange={handleChange}
          description="Example: Rice, Wheat, Maize" />
      </div>

      <button
        className="predict-button"
        onClick={handlePredict}
        disabled={loading}
      >
        {loading ? "⏳ Predicting..." : "🌱 Predict Soil Type"}
      </button>
    </>
  );
}

export default SoilTypeForm;