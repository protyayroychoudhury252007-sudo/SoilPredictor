function Technology() {
  return (
    <section className="section alternate-section" id="technology">
      <h2 className="section-title">Technology Stack</h2>

      <div className="card-grid">
        <div className="info-card">
          <div className="card-icon">🤖</div>
          <h3>Machine Learning</h3>
          <p>
            Scikit-learn models analyze agricultural datasets
            and generate predictions.
          </p>
        </div>

        <div className="info-card">
          <div className="card-icon">⚡</div>
          <h3>FastAPI Backend</h3>
          <p>
            Fast and modern REST APIs connect prediction
            models with the frontend.
          </p>
        </div>

        <div className="info-card">
          <div className="card-icon">⚛️</div>
          <h3>React Frontend</h3>
          <p>
            An interactive interface designed for accessible
            agricultural intelligence.
          </p>
        </div>
      </div>
    </section>
  );
}

export default Technology;