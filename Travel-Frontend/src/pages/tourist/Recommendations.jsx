import React, { useState, useEffect } from "react";
import { getRecommendations, fetchPackage } from "../../api";
import { useNavigate } from "react-router-dom";

export default function Recommendations() {
  const touristId = localStorage.getItem("userId");

  const [season, setSeason] = useState(""); // string season filter
  const [recList, setRecList] = useState([]);
  const [selected, setSelected] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    loadRecommendations();
  }, []);

  async function loadRecommendations() {
    try {
      const recs = await getRecommendations(touristId);
      setRecList(recs);
    } catch (err) {
      console.error("Failed to load recommendations", err);
    }
  }

  console.log(recList);

  // async function showDetails(id) {
  //   const p = await fetchPackage(id);
  //   setSelected(p);
  // }
  return (
    <div className="rec-container">
      <h2 className="rec-title">Recommended Travel Packages</h2>

      {/* Filters */}
      <div className="rec-filter-box">
        {/* <label>
          <b>Season Filter: </b>
        </label>
        <select
          value={season}
          onChange={(e) => setSeason(e.target.value)}
          className="rec-select"
        >
          <option value="">All Seasons</option>
          <option value="summer">Summer</option>
          <option value="winter">Winter</option>
        </select> */}
          {/* <option value="rainy">Rainy</option>
          <option value="autumn">Autumn</option> */}

        {/* <button onClick={loadRecommendations} className="rec-btn-load">
          Refresh
        </button> */}
      </div>

      <div className="rec-layout">
        {/* LEFT — LIST */}
        {/* <div className="rec-left"> */}
        <h3>Recommended Packages</h3>
        <br />
        {recList.length === 0 && (
          <div className="rec-empty">No recommendations yet.</div>
        )}

        <ul className="rec-list">
          {recList.map((p) => (
            <li key={p.id} className="rec-item">
              <div>
                <b>{p.title}</b>
                <div className="rec-meta">
                  ₹{p.price} • {p.durationDays} days
                </div>
              </div>

              <button
                className="rec-details-btn"
                onClick={() => navigate("/package/" + p.id)}
              >
                View Details
              </button>
            </li>
          ))}
        </ul>
        {/* </div> */}

        {/* RIGHT — DETAILS */}
        {/* <div className="rec-right">
          <h3>Package Details</h3>

          {selected ? (
            <div className="rec-details-box">
              <h4>{selected.title}</h4>
              <p>{selected.description}</p>

              <p><b>Price:</b> ₹{selected.price}</p>
              <p><b>Duration:</b> {selected.durationDays} days</p>

              <p><b>Season:</b> {selected.season || "N/A"}</p>
              <p><b>Area:</b> {selected.area || "N/A"}</p>
            </div>
          ) : (
            <div className="rec-empty">Select a package to see details</div>
          )}
        </div> */}
      </div>
    </div>
  );
}
