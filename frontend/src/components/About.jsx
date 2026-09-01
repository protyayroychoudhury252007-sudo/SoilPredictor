function About() {
  return (
    <section className="section" id="about">
      <h2 className="section-title">What is AgriSense AI?</h2>

      <p className="section-subtitle">
        An intelligent agricultural decision-support system that
        uses machine learning to analyze soil conditions,
        determine soil quality and recommend suitable crops.
      </p>

      <div className="card-grid">
        <div className="info-card">
          <div className="card-icon">🧪</div>
          <h3>Soil Intelligence</h3>
          <p>
            Analyze soil nutrients, pH and environmental
            conditions using machine learning.
          </p>
        </div>

        <div className="info-card">
          <div className="card-icon">📊</div>
          <h3>Quality Analysis</h3>
          <p>
            Receive an estimated soil health percentage and
            quality classification.
          </p>
        </div>

        <div className="info-card">
          <div className="card-icon">🌾</div>
          <h3>Crop Recommendation</h3>
          <p>
            Discover suitable crops based on soil properties
            and environmental conditions.
          </p>
        </div>
      </div>
    </section>
  );
}

export default About;