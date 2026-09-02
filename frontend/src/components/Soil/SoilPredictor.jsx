import { useState } from "react";
import RangeField from "../UI/RangeField";

import {
  predictSoilType,
  predictSoilQuality,
} from "../../services/api";

function SoilPredictor({ onPredict }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    nitrogen: 100,
    phosphorus: 50,
    potassium: 100,

    temperature: 25,
    humidity: 50,
    ph_value: 7,
    rainfall: 1000,

    crop: "Rice",

    soil_moisture: 50,
    organic_carbon: 5,
    electrical_conductivity: 1,
  });


  const soilFields = [
    {
      name: "nitrogen",
      label: "Nitrogen (N)",
      min: 0,
      max: 200,
      step: 1,
      unit: "",
    },

    {
      name: "phosphorus",
      label: "Phosphorus (P)",
      min: 0,
      max: 100,
      step: 1,
      unit: "",
    },

    {
      name: "potassium",
      label: "Potassium (K)",
      min: 0,
      max: 200,
      step: 1,
      unit: "",
    },

    {
      name: "temperature",
      label: "Temperature",
      min: 10,
      max: 45,
      step: 0.1,
      unit: "°C",
    },

    {
      name: "humidity",
      label: "Humidity",
      min: 0,
      max: 100,
      step: 1,
      unit: "%",
    },

    {
      name: "ph_value",
      label: "Soil pH",
      min: 0,
      max: 14,
      step: 0.1,
      unit: "",
    },

    {
      name: "rainfall",
      label: "Rainfall",
      min: 0,
      max: 3000,
      step: 10,
      unit: "mm",
    },

    {
      name: "soil_moisture",
      label: "Soil Moisture",
      min: 0,
      max: 100,
      step: 1,
      unit: "%",
    },

    {
      name: "organic_carbon",
      label: "Organic Carbon",
      min: 0,
      max: 20,
      step: 0.1,
      unit: "%",
    },

    {
      name: "electrical_conductivity",
      label: "Electrical Conductivity",
      min: 0,
      max: 20,
      step: 0.1,
      unit: "",
    },
  ];


  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: Number(e.target.value),
    }));
  };


  const handleCropChange = (e) => {
    setForm((prev) => ({
      ...prev,
      crop: e.target.value,
    }));
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError("");

      /* ===============================
         SOIL TYPE PAYLOAD
      =============================== */

      const soilTypePayload = {
        nitrogen: Number(form.nitrogen),
        phosphorus: Number(form.phosphorus),
        potassium: Number(form.potassium),

        temperature: Number(form.temperature),
        humidity: Number(form.humidity),

        ph_value: Number(form.ph_value),

        rainfall: Number(form.rainfall),

        crop: form.crop,
      };


      /* ===============================
         SOIL QUALITY PAYLOAD
      =============================== */

      const soilQualityPayload = {
        nitrogen: Number(form.nitrogen),
        phosphorus: Number(form.phosphorus),
        potassium: Number(form.potassium),

        ph_value: Number(form.ph_value),

        soil_moisture: Number(form.soil_moisture),

        organic_carbon: Number(form.organic_carbon),

        electrical_conductivity: Number(
          form.electrical_conductivity
        ),

        temperature: Number(form.temperature),

        humidity: Number(form.humidity),

        rainfall: Number(form.rainfall),
      };


      /* ===============================
         CALL BOTH ML MODELS
      =============================== */

      const [
        soilTypeResponse,
        soilQualityResponse,
      ] = await Promise.all([
        predictSoilType(soilTypePayload),
        predictSoilQuality(soilQualityPayload),
      ]);


      console.log(
        "SOIL TYPE RESPONSE:",
        soilTypeResponse
      );

      console.log(
        "SOIL QUALITY RESPONSE:",
        soilQualityResponse
      );


      /* ===============================
         FORMAT TOP 2 SOIL RESULTS
      =============================== */

      const soilTypes =
        (soilTypeResponse.top_3_soil_types || [])
          .slice(0, 2)
          .map((soil) => ({
            name: soil.soil_type,
            confidence: Number(soil.probability),
          }));


      /* ===============================
         GET OVERALL QUALITY SCORE
      =============================== */

      const soilQualityScore =
        soilQualityResponse.soil_quality_score;


      console.log(
        "FORMATTED SOIL TYPES:",
        soilTypes
      );

      console.log(
        "OVERALL SOIL QUALITY SCORE:",
        soilQualityScore
      );


      /* ===============================
         SEND CORRECT STRUCTURE TO APP
      =============================== */

      onPredict({
        soilTypes: soilTypes,
        soilQualityScore: soilQualityScore,
      });


    } catch (err) {
      console.error(
        "Prediction Error:",
        err
      );

      setError(
        err.message ||
        "Unable to get prediction. Please try again."
      );

    } finally {
      setLoading(false);
    }
  };


  return (
    <section className="predictor-page">

      <div className="predictor-container">

        {/* HEADER */}

        <div className="predictor-title">

          <span className="eyebrow">
            AI-POWERED ANALYSIS
          </span>

          <h1>SOIL PREDICTOR</h1>

          <p>
            Adjust the environmental and soil parameters
            to analyze your land.
          </p>

        </div>


        {/* FORM */}

        <form
          className="soil-form"
          onSubmit={handleSubmit}
        >

          {/* CROP FIELD */}

          <div className="crop-select-field">

            <label htmlFor="crop">
              Current / Reference Crop
            </label>

            <select
              id="crop"
              name="crop"
              value={form.crop}
              onChange={handleCropChange}
            >

              <option value="Rice">
                Rice
              </option>

              <option value="Wheat">
                Wheat
              </option>

              <option value="Maize">
                Maize
              </option>

              <option value="Cotton">
                Cotton
              </option>

              <option value="Groundnut">
                Groundnut
              </option>

              <option value="Sugarcane">
                Sugarcane
              </option>

            </select>

          </div>


          {/* RANGE FIELDS */}

          {soilFields.map((field) => (

            <RangeField
              key={field.name}
              {...field}
              value={form[field.name]}
              onChange={handleChange}
            />

          ))}


          {/* ERROR */}

          {error && (

            <div className="prediction-error">
              ⚠ {error}
            </div>

          )}


          {/* SUBMIT BUTTON */}

          <button
            type="submit"
            className="predict-btn"
            disabled={loading}
          >

            {loading
              ? "ANALYZING SOIL..."
              : "PREDICT WITH AI →"}

          </button>

        </form>

      </div>


      <style>{`

        .predictor-page {
          min-height: 100vh;
          padding: 100px 20px;
          background: #f6f1e8;
        }

        .predictor-container {
          max-width: 1100px;
          margin: auto;
        }

        .predictor-title {
          text-align: center;
          margin-bottom: 55px;
        }

        .eyebrow {
          font-size: 0.75rem;
          letter-spacing: 3px;
          color: #758d63;
          font-weight: 700;
        }

        .predictor-title h1 {
          font-size: clamp(2.8rem, 6vw, 5rem);
          color: #3e3025;
          margin: 12px 0;
        }

        .predictor-title p {
          color: #7b6b59;
          font-size: 1.05rem;
        }


        .soil-form {
          background: rgba(255,255,255,.8);

          border: 1px solid #dfd4c5;
          border-radius: 28px;

          padding: 40px;

          display: grid;
          grid-template-columns: repeat(2, 1fr);

          gap: 32px;

          box-shadow:
            0 30px 80px
            rgba(71,51,34,.08);
        }


        .crop-select-field {
          grid-column: 1 / -1;

          display: flex;
          flex-direction: column;

          gap: 10px;
        }

        .crop-select-field label {
          font-size: .9rem;
          font-weight: 600;
          color: #5b4a3b;
        }

        .crop-select-field select {
          padding: 16px;

          border-radius: 12px;

          border: 1px solid #d7c9b7;

          background: #fffdf9;

          font-size: 1rem;

          outline: none;
          cursor: pointer;

          transition: border-color .3s;
        }

        .crop-select-field select:focus {
          border-color: #758d63;
        }


        .prediction-error {
          grid-column: 1 / -1;

          padding: 14px;

          background: #fbe5df;
          color: #8b3325;

          border-radius: 10px;

          font-size: .9rem;
        }


        .predict-btn {
          grid-column: 1 / -1;

          padding: 19px;

          border: none;
          border-radius: 14px;

          background: #4b392b;
          color: white;

          font-weight: 700;
          letter-spacing: 1px;

          cursor: pointer;

          transition:
            transform .3s,
            background .3s,
            box-shadow .3s;
        }

        .predict-btn:hover:not(:disabled) {
          transform: translateY(-3px);

          background: #657b57;

          box-shadow:
            0 15px 30px
            rgba(80,100,70,.25);
        }

        .predict-btn:disabled {
          opacity: .7;
          cursor: wait;
        }


        @media(max-width: 700px) {

          .predictor-page {
            padding: 70px 15px;
          }

          .soil-form {
            grid-template-columns: 1fr;
            padding: 25px;
          }

        }

      `}</style>

    </section>
  );
}

export default SoilPredictor;