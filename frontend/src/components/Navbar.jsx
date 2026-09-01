function Navbar({ darkMode, setDarkMode }) {
  return (
    <nav className="navbar">
      <div className="logo">🌱 AgriSense AI</div>

      <div className="nav-links">
        <a href="#about">About</a>
        <a href="#technology">Technology</a>
        <a href="#predictor">Predictor</a>
        <a href="#team">Team</a>
      </div>

      <button
        className="theme-button"
        onClick={() => setDarkMode(!darkMode)}
      >
        {darkMode ? "☀️" : "🌙"}
      </button>
    </nav>
  );
}

export default Navbar;