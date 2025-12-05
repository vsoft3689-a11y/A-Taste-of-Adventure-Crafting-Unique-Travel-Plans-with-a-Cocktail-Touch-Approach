import React, { useEffect, useState } from "react";
import { deleteLandscape, fetchLandscapes } from "../../api";
import "../../App.css";
import { useNavigate } from "react-router-dom";

export default function ManageLandscapes() {
  const [landscapes, setLandscapes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    load();
  }, []);

  async function load() {
    setLandscapes(await fetchLandscapes());
  }

  async function remove(id) {
    await deleteLandscape(id);
    load();
  }

  function EditLse(id) {
    navigate(`/admin/edit-landscape/${id}`);
  }

  return (
    <div className="ml-container">
      <h2 className="ml-title">🏞 Manage Landscapes</h2>

      {landscapes.length === 0 ? (
        <p className="ml-no-data">No landscapes available.</p>
      ) : (
        <div className="ml-list">
          {landscapes.map((l) => (
            <div key={l.id} className="ml-card">
              {/* Image */}
              <img src={l.imageUrl} alt={l.name} className="ml-image" />

              {/* Content Section */}
              <div className="ml-content">
                <h3 className="ml-name">{l.name}</h3>
                <p className="ml-city">📍 {l.city}</p>
                <p className="ml-description">{l.description}</p>

                <div className="ml-info-grid">
                  <span>
                    <b>Season:</b> {l.season}
                  </span>
                  <span>
                    <b>Category:</b> {l.category}
                  </span>
                  <span>
                    <b>Rating:</b> {l.rating}
                  </span>
                  <span>
                    <b>Popularity:</b> {l.popularity}
                  </span>
                  <span>
                    <b>Latitude:</b> {l.latitude}
                  </span>
                  <span>
                    <b>Longitude:</b> {l.longitude}
                  </span>
                  <span>
                    <b>Avg Cost:</b> ₹{l.averageCost}
                  </span>
                  <span>
                    <b>Best Time:</b> {l.bestTimeToVisit}
                  </span>
                  <span>
                    <b>Precautions:</b> {l.precautions}
                  </span>
                  <span>
                    <b>Contact:</b> {l.contactInfo}
                  </span>
                  <span>
                    <b>Timings:</b> {l.Timings}
                  </span>
                  <span>
                    <b>Age Group:</b> {l.preferredAgeGroup}
                  </span>
                  <span>
                    <b>Gender Pref:</b> {l.preferredGender}
                  </span>
                  <span>
                    <b>Crowded:</b> {l.isCrowdedPlace ? "Yes" : "No"}
                  </span>
                </div>

                <div className="pkg-actions">
                  <button
                    className="edit-btn"
                    onClick={() => {
                      EditLse(l.id);
                    }}
                  >
                    ✏️ Edit
                  </button>
                  <button className="delete-btn" onClick={() => remove(l.id)}>
                    ❌ Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
