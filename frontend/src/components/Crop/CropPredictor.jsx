import { useState } from "react";

import RangeField from "../UI/RangeField";
import {predictGeneralCrop,predictLocationAwareCrop,} from "../../services/api";

function CropPredictor({ mode, soilType, onPredict }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    state: "",
    soil_type: soilType || "",
    crop_season: "Kharif",
    nitrogen: 100,
    phosphorus: 50,
    potassium: 100,
    soil_ph: 7,
    soil_moisture: 50,
    organic_carbon: 5,
    electrical_conductivity: 1,
    temperature: 25,
    humidity: 50,
    rainfall: 1000,
  });
  const fields = [
    {name: "nitrogen",label: "Nitrogen (N)",min: 0,max: 200,step: 1,unit: "",},
    {name: "phosphorus",label: "Phosphorus (P)",min: 0,max: 100,step: 1,unit: "",},
    {name: "potassium",label: "Potassium (K)",min: 0,max: 200,step: 1,unit: "",},
    {name: "soil_ph",label: "Soil pH",min: 0,max: 14,step: 0.1,unit: "",},
    {name: "soil_moisture",label: "Soil Moisture",min: 0,max: 100,step: 1,unit: "%",},
    {name: "organic_carbon",label: "Organic Carbon",min: 0,max: 20,step: 0.1,unit: "%",},
    {name: "electrical_conductivity",label: "Electrical Conductivity",min: 0,max: 20,step: 0.1,unit: "",},
    {name: "temperature",label: "Temperature",min: 10,max: 45,step: 0.1,unit: "°C",},
    {name: "humidity",label: "Humidity",min: 0,max: 100,step: 1,unit: "%",},
    {name: "rainfall",label: "Rainfall",min: 0,max: 3000,step: 10,unit: "mm",},
  ];


  const handleChange = (e) => {
    setForm((prev) => ({...prev,[e.target.name]: Number(e.target.value),}));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError("");
      const basePayload = {
        soil_type: form.soil_type,
        crop_season: form.crop_season,
        nitrogen: Number(form.nitrogen),
        phosphorus: Number(form.phosphorus),
        potassium: Number(form.potassium),
        soil_ph: Number(form.soil_ph),
        soil_moisture: Number(form.soil_moisture),
        organic_carbon: Number(form.organic_carbon),
        electrical_conductivity:Number(form.electrical_conductivity),
        temperature:Number(form.temperature),
        humidity:Number(form.humidity),
        rainfall:Number(form.rainfall),
      };
      let response;
      if (mode === "location-aware") {
        response =await predictLocationAwareCrop({...basePayload,state: form.state,});
      }
      else {
        response =await predictGeneralCrop(basePayload);
      }
      console.log( "CROP API RESPONSE:", response);
      const formattedResults =(response.top_5_crops || []).map((crop) => ({name: crop.crop,probability:Number(crop.probability),}));
      console.log("FORMATTED CROP RESULTS:",formattedResults);
      onPredict(formattedResults);
    } catch (err) {
      console.error("Crop Prediction Error:",err);
      setError(
        err.message ||
        "Unable to predict crops. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="crop-form-section">
      <div className="crop-form-container">
        <div className="crop-header">
          <span className="crop-eyebrow">
            AI CROP RECOMMENDATION
          </span>
          <h1>
            {mode === "location-aware"
              ? "LOCATION-AWARE CROP PREDICTION"
              : "LOCATION-INDEPENDENT CROP PREDICTION"
            }
          </h1>
          <p>
            Configure the agricultural conditions and let
            the AI recommend the most suitable crops.
          </p>
        </div>
        <form className="crop-form" onSubmit={handleSubmit}>
          {mode === "location-aware" && (
            <div className="select-field">
              <label htmlFor="state">
                State / Location
              </label>
              <input id="state" name="state" value={form.state} placeholder="Enter your state"
                onChange={(e) =>
                  setForm((prev) => ({...prev,
                    state: e.target.value,
                  }))
                }
                required
              />
            </div>
          )}

          <div className="select-field">
            <label htmlFor="soil_type">
              Soil Type
            </label>
            <input id="soil_type" name="soil_type" value={form.soil_type}
              onChange={(e) =>
                setForm((prev) => ({...prev,soil_type: e.target.value,
                }))
              }
              required
            />
          </div>

          <div className="select-field">
            <label htmlFor="crop_season">
              Crop Season
            </label>
            <select id="crop_season" name="crop_season" value={form.crop_season} onChange={(e) =>
                setForm((prev) => ({...prev,crop_season: e.target.value,}))
              }
            >
              <option value="Kharif">
                Kharif
              </option>
              <option value="Rabi">
                Rabi
              </option>
              <option value="Zaid">
                Zaid
              </option>
            </select>
          </div>

          {fields.map((field) => (
            <RangeField
              key={field.name}
              {...field}
              value={form[field.name]}
              onChange={handleChange}
            />
          ))}

          {error && (
            <div className="crop-error">
              ⚠ {error}
            </div>
          )}

          <button type="submit" className="crop-submit" disabled={loading}>
            {loading
              ? "AI IS ANALYZING..."
              : "PREDICT TOP 5 CROPS →"
            }
          </button>
        </form>
      </div>
      <style>{`
        .crop-form-section {
          min-height: 100vh;
          padding: 100px 20px;
          background:
            linear-gradient(
              180deg,
              #e7dccd,
              #f6f1e8
            );
        }
        .crop-form-container {
          max-width: 1100px;
          margin: auto;
        }
        .crop-header {
          text-align: center;
          margin-bottom: 55px;
        }
        .crop-eyebrow {
          color: #758d63;
          font-size: .75rem;
          font-weight: bold;
          letter-spacing: 3px;
        }
        .crop-header h1 {
          color: #3f3025;
          font-size:
            clamp(2.3rem, 5vw, 4.5rem);
          margin: 15px 0;
        }
        .crop-header p {
          color: #756553;
          max-width: 650px;
          margin: auto;
          line-height: 1.6;
        }
        .crop-form {
          background:
            rgba(255,253,249,.8);
          border:
            1px solid #d8cbbb;
          border-radius: 28px;
          padding: 40px;
          display: grid;
          grid-template-columns:
            repeat(2, 1fr);
          gap: 30px;
          box-shadow:
            0 30px 80px
            rgba(71,51,34,.08);
        }
        .select-field {
          display: flex;
          flex-direction: column;
          gap: 9px;
        }
        .select-field label {
          font-size: .9rem;
          font-weight: 600;
          color: #5b4a3b;
        }
        .select-field input,
        .select-field select {
          padding: 15px;
          border-radius: 12px;
          border:
            1px solid #d7c9b7;
          background: #fffdf9;
          font-size: 1rem;
          outline: none;
        }
        .select-field input:focus,
        .select-field select:focus {
          border-color: #758d63;
        }
        .crop-error {
          grid-column: 1 / -1;
          padding: 15px;
          border-radius: 12px;
          background: #fbe5df;
          color: #8b3325;
        }
        .crop-submit {
          grid-column: 1 / -1;
          padding: 20px;
          border: none;
          border-radius: 14px;
          background: #4b392b;
          color: white;
          font-weight: bold;
          letter-spacing: 1px;
          cursor: pointer;
          transition: .3s;
        }
        .crop-submit:hover:not(:disabled) {
          background: #657b57;
          transform: translateY(-3px);
          box-shadow:
            0 15px 30px
            rgba(80,100,70,.25);
        }
        .crop-submit:disabled {
          opacity: .7;
          cursor: wait;
        }
        @media(max-width: 700px) {
          .crop-form {
            grid-template-columns: 1fr;
            padding: 25px;
          }
        }
      `}</style>
    </section>
  );
}

export default CropPredictor;