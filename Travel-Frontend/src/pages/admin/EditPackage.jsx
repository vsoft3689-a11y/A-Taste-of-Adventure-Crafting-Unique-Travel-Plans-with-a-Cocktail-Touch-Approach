import React, { useEffect, useState } from "react";
import {
  fetchPackage,
  fetchLandscapes,
  adminUpdatePackage,
} from "../../api";
import { useParams, useNavigate } from "react-router-dom";
import "../../App.css";

export default function EditPackage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);

  const [landscapes, setLandscapes] = useState([]);

  // PACKAGE FIELDS
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [price, setPrice] = useState("");
  const [duration, setDuration] = useState("");
  const [season, setSeason] = useState("");
  const [minPeople, setMinPeople] = useState("");
  const [maxPeople, setMaxPeople] = useState("");
  const [availableFrom, setAvailableFrom] = useState("");
  const [availableTo, setAvailableTo] = useState("");
  const [packageType, setPackageType] = useState("");
  const [inclusions, setInclusions] = useState("");
  const [exclusions, setExclusions] = useState("");
  const [selectedLandscapes, setSelectedLandscapes] = useState([]);

  useEffect(() => {
    load();
  }, []);

  async function load() {
    const pkg = await fetchPackage(id);
    const land = await fetchLandscapes();

    setLandscapes(land);

    // Set Values
    setTitle(pkg.title);
    setDesc(pkg.description);
    setPrice(pkg.price);
    setDuration(pkg.durationDays);
    setSeason(pkg.season);
    setMinPeople(pkg.minPeople);
    setMaxPeople(pkg.maxPeople);

    if (pkg.availableFrom) setAvailableFrom(pkg.availableFrom);
    if (pkg.availableTo) setAvailableTo(pkg.availableTo);

    setPackageType(pkg.packageType);
    setInclusions(pkg.inclusions);
    setExclusions(pkg.exclusions);
    setSelectedLandscapes(pkg.landscapes.map((l) => l.id));

    setLoading(false);
  }

  function toggleLandscape(id) {
    if (selectedLandscapes.includes(id)) {
      setSelectedLandscapes(selectedLandscapes.filter((l) => l !== id));
    } else {
      setSelectedLandscapes([...selectedLandscapes, id]);
    }
  }

  async function updatePkg() {
    const pkg = {
      title,
      description: desc,
      price: Number(price),
      durationDays: Number(duration),
      season,
      minPeople: Number(minPeople),
      maxPeople: Number(maxPeople),
      availableFrom,
      availableTo,
      packageType,
      inclusions,
      exclusions,
      landscapeIds: selectedLandscapes,
      active: true,
    };

    await adminUpdatePackage(id, pkg);
    alert("Package Updated Successfully!");
    navigate("/admin/packages");
  }

  if (loading) return <h3>Loading...</h3>;

  return (
    <div className="pkg-container">
      <div className="pkg-card">
        <h2>Edit Package</h2>

        <input
          className="input-box"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          className="input-box"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />

        <input
          className="input-box"
          placeholder="Duration Days"
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

        {/* People Group Size */}
        <input
          className="input-box"
          placeholder="Minimum People"
          value={minPeople}
          onChange={(e) => setMinPeople(e.target.value)}
        />

        <input
          className="input-box"
          placeholder="Maximum People"
          value={maxPeople}
          onChange={(e) => setMaxPeople(e.target.value)}
        />

        {/* Availability Dates */}
        <label className="label">Available From:</label>
        <input
          type="date"
          className="input-box"
          value={availableFrom}
          onChange={(e) => setAvailableFrom(e.target.value)}
        />

        <label className="label">Available To:</label>
        <input
          type="date"
          className="input-box"
          value={availableTo}
          onChange={(e) => setAvailableTo(e.target.value)}
        />

        {/* Package Type */}
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

        <textarea
          className="textarea-box"
          placeholder="Inclusions (Hotel, Food, Transport...)"
          value={inclusions}
          onChange={(e) => setInclusions(e.target.value)}
        />

        <textarea
          className="textarea-box"
          placeholder="Exclusions (Things NOT Included)"
          value={exclusions}
          onChange={(e) => setExclusions(e.target.value)}
        />

        <h3>Landscapes</h3>
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

        <button className="submit-btn" onClick={updatePkg}>
          Update Package
        </button>
      </div>
    </div>
  );
}