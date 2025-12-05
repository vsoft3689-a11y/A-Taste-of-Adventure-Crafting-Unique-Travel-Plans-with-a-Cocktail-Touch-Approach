import React, { useEffect, useState } from "react";
import { fetchPackages } from "../../api";
import { useNavigate } from "react-router-dom";

export default function TouristPackages() {
  const [packages, setPackages] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    loadPackages();
  }, []);

  async function loadPackages() {
    try {
      const data = await fetchPackages();
      setPackages(data);
    } catch (e) {
      console.error("Failed to fetch packages", e);
    }
  }
console.log(packages)
  return (
    <div style={{ padding: "40px", maxWidth: "900px", margin: "0 auto" }}>
      <h2 style={{ marginBottom: 20 }}>All Travel Packages</h2>
<hr />
<br />
      {/* CARD GRID */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
          gap: "20px",
        }}
      >
        {packages.map((pkg) => (
          <div
            key={pkg.id}
            style={{
              border: "1px solid #ddd",
              padding: "15px",
              borderRadius: "8px",
              background: "#fff",
              boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
            }}
          >
            <h3 style={{ marginBottom: 10,fontSize: 25 }}>{pkg.title}</h3>

            <p style={{ margin: "5px 0" }}>
              <b>Description:</b> {pkg.description}
            </p>
            <p style={{ margin: "5px 0" }}>
              <b>Season:</b> {pkg.season} Pack
            </p>
            <p style={{ margin: "5px 0" }}>
              <b>Type:</b> {pkg.packageType} Package
            </p>
            <p style={{ margin: "5px 0" }}>
              <b>Price:</b> ₹{pkg.price}
            </p>
            <p style={{ margin: "5px 0" }}>
              <b>Duration:</b> {pkg.durationDays} days
            </p>

            <button
              onClick={() => navigate(`/package/${pkg.id}`)}
              style={{
                marginTop: 10,
                width: "100%",
                padding: "10px",
                background: "#2196F3",
                color: "white",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              View Details
            </button>
          </div>
        ))}
      </div>

      {packages.length === 0 && (
        <div style={{ marginTop: 20 }}>No packages available</div>
      )}
    </div>
  );
}
