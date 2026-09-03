function CropResults({ results = [], onSelect }) {

  return (
    <>
      <style>{`
        .crop-results {
          min-height: 100vh;
          padding: 110px 20px;
          background:linear-gradient(180deg,#f6f1e8,#ebe2d6);
        }
        .crop-results-container {
          max-width: 1000px;
          margin: auto;
        }
        .crop-results-title {
          text-align: center;
          margin-bottom: 60px;
        }
        .crop-results-title span {
          color: #758d63;
          font-size: .75rem;
          font-weight: bold;
          letter-spacing: 3px;
        }
        .crop-results-title h1 {
          font-size:clamp(2.5rem, 6vw, 4.5rem);
          color: #3f3025;
          margin: 15px 0;
        }
        .crop-results-title p {
          color: #756553;
          font-size: 1.05rem;
        }
        .crop-list {
          display: flex;
          flex-direction: column;
          gap: 18px;
        }
        .crop-card {
          display: flex;
          align-items: center;
          gap: 30px;
          padding: 28px 35px;
          background: rgba(255,253,249,.9);
          border-radius: 20px;
          cursor: pointer;
          border:1px solid #e1d7ca;
          transition:transform .4s ease,box-shadow .4s ease,border-color .4s ease;
        }
        .crop-card:hover {
          transform:scale(1.025)translateX(8px);
          box-shadow:0 20px 40px rgba(60,45,30,.13);
          border-color: #8ca07d;
        }
        .crop-card:first-child {
          border:2px solid #7c916d;
          transform: scale(1.015);
        }
        .crop-card:first-child:hover {
          transform:scale(1.04) translateX(8px);
        }
        .crop-rank {
          font-size: 2rem;
          font-weight: bold;
          color: #7c916d;
          min-width: 70px;
        }
        .crop-info {
          flex: 1
        }
        .crop-info h2 {
          margin: 0 0 8px;
          color: #403126;
          font-size: 1.7rem;
        }
        .crop-info p {
          color: #756553;
          margin-bottom: 15px;
        }
        .progress {
          height: 9px;
          background: #e7dfd4;
          border-radius: 20px;
          overflow: hidden;
        }
        .progress-fill {
          height: 100%;
          background: #758d63;
          border-radius: 20px;
          transition: width 1s ease;
        }
        .explore-crop {
          color: #657b57;
          font-size: .8rem;
          font-weight: bold;
          letter-spacing: 1px;
          margin-top: 15px;
        }
        .no-crops {
          padding: 40px;
          text-align: center;
          background: white;
          border-radius: 20px;
          color: #6d5c4c;
        }
        @media(max-width: 600px) {
          .crop-card {
            flex-direction: column;
            align-items: flex-start;
            gap: 15px;
          }
          .crop-rank {
            font-size: 1.5rem;
          }
        }
      `}</style>

      <section className="crop-results">
        <div className="crop-results-container">
          <div className="crop-results-title">
            <span>
              AI RECOMMENDATION COMPLETE
            </span>
            <h1>
              TOP 5 RECOMMENDED CROPS
            </h1>
            <p>
              These crops are ranked based on their
              suitability for the provided agricultural
              conditions.
            </p>
          </div>

          {results.length > 0 ? (
            <div className="crop-list">
              {results.map((crop, index) => (
                <div className="crop-card" key={`${crop.name}-${index}`} onClick={() => onSelect(crop)}>
                  <div className="crop-rank">#{index + 1}</div>

                  <div className="crop-info">
                    <h2>
                      {crop.name}
                    </h2>
                    <p>
                      Prediction Probability:{" "}
                      <strong>
                        {Number(
                          crop.probability
                        ).toFixed(2)}%
                      </strong>
                    </p>

                    <div className="progress">
                      <div className="progress-fill" style={{width: `${Math.min(100, Math.max(0,Number(crop.probability) ))}%` }} />
                    </div>
                    <div className="explore-crop">
                      EXPLORE THIS CROP →
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="no-crops">
              <h3>
                No crop predictions received.
              </h3>
              <p>
                Please check the API response.
              </p>
            </div>
          )}
        </div>
      </section>
    </>
  );

}

export default CropResults;