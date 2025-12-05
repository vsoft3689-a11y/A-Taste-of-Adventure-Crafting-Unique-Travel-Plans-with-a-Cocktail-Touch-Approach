import React, { useState } from "react";
import { addLandscape } from "../../api";
import "../../App.css";

export default function AddLandscape() {
  const [form, setForm] = useState({
    name: "",
    city: "",
    description: "",
    imageUrl: "",
    season: "",
    category: "",
    rating: "",
    popularity: "",
    latitude: "",
    longitude: "",
    averageCost: "",
    bestTimeToVisit: "",
    precautions: "",
    contactInfo: "",
    timings: "",
    preferredAgeGroup: "",
    preferredGender: "Any",
    isCrowdedPlace: false,
  });

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  }

  async function create() {
    await addLandscape(form);

    alert("Landscape added successfully!");

    setForm({
      name: "",
      city: "",
      description: "",
      imageUrl: "",
      season: "",
      category: "",
      rating: "",
      popularity: "",
      latitude: "",
      longitude: "",
      averageCost: "",
      bestTimeToVisit: "",
      precautions: "",
      contactInfo: "",
      timings: "",
      preferredAgeGroup: "",
      preferredGender: "",
      isCrowdedPlace: false,
    });
  }

  return (
    <div className="form-container">
      <h2 className="form-title">🏞 Add New Landscape</h2>

      <div className="form-card">
        {/* ------------ BASIC FIELDS --------------- */}
        <label>Landscape Name</label>
        <input className="input-box" name="name" value={form.name} onChange={handleChange} />

        <label>City</label>
        <input className="input-box" name="city" value={form.city} onChange={handleChange} />

        <label>Description</label>
        <textarea className="text-area" name="description" value={form.description} onChange={handleChange} />

        <label>Image URL</label>
        <input className="input-box" name="imageUrl" value={form.imageUrl} onChange={handleChange} />

        {/* ------------ DROPDOWNS --------------- */}
        <label>Season</label>
        <select className="input-box" name="season" value={form.season} onChange={handleChange}>
          <option value="">Select Season</option>
          <option>Summer</option>
          <option>Winter</option>
          <option>Monsoon</option>
        </select>

        <label>Category</label>
        <select className="input-box" name="category" value={form.category} onChange={handleChange}>
          <option value="">Select Category</option>
          <option>Beach</option>
          <option>Temple</option>
          <option>Waterfall</option>
          <option>Adventure</option>
          <option>Hill Station</option>
          <option>Wildlife</option>
        </select>

        {/* ------------ NUMBERS --------------- */}
        <label>Rating (1–5)</label>
        <input className="input-box" type="number" name="rating" min="1" max="5" value={form.rating} onChange={handleChange} />

        <label>Popularity (No. of Visits)</label>
        <input className="input-box" type="number" name="popularity" value={form.popularity} onChange={handleChange} />

        <label>Latitude</label>
        <input className="input-box" type="number" name="latitude" value={form.latitude} onChange={handleChange} />

        <label>Longitude</label>
        <input className="input-box" type="number" name="longitude" value={form.longitude} onChange={handleChange} />

        <label>Average Cost</label>
        <input className="input-box" type="number" name="averageCost" value={form.averageCost} onChange={handleChange} />

        {/* ------------ STRINGS --------------- */}
        <label>Best Time to Visit</label>
        <input className="input-box" name="bestTimeToVisit" value={form.bestTimeToVisit} onChange={handleChange} />

        <label>Precautions</label>
        <textarea className="text-area" name="precautions" value={form.precautions} onChange={handleChange} />

        <label>Contact Info</label>
        <input className="input-box" name="contactInfo" value={form.contactInfo} onChange={handleChange} />

        <label>Timings</label>
        <input className="input-box" name="timings" value={form.timings} onChange={handleChange} />

        <label>Preferred Age Group</label>
        <select className="input-box" name="preferredAgeGroup" value={form.preferredAgeGroup} onChange={handleChange}>
          <option value="">Select Age Group</option>
          <option>Kids</option>
          <option>Adults</option>
          <option>Seniors</option>
        </select>

        <label>Preferred Gender</label>
        <select className="input-box" name="preferredGender" value={form.preferredGender} onChange={handleChange}>
          <option value="">Any</option>
          <option>Male</option>
          <option>Female</option>
        </select>

        {/* ------------ CHECKBOX --------------- */}
        <label style={{ marginTop: "10px" }}>
          <input type="checkbox" name="isCrowdedPlace" checked={form.isCrowdedPlace} onChange={handleChange} /> Crowded Place
        </label>

        <button className="primary-btn" onClick={create}>
          ➕ Add Landscape
        </button>
      </div>
    </div>
  );
}
