import { useState } from "react";

import Navbar from "./components/Navbar/Navbar";
import Landing from "./components/Landing/Landing";
import SoilPredictor from "./components/Soil/SoilPredictor";
import SoilResults from "./components/Soil/SoilResults";
import SoilDetails from "./components/Soil/SoilDetails";
import CropOptions from "./components/Crop/CropOptions";
import CropPredictor from "./components/Crop/CropPredictor";
import CropResults from "./components/Crop/CropResults";
import CropDetails from "./components/Crop/CropDetails";

function App() {
  const [started, setStarted] = useState(false);
  const [soilResults, setSoilResults] =
    useState(null);
  const [selectedSoil, setSelectedSoil] =
    useState(null);
  const [cropMode, setCropMode] =
    useState(null);
  const [cropResults, setCropResults] =
    useState(null);
  const [selectedCrop, setSelectedCrop] =
    useState(null);
  return (
    <>
      <Navbar started={started} setStarted={setStarted} setSoilResults={setSoilResults} setSelectedSoil={setSelectedSoil} setCropMode={setCropMode} setCropResults={setCropResults} setSelectedCrop={setSelectedCrop}/>
      {!started ? (
        <Landing onStart={() => setStarted(true)}/>
      ) : (
        <main className="app">
          {!soilResults && (
            <SoilPredictor
              onPredict={setSoilResults}
            />
          )}

          {soilResults && !selectedSoil && (
            <SoilResults
              results={
                soilResults.soilTypes || []
              }
              soilQualityScore={
                soilResults.soilQualityScore
              }
              onSelect={setSelectedSoil}
            />
          )}
          {selectedSoil && (
            <>
              <SoilDetails
                soil={selectedSoil}
              />
              {!cropMode && (
                <CropOptions
                  onSelect={setCropMode}
                />
              )}
              {cropMode && !cropResults && (
                <CropPredictor
                  mode={cropMode}
                  soilType={selectedSoil.name}
                  onPredict={setCropResults}
                />
              )}

              {cropResults && !selectedCrop && (
                <CropResults
                  results={cropResults}
                  onSelect={setSelectedCrop}
                />
              )}

              {selectedCrop && (
                <CropDetails crop={selectedCrop}/>
              )}
            </>
          )}
        </main>
      )}
    </>
  );
}

export default App;