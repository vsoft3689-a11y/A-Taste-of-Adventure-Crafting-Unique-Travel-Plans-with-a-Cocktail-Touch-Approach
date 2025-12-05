import React, { useEffect, useState } from "react";
import { adminCreatePackage, fetchLandscapes } from "../../api";
import "../../App.css";

export default function AddPackage() {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [duration, setDuration] = useState("");
  const [desc, setDesc] = useState("");
  const [season, setSeason] = useState("");
  const [maxPeople, setMaxPeople] = useState("");
  const [minPeople, setMinPeople] = useState("");
  const [availableFrom, setAvailableFrom] = useState("");
  const [availableTo, setAvailableTo] = useState("");
  const [packageType, setPackageType] = useState("");
  const [inclusions, setInclusions] = useState("");
  const [exclusions, setExclusions] = useState("");

  const [landscapes, setLandscapes] = useState([]);
  const [selectedLandscapes, setSelectedLandscapes] = useState([]);

  useEffect(() => {
    load();
  }, []);

  async function load() {
    setLandscapes(await fetchLandscapes());
  }

  function toggleLandscape(id) {
    if (selectedLandscapes.includes(id))
      setSelectedLandscapes(selectedLandscapes.filter((l) => l !== id));
    else setSelectedLandscapes([...selectedLandscapes, id]);
  }

  async function createPkg() {
    const pkg = {
      title,
      description: desc,
      price: Number(price),
      durationDays: Number(duration),
      season,
      active: true,
      landscapeIds: selectedLandscapes,
      maxPeople: Number(maxPeople),
      minPeople: Number(minPeople),
      availableFrom,
      availableTo,
      packageType,
      inclusions,
      exclusions
    };

    await adminCreatePackage(pkg);

    // reset
    setTitle("");
    setPrice("");
    setDuration("");
    setDesc("");
    setSeason("");
    setMinPeople("");
    setMaxPeople("");
    setAvailableFrom("");
    setAvailableTo("");
    setPackageType("");
    setInclusions("");
    setExclusions("");
    setSelectedLandscapes([]);

    alert("Package Created Successfully!");
  }

  return (
    <div className="pkg-container">
      <div className="pkg-card">
        <h2>Add New Travel Package</h2>

        <input
          className="input-box"
          placeholder="Package Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          className="input-box"
          placeholder="Price (₹)"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />

        <input
          className="input-box"
          placeholder="Duration (Days)"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
        />

        <textarea
          className="textarea-box"
          placeholder="Description"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        />

        <select
          className="select-box"
          value={season}
          onChange={(e) => setSeason(e.target.value)}
        >
          <option value="">Select Season</option>
          <option value="Summer">Summer</option>
          <option value="Winter">Winter</option>
          <option value="Monsoon">Monsoon</option>
        </select>

        <select
          className="select-box"
          value={packageType}
          onChange={(e) => setPackageType(e.target.value)}
        >
          <option value="">Select Package Type</option>
          <option value="Family">Family</option>
          <option value="Honeymoon">Honeymoon</option>
          <option value="Solo">Solo</option>
          <option value="Group">Group</option>
        </select>

        <input
          type="number"
          className="input-box"
          placeholder="Minimum People"
          value={minPeople}
          onChange={(e) => setMinPeople(e.target.value)}
        />

        <input
          type="number"
          className="input-box"
          placeholder="Maximum People"
          value={maxPeople}
          onChange={(e) => setMaxPeople(e.target.value)}
        />

        <label className="date-label">Available From:</label>
        <input
          type="date"
          className="input-box"
          value={availableFrom}
          onChange={(e) => setAvailableFrom(e.target.value)}
        />

        <label className="date-label">Available To:</label>
        <input
          type="date"
          className="input-box"
          value={availableTo}
          onChange={(e) => setAvailableTo(e.target.value)}
        />

        <textarea
          className="textarea-box"
          placeholder="Inclusions (Hotel, Food, Guide...)"
          value={inclusions}
          onChange={(e) => setInclusions(e.target.value)}
        />

        <textarea
          className="textarea-box"
          placeholder="Exclusions (Terms, Safety...)"
          value={exclusions}
          onChange={(e) => setExclusions(e.target.value)}
        />

        <h3>Choose Landscapes</h3>
        <div className="landscape-list">
          {landscapes.map((l) => (
            <label className="landscape-item" key={l.id}>
              <input
                type="checkbox"
                checked={selectedLandscapes.includes(l.id)}
                onChange={() => toggleLandscape(l.id)}
              />
              {" "}{l.name} ({l.city})
            </label>
          ))}
        </div>

        <button className="submit-btn" onClick={createPkg}>
          Create Package
        </button>
      </div>
    </div>
  );
}
