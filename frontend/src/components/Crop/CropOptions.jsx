function CropOptions({ onSelect }) {
  return (
    <>
      <style>{`
        .crop-options {
          padding: 120px 20px;
          background: #f6f1e8;
        }
        .options-container {
          max-width: 1000px;
          margin: auto;
          text-align: center;
        }
        .options-container h1 {
          font-size: 4rem;
          color: #3d3025;
        }
        .option-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 30px;
          margin-top: 60px;
        }
        .option-card {
          padding: 50px 35px;
          background: white;
          border: 1px solid #ded2c3;
          border-radius: 28px;
          cursor: pointer;
          transition: .5s;
        }
        .option-card:hover {
          transform: translateY(-12px) scale(1.03);
          box-shadow: 0 30px 60px rgba(60,45,30,.15);
        }
        .option-card h2 {
          color: #4b392b;
        }
        @media(max-width: 700px) {
          .option-grid {
            grid-template-columns: 1fr;
          }
          .options-container h1 {
            font-size: 2.8rem;
          }
        }
      `}</style>
      <section className="crop-options">
        <div className="options-container">
          <h1>CROP PREDICTION</h1>
          <p>
            Choose how you want the AI to analyze crop suitability.
          </p>
          <div className="option-grid">
            <div className="option-card" onClick={() => onSelect("location-aware")}>
              <h2>📍 Location-Aware</h2>
              <p>
                Uses geographical and environmental information
                for more localized crop recommendations.
              </p>
            </div>
            <div className="option-card" onClick={() => onSelect("general")}>
              <h2>🌱 Location-Independent</h2>
              <p>
                Predict suitable crops using soil and environmental
                parameters without requiring location.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default CropOptions;