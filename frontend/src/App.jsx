import { useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Technology from "./components/Technology";
import PredictorEngine from "./components/Predictor/PredictorEngine";
import Advantages from "./components/Advantages";
import Team from "./components/Team";
import Footer from "./components/Footer";

function App() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className={darkMode ? "app dark" : "app"}>
      <Navbar
        darkMode={darkMode}
        setDarkMode={setDarkMode}
      />

      <Hero />
      <About />
      <Technology />
      <PredictorEngine />
      <Advantages />
      <Team />
      <Footer />
    </div>
  );
}

export default App;