function Landing({ onStart }) {
  return (
    <>
      <style>{`
        * {
          box-sizing: border-box;
        }

        body {
          margin: 0;
          font-family: "Inter", "Segoe UI", sans-serif;
          background: #f4efe6;
        }

        .landing {
          min-height: 100vh;
          position: relative;
          overflow: hidden;

          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;

          background:
            radial-gradient(circle at 50% 50%, rgba(119, 93, 65, 0.18), transparent 35%),
            linear-gradient(135deg, #e9dfd0, #f8f4ec, #d8c8b4);
        }

        .landing::before {
          content: "";
          position: absolute;
          width: 700px;
          height: 700px;
          border-radius: 50%;
          border: 1px solid rgba(93, 70, 47, 0.15);
          animation: rotate 20s linear infinite;
        }

        .brand {
          position: absolute;
          top: 35px;
          left: 50px;

          font-size: 1.4rem;
          font-weight: 700;
          color: #3e3025;
          letter-spacing: -0.5px;
        }

        .landing-content {
          position: relative;
          z-index: 2;
          text-align: center;
        }

        .landing-content h1 {
          font-size: clamp(3rem, 8vw, 7rem);
          margin: 0;
          color: #3d3025;
          letter-spacing: -4px;
        }

        .landing-content p {
          color: #756554;
          font-size: 1.1rem;
          margin: 20px 0 45px;
        }

        .start-btn {
          border: none;
          padding: 20px 42px;
          border-radius: 100px;

          background: #49382b;
          color: #fffaf2;

          font-size: 0.95rem;
          font-weight: 700;
          letter-spacing: 2px;

          cursor: pointer;

          transition: all 0.5s ease;
          box-shadow: 0 20px 50px rgba(65, 47, 33, 0.25);
        }

        .start-btn:hover {
          transform: scale(1.08);
          background: #66503d;
          box-shadow: 0 30px 70px rgba(65, 47, 33, 0.35);
        }

        @keyframes rotate {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        @media (max-width: 600px) {
          .brand {
            left: 25px;
            top: 25px;
          }

          .landing-content h1 {
            letter-spacing: -2px;
          }
        }
      `}</style>

      <section className="landing">
        <div className="brand">🌱 AgriSense AI</div>

        <div className="landing-content">
          <h1>Understand Your Soil.</h1>

          <p>
            AI-powered soil intelligence and crop recommendations.
          </p>

          <button className="start-btn" onClick={onStart}>
            START PREDICTING →
          </button>
        </div>
      </section>
    </>
  );
}

export default Landing;