import { useState } from "react";
import InputField from "../InputField";
import { predictSoilQuality } from "../../services/api";

function SoilQualityForm({ setResult, setError, loading, setLoading }) {
  const [data, setData] = useState({
    nitrogen: 100,
    phosphorus: 50,
    potassium: 100,
    ph_value: 6.5,
    soil_moisture: 30,
    organic_carbon: 3,
    electrical_conductivity: 1,
    temperature: 25,
    humidity: 60,
    rainfall: 1200
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: Number(value) });
  };

  const handlePredict = async () => {
    try {
      setLoading(true);
      setResult(null);
      setError("");

      const response = await predictSoilQuality(data);
      setResult(response);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <h2>⭐ Soil Quality Analyzer</h2>

      <p className="form-description">
        Analyze soil health and receive a quality percentage.
      </p>

      <div className="form-grid">
        {[
          ["Nitrogen", "nitrogen"],
          ["Phosphorus", "phosphorus"],
          ["Potassium", "potassium"],
          ["pH Value", "ph_value"],
          ["Soil Moisture (%)", "soil_moisture"],
          ["Organic Carbon", "organic_carbon"],
          ["Electrical Conductivity", "electrical_conductivity"],
          ["Temperature (°C)", "temperature"],
          ["Humidity (%)", "humidity"],
          ["Rainfall (mm)", "rainfall"]
        ].map(([label, name]) => (
          <InputField
            key={name}
            label={label}
            name={name}
            value={data[name]}
            onChange={handleChange}
          />
        ))}
      </div>

      <button
        className="predict-button"
        onClick={handlePredict}
        disabled={loading}
      >
        {loading ? "⏳ Analyzing..." : "⭐ Analyze Soil Quality"}
      </button>
    </>
  );
}

export default SoilQualityForm;