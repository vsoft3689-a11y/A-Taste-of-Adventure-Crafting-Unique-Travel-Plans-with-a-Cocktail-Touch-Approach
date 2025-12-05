import React, { useEffect, useState } from "react";
import { fetchLandscapes, updateLandscape } from "../../api";
import { useParams, useNavigate } from "react-router-dom";
import "../../App.css";

export default function EditLandscape() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [landscape, setLandscape] = useState(null);

  useEffect(() => {
    load();
  }, []);

  async function load() {
    const data = await fetchLandscapes(id);
    const filtered = data.find((l) => l.id.toString() === id.toString());
    setLandscape(filtered);
  }
  async function save() {
    await updateLandscape(id, landscape);
    alert("Landscape updated successfully!");
    navigate("/admin/manage-landscapes");
  }

  if (!landscape) return <div className="el-loading">Loading Landscape...</div>;

  return (
    <div className="el-container">
      <h2 className="el-title">✏ Edit Landscape</h2>

      <div className="el-form-card">
        <label>Name</label>
        <input
          className="el-input"
          value={landscape.name}
          onChange={(e) => setLandscape({ ...landscape, name: e.target.value })}
        />

        <label>City</label>
        <input
          className="el-input"
          value={landscape.city}
          onChange={(e) => setLandscape({ ...landscape, city: e.target.value })}
        />

        <label>Description</label>
        <textarea
          className="el-textarea"
          value={landscape.description}
          onChange={(e) =>
            setLandscape({ ...landscape, description: e.target.value })
          }
        />

        <label>Image URL</label>
        <input
          className="el-input"
          value={landscape.imageUrl}
          onChange={(e) =>
            setLandscape({ ...landscape, imageUrl: e.target.value })
          }
        />

        <label>Season</label>
        <select
          className="el-input"
          value={landscape.season}
          onChange={(e) =>
            setLandscape({ ...landscape, season: e.target.value })
          }
        >
          <option>Summer</option>
          <option>Winter</option>
          <option>Monsoon</option>
          <option>All</option>
        </select>

        <label>Category</label>
        <select
          className="el-input"
          value={landscape.category}
          onChange={(e) =>
            setLandscape({ ...landscape, category: e.target.value })
          }
        >
          <option>Beach</option>
          <option>Temple</option>
          <option>Waterfall</option>
          <option>Adventure</option>
          <option>Hill Station</option>
          <option>Wildlife</option>
        </select>

        <label>Rating</label>
        <input
          className="el-input"
          type="number"
          min="1"
          max="5"
          value={landscape.rating}
          onChange={(e) =>
            setLandscape({ ...landscape, rating: e.target.value })
          }
        />

        <label>Popularity</label>
        <input
          className="el-input"
          type="number"
          value={landscape.popularity}
          onChange={(e) =>
            setLandscape({ ...landscape, popularity: e.target.value })
          }
        />

        <label>Latitude</label>
        <input
          className="el-input"
          type="number"
          value={landscape.latitude}
          onChange={(e) =>
            setLandscape({ ...landscape, latitude: e.target.value })
          }
        />

        <label>Longitude</label>
        <input
          className="el-input"
          type="number"
          value={landscape.longitude}
          onChange={(e) =>
            setLandscape({ ...landscape, longitude: e.target.value })
          }
        />

        <label>Average Cost</label>
        <input
          className="el-input"
          type="number"
          value={landscape.averageCost}
          onChange={(e) =>
            setLandscape({ ...landscape, averageCost: e.target.value })
          }
        />

        <label>Best Time to Visit</label>
        <input
          className="el-input"
          value={landscape.bestTimeToVisit}
          onChange={(e) =>
            setLandscape({ ...landscape, bestTimeToVisit: e.target.value })
          }
        />

        <label>Precautions</label>
        <input
          className="el-input"
          value={landscape.precautions}
          onChange={(e) =>
            setLandscape({ ...landscape, precautions: e.target.value })
          }
        />

        <label>Contact Info</label>
        <input
          className="el-input"
          value={landscape.contactInfo}
          onChange={(e) =>
            setLandscape({ ...landscape, contactInfo: e.target.value })
          }
        />

        <label>Timings</label>
        <input
          className="el-input"
          value={landscape.Timings}
          onChange={(e) =>
            setLandscape({ ...landscape, Timings: e.target.value })
          }
        />

        <label>Preferred Age Group</label>
        <select
          className="el-input"
          value={landscape.preferredAgeGroup}
          onChange={(e) =>
            setLandscape({ ...landscape, preferredAgeGroup: e.target.value })
          }
        >
          <option>Kids</option>
          <option>Adults</option>
          <option>Seniors</option>
          <option>All</option>
        </select>

        <label>Preferred Gender</label>
        <select
          className="el-input"
          value={landscape.preferredGender}
          onChange={(e) =>
            setLandscape({ ...landscape, preferredGender: e.target.value })
          }
        >
          <option>Any</option>
          <option>Male</option>
          <option>Female</option>
        </select>

        <label>Crowded Place?</label>
        <select
          className="el-input"
          value={landscape.isCrowdedPlace}
          onChange={(e) =>
            setLandscape({ ...landscape, isCrowdedPlace: e.target.value })
          }
        >
          <option value={true}>Yes</option>
          <option value={false}>No</option>
        </select>

        <button className="el-save-btn" onClick={save}>
          💾 Save Changes
        </button>
      </div>
    </div>
  );
}
