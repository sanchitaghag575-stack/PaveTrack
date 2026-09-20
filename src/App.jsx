import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import TrackComplaint from "./pages/TrackComplaint";
import ReportPothole from "./pages/ReportPothole";
import "./App.css";

function Home() {
  return (
    <div className="app">

      {/* HEADER */}
      <header className="header">

        <button className="menu-btn" aria-label="Menu">
          <span></span>
          <span></span>
          <span></span>
        </button>

        <div className="logo">
          <img
            src="/src/assets/pavetrack-icon.png"
            alt="PaveTrack"
            className="logo-icon"
          />

          <div className="logo-text">
            <div>
              <span className="pave">Pave</span>
              <span className="track">Track</span>
            </div>

            <small>
              REPORT • VERIFY • REPAIR • BETTER ROADS
            </small>
          </div>
        </div>

        <button className="profile-btn" aria-label="Profile">
          👤
        </button>

      </header>


      {/* HERO SECTION */}
      <main>

        <section className="hero">

          <div className="hero-overlay"></div>

          <div className="hero-content">

            <div className="big-logo">

              <img
                src="/src/assets/pavetrack-icon.png"
                alt="PaveTrack"
                className="big-logo-icon"
              />

              <div>

                <div className="big-logo-text">
                  <span className="pave">Pave</span>
                  <span className="track">Track</span>
                </div>
                <br></br>
                <div className="tagline-small">
                  REPORT • VERIFY • REPAIR • BETTER ROADS
                </div>

              </div>

            </div>


            <h2>
              "Don't wait for anyone to report potholes."
              <br />
              Detect the potholes nobody reported.
            </h2>


            <div className="hero-buttons">

              <Link to="/track" className="track-btn">
                <span className="button-icon">⌕</span>
                <span>Track Complaint</span>
              </Link>

              <Link to="/report" className="report-btn">
                <span className="button-icon">✎</span>
                <span>Report a Pothole</span>
              </Link>

            </div>

          </div>

        </section>


        {/* FEATURES */}
        <section className="features">

          <div className="feature">
            <div className="feature-icon">🛣️</div>

            <div>
              <h3>Safe</h3>
              <p>Roads</p>
            </div>
          </div>


          <div className="feature">
            <div className="feature-icon">🔍</div>

            <div>
              <h3>Transparent</h3>
              <p>Process</p>
            </div>
          </div>


          <div className="feature">
            <div className="feature-icon">✓</div>

            <div>
              <h3>Accountability</h3>
            </div>
          </div>


          <div className="feature">
            <div className="feature-icon">🏙️</div>

            <div>
              <h3>Smart</h3>
              <p>Cities</p>
            </div>
          </div>

        </section>

      </main>

    </div>
  );
}


function App() {
  return (
    <BrowserRouter>

      <Routes>

        {/* HOME PAGE */}
        <Route path="/" element={<Home />} />

        {/* TRACK COMPLAINT PAGE */}
        <Route
          path="/track"
          element={<TrackComplaint />}
        />

        {/* REPORT POTHOLE PAGE */}
        <Route
          path="/report"
          element={<ReportPothole />}
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;