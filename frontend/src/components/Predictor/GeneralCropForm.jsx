import { useState } from "react";
import InputField from "../InputField";
import { predictGeneralCrop } from "../../services/api";

function GeneralCropForm({ setResult, setError, loading, setLoading }) {
  const [data, setData] = useState({
    nitrogen: 90,
    phosphorus: 45,
    potassium: 80,
    soil_ph: 6.5,
    soil_moisture: 30,
    organic_carbon: 2.5,
    electrical_conductivity: 1,
    temperature: 25,
    humidity: 60,
    rainfall: 1200,
    soil_type: "Loamy",
    crop_season: "Kharif"
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

      const response = await predictGeneralCrop(data);
      setResult(response);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <h2>🌾 Crop Recommendation Engine</h2>

      <p className="form-description">
        Get the top crop recommendations based on your soil
        and environmental conditions.
      </p>

      <div className="form-grid">
        {Object.entries(data).map(([name, value]) => (
          <InputField
            key={name}
            label={name.replaceAll("_", " ").toUpperCase()}
            name={name}
            value={value}
            type={typeof value === "string" ? "text" : "number"}
            onChange={handleChange}
          />
        ))}
      </div>

      <button
        className="predict-button"
        onClick={handlePredict}
        disabled={loading}
      >
        {loading ? "⏳ Predicting..." : "🌾 Recommend Crops"}
      </button>
    </>
  );
}

export default GeneralCropForm;