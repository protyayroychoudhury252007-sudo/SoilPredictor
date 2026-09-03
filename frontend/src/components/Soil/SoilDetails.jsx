function SoilDetails({ soil }) {
  return (
    <>
      <style>{`
        .soil-details {
          min-height: 100vh;
          padding: 120px 20px;
          background:radial-gradient(circle at top right, #d8c6ae, transparent 40%), #403126;
          color: #f7f1e8;
          animation: expandPage 1s cubic-bezier(.2,.8,.2,1);
        }
        .details-container {
          max-width: 1100px;
          margin: auto;
        }
        .soil-details h1 {
          font-size: clamp(3rem, 7vw, 7rem);
          margin-bottom: 20px;
        }
        .intro {
          max-width: 700px;
          font-size: 1.2rem;
          line-height: 1.8;
          color: #dfd2c2;
        }
        .info-grid {
          margin-top: 70px;
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
        }
        .info-card {
          background: rgba(255,255,255,.08);
          backdrop-filter: blur(15px);
          padding: 28px;
          border-radius: 20px;
          border: 1px solid rgba(255,255,255,.1);
          transition: .4s;
        }
        .info-card:hover {
          transform: translateY(-8px);
          background: rgba(255,255,255,.12);
        }
        .info-card h3 {
          color: #c9d6b8;
        }
        @keyframes expandPage {
          from {
            transform: scale(.75);
            opacity: 0;
            border-radius: 50%;
          }
          to {
            transform: scale(1);
            opacity: 1;
            border-radius: 0;
          }
        }
        @media(max-width: 800px) {
          .info-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      <section className="soil-details">
        <div className="details-container">
          <h1>{soil.name.toUpperCase()}</h1>
          <p className="intro">
            Explore the physical characteristics, fertility,
            agricultural advantages and suitability of this soil type.
          </p>
          <div className="info-grid">
            <Info title="What is it?" text={`${soil.name} is a soil classification with unique physical and chemical properties that influence agricultural productivity.`}/>
            <Info title="Texture" text="The texture determines how easily water, air and nutrients move through the soil."/>
            <Info title="Water Retention" text="Water retention capacity varies depending on particle composition and soil structure."/>
            <Info title="Nutrient Properties" text="The soil stores and supplies essential nutrients required for healthy crop growth."/>
            <Info title="Advantages" text="Proper management can make this soil highly productive for suitable crops."/>
            <Info title="Agricultural Suitability" text="Suitable crops depend on climate, nutrients, irrigation and farming practices."/>
          </div>
        </div>
      </section>
    </>
  );
}

function Info({ title, text }) {
  return (
    <div className="info-card">
      <h3>{title}</h3>
      <p>{text}</p>
    </div>
  );
}

export default SoilDetails;