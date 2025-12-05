import React, { useEffect, useState } from "react";
import {
  getRecommendations,
  getTouristProfile,
  getTravelHistory,
  fetchPackages,
} from "../../api";
import { useNavigate } from "react-router-dom";
import "../../App.css"; // ← CSS IMPORT

export default function TouristDashboard() {
  const [touristId] = useState(localStorage.getItem("userId"));
  const [profile, setProfile] = useState(null);
  const [recommended, setRecommended] = useState([]);
  const [history, setHistory] = useState([]);
  const [allPackages, setAllPackages] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    loadProfile();
    loadRecommendations();
    loadHistory();
    loadAllPackages();
  }, []);

  async function loadProfile() {
    const data = await getTouristProfile(touristId);
    setProfile(data);
  }

  async function loadRecommendations() {
    const recs = await getRecommendations(touristId, 10, null);
    setRecommended(recs);
  }

  async function loadHistory() {
    const logs = await getTravelHistory(touristId);
    setHistory(logs);
  }

  async function loadAllPackages() {
    const pkgs = await fetchPackages();
    setAllPackages(pkgs);
  }

  function openPackage(id) {
    navigate(`/package/${id}`);
  }

  return (
    <div className="tourist-container">
      <h2 className="title">Welcome, Tourist</h2>

      {profile && (
        <div className="profile-box">
          <h3>Hello, {profile.name} 👋</h3>
          <br />
          <p>Email: {profile.email}</p>
        </div>
      )}

      <hr className="divider" />

      {/* ---- Quick Navigation Slider ---- */}
      <h3 className="section-title">Quick Navigation</h3>

      <div className="slider">
        <div className="slider-card pink" onClick={() => navigate("/recommendations")}>
          <h4>🔥 Recommendations</h4>
          <br />
          <p>{recommended.length} packages</p>
        </div>

        <div
          className="slider-card yellow"
          onClick={() => navigate("/packages")}
        >
          <h4>📦 All Packages</h4>
          <br />
          <p>{allPackages.length} Available</p>
        </div>

        <div className="slider-card blue" onClick={() => navigate("/history")}>
          <h4>📌 Travel History</h4>
          <br />
          <p>{history.length} Trips</p>
        </div>

        <div className="slider-card green" onClick={() => navigate("/profile")}>
          <h4>👤 Profile</h4>
          <br />
          <p>View Details</p>
        </div>
      </div>

      <hr className="divider" />

      {/* ---- Recommendations Preview ---- */}
      <h3 className="section-title">🔥 Your Top Recommendations</h3>

      <br />

      {recommended.length === 0 ? (
        <div>No recommendations available.</div>
      ) : (
        <ul className="package-list">
          {recommended.slice(0, 3).map((p) => (
            <li key={p.id} className="package-item">
              <b>{p.title}</b> — ₹{p.price}
              <button className="view-btn" onClick={() => openPackage(p.id)}>
                View
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
