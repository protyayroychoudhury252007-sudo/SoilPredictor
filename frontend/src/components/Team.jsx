function Team() {
  return (
    <section className="section alternate-section" id="team">
      <h2 className="section-title">Team Behind AgriSense AI</h2>

      <p className="section-subtitle">
        Built as an AI-powered agricultural technology project
        focused on smarter and more accessible decision support.
      </p>

      <div className="card-grid">
        <div className="info-card">
          <div className="card-icon">👨‍💻</div>
          <h3>Development Team</h3>
          <p>
            Add your team member names, roles and responsibilities here.
          </p>
        </div>

        <div className="info-card">
          <div className="card-icon">🤖</div>
          <h3>AI & Machine Learning</h3>
          <p>
            Dataset preparation, model training and prediction systems.
          </p>
        </div>

        <div className="info-card">
          <div className="card-icon">🌱</div>
          <h3>Agriculture Research</h3>
          <p>
            Focused on soil parameters, crop suitability and
            real-world applications.
          </p>
        </div>
      </div>
    </section>
  );
}

export default Team;