function CropDetails({ crop }) {
  const sections = [
    ["What is it?",`${crop.name} is an important agricultural crop with significant economic and nutritional value.`],
    ["Ideal Climate","Climate conditions influence crop growth, flowering and final yield."],
    ["Suitable Soil","Well-managed fertile soil with appropriate drainage and nutrients is essential."],
    ["Temperature","Optimal temperature varies depending on the crop growth stage."],
    ["Water Requirements", "Proper irrigation management helps maintain healthy growth."],
    ["Growing Season", "Season selection depends on regional climate and environmental conditions."],
    ["Nutrient Requirements", "Balanced Nitrogen, Phosphorus and Potassium improve productivity."],
    ["Major Uses", "The crop may be used for food, industry, livestock or commercial production."],
  ];

  return (
    <>
      <style>{`
        .crop-details {
          min-height: 100vh;
          padding: 120px 20px;
          background:radial-gradient(circle at top left, #9aa98b, transparent 35%),#283026;
          color: #f6f1e8;
          animation: cropExpand 1s cubic-bezier(.2,.8,.2,1);
        }
        .crop-details-container {
          max-width: 1100px;
          margin: auto;
        }
        .crop-details-container h1 {
          font-size: clamp(4rem, 9vw, 8rem);
          margin: 0;
        }
        .crop-grid {
          margin-top: 70px;
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
        }
        .crop-detail-card {
          padding: 28px;
          border-radius: 20px;
          background: rgba(255,255,255,.07);
          border: 1px solid rgba(255,255,255,.1);
          transition: .4s;
        }
        .crop-detail-card:hover {
          transform: translateY(-8px);
          background: rgba(255,255,255,.12);
        }
        .crop-detail-card h3 {
          color: #c6d6b8;
        }
        @keyframes cropExpand {
          from {
            opacity: 0;
            transform: scale(.7);
            border-radius: 50%;
        }to {
            opacity: 1;
            transform: scale(1);
            border-radius: 0;
          }
        }
        @media(max-width: 800px) {
          .crop-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
      <section className="crop-details">
        <div className="crop-details-container">
          <p>AI RECOMMENDED CROP</p>
          <h1>{crop.name.toUpperCase()}</h1>
          <div className="crop-grid">
            {sections.map(([title, text]) => (
              <div className="crop-detail-card" key={title}>
                <h3>{title}</h3>
                <p>{text}</p>
              </div>
            ))}
          </div>

        </div>
      </section>
    </>
  );
}

export default CropDetails;