function SoilResults({
  results,
  soilQualityScore,
  onSelect,
}) {

  const getQualityLabel = (score) => {
    if (score >= 8) return "Excellent";
    if (score >= 6) return "Good";
    if (score >= 4) return "Moderate";
    return "Poor";
  };

  return (
    <>
      <style>{`
        .soil-results {
          min-height: 100vh;
          padding: 100px 20px;
          background: linear-gradient(180deg, #f6f1e8, #e7dccd);
        }

        .results-container {
          max-width: 1000px;
          margin: auto;
        }

        .results-header {
          text-align: center;
          margin-bottom: 60px;
        }

        .results-header span {
          color: #758d63;
          font-size: 0.75rem;
          font-weight: 700;
          letter-spacing: 3px;
        }

        .results-header h1 {
          color: #3f3024;
          font-size: clamp(2.5rem, 5vw, 4rem);
          margin: 15px 0;
        }

        .results-header p {
          color: #7b6b59;
          max-width: 600px;
          margin: auto;
          line-height: 1.6;
        }

        .section-heading {
          color: #4b392b;
          font-size: 1.4rem;
          margin-bottom: 25px;
        }

        .soil-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 30px;
        }

        .soil-card {
          background: #fffaf2;
          border-radius: 25px;
          padding: 35px;
          cursor: pointer;
          border: 1px solid #ded1bf;

          transition:
            transform .5s cubic-bezier(.2,.8,.2,1),
            box-shadow .5s,
            border-color .5s;
        }

        .soil-card:hover {
          transform: scale(1.04) translateY(-8px);
          box-shadow: 0 30px 60px rgba(65,45,30,.18);
          border-color: #9aaa8a;
        }

        .soil-card.primary {
          transform: scale(1.03);
          border: 2px solid #7c916d;
        }

        .soil-card.primary:hover {
          transform: scale(1.07) translateY(-8px);
        }

        .rank {
          color: #8a7765;
          font-size: .8rem;
          letter-spacing: 2px;
          font-weight: 700;
        }

        .soil-name {
          font-size: 2rem;
          color: #3d3026;
          margin: 20px 0;
        }

        .confidence-section {
          margin-top: 20px;
        }

        .confidence-section span {
          display: block;
          color: #8a7765;
          font-size: .75rem;
          letter-spacing: 1.5px;
          font-weight: 600;
          margin-bottom: 8px;
        }

        .confidence {
          font-size: 3rem;
          color: #657b57;
          font-weight: bold;
        }

        .explore {
          margin-top: 30px;
          color: #657b57;
          font-size: .8rem;
          font-weight: 700;
          letter-spacing: 1px;
        }


        /* ================================
           OVERALL SOIL QUALITY SECTION
        ================================= */

        .quality-analysis {
          margin-top: 70px;
          padding: 45px;

          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 40px;

          border-radius: 30px;
          background: #49382b;
          color: #fffaf2;

          box-shadow: 0 25px 60px rgba(50,35,25,.15);
        }

        .quality-info {
          flex: 1;
        }

        .quality-eyebrow {
          color: #b8ca9e;
          font-size: .75rem;
          font-weight: 700;
          letter-spacing: 2px;
        }

        .quality-info h2 {
          font-size: 2.2rem;
          margin: 12px 0;
        }

        .quality-info p {
          color: #d8cbbb;
          max-width: 500px;
          line-height: 1.6;
        }

        .quality-score {
          min-width: 220px;
          text-align: center;

          padding: 25px;

          background: rgba(255,255,255,.08);
          border: 1px solid rgba(255,255,255,.1);

          border-radius: 20px;
        }

        .quality-score-title {
          display: block;
          font-size: .7rem;
          letter-spacing: 2px;
          color: #cfc2b2;
        }

        .quality-score strong {
          display: block;
          font-size: 4rem;
          color: #c9d6b8;
          margin: 10px 0;
        }

        .quality-label {
          font-size: 1rem;
          font-weight: 700;
          color: white;
        }


        @media(max-width: 700px) {

          .soil-results {
            padding: 70px 15px;
          }

          .soil-grid {
            grid-template-columns: 1fr;
          }

          .soil-card.primary {
            transform: none;
          }

          .soil-card.primary:hover {
            transform: scale(1.03) translateY(-5px);
          }

          .quality-analysis {
            flex-direction: column;
            align-items: stretch;
            padding: 30px;
          }

          .quality-score {
            width: 100%;
          }

        }
      `}</style>

      <section className="soil-results">

        <div className="results-container">

          {/* HEADER */}

          <div className="results-header">
            <span>AI ANALYSIS COMPLETE</span>

            <h1>YOUR SOIL ANALYSIS</h1>

            <p>
              Explore the most likely soil types predicted by
              the machine learning model.
            </p>
          </div>


          {/* SOIL TYPE RESULTS */}

          <h2 className="section-heading">
            TOP SOIL TYPE PREDICTIONS
          </h2>

          <div className="soil-grid">

            {results?.map((soil, index) => (

              <div
                key={`${soil.name}-${index}`}
                className={`soil-card ${
                  index === 0 ? "primary" : ""
                }`}
                onClick={() => onSelect(soil)}
              >

                <div className="rank">
                  #{index + 1} PREDICTION
                </div>

                <h2 className="soil-name">
                  {soil.name}
                </h2>


                <div className="confidence-section">

                  <span>
                    SOIL TYPE CONFIDENCE
                  </span>

                  <div className="confidence">
                    {Number(soil.confidence).toFixed(2)}%
                  </div>

                </div>


                <div className="explore">
                  EXPLORE THIS SOIL →
                </div>

              </div>

            ))}

          </div>


          {/* OVERALL SOIL QUALITY */}

          {soilQualityScore !== undefined && (
            <div className="quality-analysis">

              <div className="quality-info">

                <span className="quality-eyebrow">
                  SOIL FERTILITY ANALYSIS
                </span>

                <h2>
                  Overall Soil Quality
                </h2>

                <p>
                  This score is calculated independently from
                  soil type prediction using nutrient, moisture,
                  organic carbon, conductivity and environmental data.
                </p>

              </div>


              <div className="quality-score">

                <span className="quality-score-title">
                  QUALITY SCORE
                </span>

                <strong>
                  {Number(soilQualityScore).toFixed(2)}
                </strong>

                <div className="quality-label">
                  {getQualityLabel(Number(soilQualityScore))}
                </div>

              </div>

            </div>
          )}

        </div>

      </section>
    </>
  );
}

export default SoilResults;