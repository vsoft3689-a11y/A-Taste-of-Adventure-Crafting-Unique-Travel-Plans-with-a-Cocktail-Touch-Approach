import React from "react";
import { Link } from "react-router-dom";
import "../App.css";

export default function LandingPage() {
  return (
    <div className="landing-container">
      {/* NAVBAR */}
      {/* <nav className="nav">
        <div className="logo">Travel<span>Mate</span></div>
        <div className="nav-links">
          <a href="#features">Features</a>
          <a href="#how">How It Works</a>
          <Link to="/login" className="btn-login">Login</Link>
          <Link to="/register" className="btn-register">Register</Link>
        </div>
      </nav> */}

      {/* HERO SECTION */}
      <section className="hero">
        <div className="hero-content">
          <h1>Discover Your Perfect Travel Package</h1>
          <p>
            interests, budget, and
            preferred landscapes.
          </p>

          <Link to="/register" className="hero-btn">
            Get Started
          </Link>
        </div>

        <img
          className="hero-img"
          src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e"
          alt="Travel"
        />
      </section>

      {/* FEATURES SECTION */}
      <section id="features" className="features">
        <h2>Why Choose Us?</h2>
        <div className="feature-grid">
          <div className="feature-card">
            <h3>🌍 Personalized Packages</h3>
            <br />
            <p>
              Get travel packages preferences.
            </p>
          </div>

          <div className="feature-card">
            <h3>🗺 Landscape-Based</h3>
            <br />
            <p>Choose packages based on landscapes you love.</p>
          </div>

          {/* <div className="feature-card">
            <h3>📊 Smart AI Recommendations</h3>
            <p>Our system learns from your past trips and choices.</p>
          </div> */}

          <div className="feature-card">
            <h3>🏞 Explore Destinations</h3>
            <br />
            <p>View detailed landscapes, photos.</p>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how" className="how">
        <h2>How It Works?</h2>
        <div className="how-steps">
          <div className="step">
            <div className="step-num">1</div>
            <p>Create an account and set your preferences.</p>
          </div>

          <div className="step">
            <div className="step-num">2</div>
            <p>Explore travels.</p>
          </div>

          <div className="step">
            <div className="step-num">3</div>
            <p>Choose your perfect package and start your journey!</p>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer>
        <p>© {new Date().getFullYear()} TravelX. All Rights Reserved.</p>
      </footer>
    </div>
  );
}
