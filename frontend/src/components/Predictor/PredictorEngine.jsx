import { useState } from "react";
import SoilTypeForm from "./SoilTypeForm";
import SoilQualityForm from "./SoilQualityForm";
import GeneralCropForm from "./GeneralCropForm";
import LocationCropForm from "./LocationCropForm";
import ResultDisplay from "./ResultDisplay";

function PredictorEngine() {
  const [activePredictor, setActivePredictor] =
    useState("soil-type");

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const commonProps = {
    setResult,
    setError,
    loading,
    setLoading
  };

  const changePredictor = (predictor) => {
    setActivePredictor(predictor);
    setResult(null);
    setError("");
  };

  return (
    <section className="section predictor-section" id="predictor">
      <h2 className="section-title">AI Predictor Engine</h2>

      <p className="section-subtitle">
        Select an intelligent prediction tool and provide
        your agricultural data.
      </p>

      <div className="predictor-tabs">
        <button
          className={activePredictor === "soil-type" ? "tab active" : "tab"}
          onClick={() => changePredictor("soil-type")}
        >
          🌱 Soil Type
        </button>

        <button
          className={activePredictor === "soil-quality" ? "tab active" : "tab"}
          onClick={() => changePredictor("soil-quality")}
        >
          ⭐ Soil Quality
        </button>

        <button
          className={activePredictor === "general-crop" ? "tab active" : "tab"}
          onClick={() => changePredictor("general-crop")}
        >
          🌾 General Crop
        </button>

        <button
          className={activePredictor === "location-crop" ? "tab active" : "tab"}
          onClick={() => changePredictor("location-crop")}
        >
          📍 Location Crop
        </button>
      </div>

      <div className="predictor-container">
        {activePredictor === "soil-type" && (
          <SoilTypeForm {...commonProps} />
        )}

        {activePredictor === "soil-quality" && (
          <SoilQualityForm {...commonProps} />
        )}

        {activePredictor === "general-crop" && (
          <GeneralCropForm {...commonProps} />
        )}

        {activePredictor === "location-crop" && (
          <LocationCropForm {...commonProps} />
        )}

        {error && (
          <div className="error">❌ {error}</div>
        )}

        <ResultDisplay result={result} />
      </div>
    </section>
  );
}

export default PredictorEngine;