import React, { useEffect, useState } from "react";
import { fetchPackages, deletePackage } from "../../api";
import { useNavigate } from "react-router-dom";
import "../../App.css";

export default function ManagePackages() {
  const [packages, setPackages] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    load();
  }, []);

  async function load() {
    setPackages(await fetchPackages());
  }

  async function remove(id) {
    if (window.confirm("Are you sure you want to delete this package?")) {
      await deletePackage(id);
      load();
    }
  }

  function editPkg(id) {
    navigate(`/admin/edit-package/${id}`);
  }

  return (
    <div className="manage-container">
      <h2 className="page-title">📦 Manage Travel Packages</h2>

      <div className="package-grid">
        {packages.length === 0 && (
          <p className="empty-text">No packages available.</p>
        )}

        {packages.map((p) => (
          <div className="package-card" key={p.id}>
            <h3 className="pkg-title">{p.title}</h3>

            <p className="pkg-info"><b>Description:</b> {p.description}</p>
            <p className="pkg-info"><b>Season:</b> {p.season}</p>
            <p className="pkg-info"><b>Type:</b> {p.packageType}</p>
            <p className="pkg-info">
              <b>Landscapes:</b>{" "}
              {p.landscapes && p.landscapes.length > 0
                ? p.landscapes.map((l) => l.name).join(", ")
                : "None"}
            </p>
            <p className="pkg-info"><b>Price:</b> ₹{p.price}</p>
            <p className="pkg-info"><b>Duration:</b> {p.durationDays} days</p>
            <p className="pkg-info"><b>People:</b> {p.minPeople} – {p.maxPeople}</p>
            {p.availableFrom && p.availableTo && (
              <p className="pkg-info">
                <b>Available:</b>{" "}
                {new Date(p.availableFrom).toLocaleDateString()} —{" "}
                {new Date(p.availableTo).toLocaleDateString()}
              </p>
            )}
            <p className="pkg-info"><b>Inclusions:</b> {p.inclusions}</p>
            <p className="pkg-info"><b>Exclusions:</b> {p.exclusions}</p>

            <div className="pkg-actions">
              <button className="edit-btn" onClick={() => editPkg(p.id)}>
                ✏️ Edit
              </button>
              <button className="delete-btn" onClick={() => remove(p.id)}>
                🗑 Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
