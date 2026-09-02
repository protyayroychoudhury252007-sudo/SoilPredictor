function Navbar({
  started,
  setStarted,
  setSoilResults,
  setSelectedSoil,
  setCropMode,
  setCropResults,
  setSelectedCrop,
}) {

  const goToSoilPrediction = () => {
    setStarted(true);

    setSoilResults(null);
    setSelectedSoil(null);

    setCropMode(null);
    setCropResults(null);
    setSelectedCrop(null);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };


  const goToCropPrediction = () => {
    setStarted(true);

    // Keep soil selection if available
    setCropResults(null);
    setSelectedCrop(null);

    if (!setSelectedSoil) return;

    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: "smooth",
    });
  };


  const goHome = () => {
    setStarted(false);

    setSoilResults(null);
    setSelectedSoil(null);

    setCropMode(null);
    setCropResults(null);
    setSelectedCrop(null);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };


  return (
    <>
      <style>{`

        .mini-navbar {
          position: fixed;

          top: 22px;
          left: 50%;

          transform: translateX(-50%);

          z-index: 1000;

          display: flex;
          align-items: center;

          gap: 8px;

          padding: 8px;

          background:
            rgba(255, 250, 242, 0.82);

          backdrop-filter:
            blur(18px);

          -webkit-backdrop-filter:
            blur(18px);

          border:
            1px solid rgba(120, 100, 80, 0.18);

          border-radius: 18px;

          box-shadow:
            0 12px 40px
            rgba(55, 40, 25, 0.12);
        }


        .nav-brand {
          padding: 10px 16px;

          font-weight: 800;

          color: #3f3025;

          letter-spacing: -0.5px;

          white-space: nowrap;

          border-right:
            1px solid #ded1bf;
        }


        .nav-btn {
          border: none;

          background: transparent;

          color: #6d5c4c;

          padding: 10px 14px;

          border-radius: 12px;

          cursor: pointer;

          font-size: 0.85rem;

          font-weight: 600;

          transition:
            background .3s,
            color .3s,
            transform .3s;
        }


        .nav-btn:hover {
          background: #e8dfd3;

          color: #3f3025;

          transform: translateY(-2px);
        }


        .nav-btn.active {
          background: #4b392b;

          color: white;

          box-shadow:
            0 6px 15px
            rgba(70, 50, 35, 0.2);
        }


        @media (max-width: 700px) {

          .mini-navbar {
            width: calc(100% - 30px);

            justify-content: center;

            top: 12px;

            gap: 3px;
          }


          .nav-brand {
            display: none;
          }


          .nav-btn {
            padding: 9px 10px;

            font-size: 0.75rem;
          }

        }

      `}</style>


      {started && (

        <nav className="mini-navbar">

          <div className="nav-brand">
            🌱 AgriSense AI
          </div>


          <button
            className="nav-btn"
            onClick={goHome}
          >
            Home
          </button>


          <button
            className="nav-btn"
            onClick={goToSoilPrediction}
          >
            Soil
          </button>


          <button
            className="nav-btn"
            onClick={goToCropPrediction}
          >
            Crops
          </button>

        </nav>

      )}

    </>
  );
}

export default Navbar;