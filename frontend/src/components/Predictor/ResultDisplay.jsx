function ResultDisplay({ result }) {
  if (!result) return null;

  if (result.predicted_soil_type) {
    return (
      <div className="result-card">
        <h2>🌱 Soil Prediction Result</h2>

        <div className="main-result">
          <h1>{result.predicted_soil_type}</h1>
          <p>Confidence: {result.confidence}%</p>
        </div>

        <h3>Top 3 Predictions</h3>

        {result.top_3_soil_types?.map((item, index) => (
          <div className="probability-row" key={index}>
            <span>{item.soil_type}</span>

            <div className="progress">
              <div
                className="progress-fill"
                style={{ width: `${item.probability}%` }}
              />
            </div>

            <strong>{item.probability}%</strong>
          </div>
        ))}
      </div>
    );
  }

  if (result.soil_quality_percentage !== undefined) {
    return (
      <div className="result-card quality-result">
        <h2>⭐ Soil Quality Result</h2>

        <div className="quality-circle">
          {result.soil_quality_percentage}%
        </div>

        <h1>{result.quality_level}</h1>

        <p>
          Overall soil health score generated from nutrient
          and environmental conditions.
        </p>
      </div>
    );
  }

  if (result.top_5_crops) {
    return (
      <div className="result-card">
        <h2>🌾 Top Crop Recommendations</h2>

        {result.top_5_crops.map((crop, index) => (
          <div className="crop-result" key={index}>
            <span className="rank">#{index + 1}</span>
            <strong>{crop.crop}</strong>
            <span>{crop.probability}%</span>
          </div>
        ))}
      </div>
    );
  }

  return null;
}

export default ResultDisplay;