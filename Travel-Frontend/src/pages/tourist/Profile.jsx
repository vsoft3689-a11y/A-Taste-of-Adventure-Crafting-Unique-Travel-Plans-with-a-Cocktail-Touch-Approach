import React, { useEffect, useState } from "react";
import {
  getTouristProfile,
  updateTouristProfile,
  changePassword,
} from "../../api";

export default function Profile() {
  const [profile, setProfile] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [pwdMode, setPwdMode] = useState(false);

  const [form, setForm] = useState({
    preferredSeason: "",
    preferredPriceMin: "",
    preferredPriceMax: "",
    address: "",
    contact: "",
    age: "",
    gender: "",
    travelFrequency: "",
    budgetRange: "",
    travelStyle: "",
    foodPreference: "",
    prefersCrowdedPlaces: false,
    interests: [],
  });

  const [pwdForm, setPwdForm] = useState({
    oldPassword: "",
    newPassword: "",
  });

  const touristId = localStorage.getItem("userId");

  useEffect(() => {
    load();
  }, []);

  async function load() {
    const res = await getTouristProfile(touristId);
    setProfile(res);
    setForm({
      preferredSeason: res.preferredSeason || "",
      preferredPriceMin: res.preferredPriceMin || "",
      preferredPriceMax: res.preferredPriceMax || "",
      address: res.address || "",
      contact: res.contact || "",
      age: res.age || "",
      gender: res.gender || "",
      travelFrequency: res.travelFrequency || "",
      budgetRange: res.budgetRange || "",
      travelStyle: res.travelStyle || "",
      foodPreference: res.foodPreference || "",
      prefersCrowdedPlaces: res.prefersCrowdedPlaces || false,
      interests: res.interests || [],
    });
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  }

  function toggleInterest(value) {
    let updated = [...form.interests];
    if (updated.includes(value)) {
      updated = updated.filter((i) => i !== value);
    } else {
      updated.push(value);
    }
    setForm({ ...form, interests: updated });
  }

  async function saveProfile() {
    await updateTouristProfile(touristId, form);
    alert("Profile Updated!");
    setEditMode(false);
    load();
  }

  async function updatePassword() {
    await changePassword(touristId, pwdForm);
    alert("Password changed successfully.");
    setPwdMode(false);
    setPwdForm({ oldPassword: "", newPassword: "" });
  }

  if (!profile)
    return (
      <div style={{ textAlign: "center", paddingTop: 50, fontSize: 18 }}>
        Loading...
      </div>
    );

  return (
    <div style={{ display: "flex", justifyContent: "center", padding: 40 }}>
      <div
        style={{
          width: 500,
          background: "white",
          borderRadius: 12,
          padding: "25px 30px",
          boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
          border: "1px solid #eee",
        }}
      >
        <h2 style={{ textAlign: "center", marginBottom: 20 }}>Your Profile</h2>

        {/* -------------------- VIEW MODE -------------------- */}
        {!editMode ? (
          <>
            <p><b>Name:</b> {profile.name}</p>
            <p><b>Email:</b> {profile.email}</p>
            <p><b>Age:</b> {profile.age}</p>
            <p><b>Gender:</b> {profile.gender}</p>
            <p><b>Preferred Season:</b> {profile.preferredSeason}</p>
            <p><b>Price Range:</b> {profile.preferredPriceMin} - {profile.preferredPriceMax}</p>
            <p><b>Address:</b> {profile.address}</p>
            <p><b>Contact:</b> {profile.contact}</p>
            <p><b>Travel Frequency:</b> {profile.travelFrequency}</p>
            <p><b>Budget Range:</b> {profile.budgetRange}</p>
            <p><b>Travel Style:</b> {profile.travelStyle}</p>
            <p><b>Food Preference:</b> {profile.foodPreference}</p>
            <p><b>Likes Crowded Places:</b> {profile.prefersCrowdedPlaces ? "Yes" : "No"}</p>
            <p><b>Interests:</b> {profile.interests?.join(", ")}</p>

            <button style={btnPrimary} onClick={() => setEditMode(true)}>
              Edit Profile
            </button>
            <button style={btnSecondary} onClick={() => setPwdMode(true)}>
              Change Password
            </button>
          </>
        ) : (
          <>
            {/* -------------------- EDIT MODE -------------------- */}
            <h3>Edit Profile</h3>

            <label>Age:</label>
            <input
              name="age"
              value={form.age}
              onChange={handleChange}
              style={inputStyle}
              type="number"
            />

            <label>Gender:</label>
            <select
              name="gender"
              value={form.gender}
              onChange={handleChange}
              style={inputStyle}
            >
              <option value="">Select</option>
              <option>Male</option>
              <option>Female</option>
              <option>Other</option>
            </select>

            <label>Preferred Season:</label>
            <select
              name="preferredSeason"
              value={form.preferredSeason}
              onChange={handleChange}
              style={inputStyle}
            >
              <option value="">Select</option>
              <option>Summer</option>
              <option>Winter</option>
              <option>Monsoon</option>
            </select>

            <label>Min Price:</label>
            <input
              type="number"
              name="preferredPriceMin"
              value={form.preferredPriceMin}
              onChange={handleChange}
              style={inputStyle}
            />

            <label>Max Price:</label>
            <input
              type="number"
              name="preferredPriceMax"
              value={form.preferredPriceMax}
              onChange={handleChange}
              style={inputStyle}
            />

            <label>Address:</label>
            <textarea
              name="address"
              value={form.address}
              onChange={handleChange}
              style={inputStyle}
            />

            <label>Contact:</label>
            <input
              name="contact"
              value={form.contact}
              onChange={handleChange}
              style={inputStyle}
            />

            <label>Travel Frequency:</label>
            <select
              name="travelFrequency"
              value={form.travelFrequency}
              onChange={handleChange}
              style={inputStyle}
            >
              <option value="">Select</option>
              <option value="Rare">Rare</option>
              <option value="Often">Often</option>
              <option value="Very Often">Very Often</option>
            </select>

            <label>Budget Range:</label>
            <select
              name="budgetRange"
              value={form.budgetRange}
              onChange={handleChange}
              style={inputStyle}
            >
              <option value="">Select</option>
              <option>LOW</option>
              <option>MEDIUM</option>
              <option>HIGH</option>
            </select>

            <label>Travel Style:</label>
            <select
              name="travelStyle"
              value={form.travelStyle}
              onChange={handleChange}
              style={inputStyle}
            >
              <option value="">Select</option>
              <option>Luxury</option>
              <option>Budget</option>
              <option>Adventure</option>
            </select>

            <label>Food Preference:</label>
            <select
              name="foodPreference"
              value={form.foodPreference}
              onChange={handleChange}
              style={inputStyle}
            >
              <option value="">Select</option>
              <option>Veg</option>
              <option>Non-veg</option>
              <option>Vegan</option>
            </select>

            <label>Prefers Crowded Places: </label>
            <input
              type="checkbox"
              checked={form.prefersCrowdedPlaces}
              onChange={(e) =>
                setForm({ ...form, prefersCrowdedPlaces: e.target.checked })
              }
            />
<br /><br />
            <label>Interests:</label>
            <br /><br />
            <div style={{ marginBottom: 10 }}>
              {["Adventure", "Nature", "Culture", "Food", "Trekking"].map(
                (i) => (
                  <label key={i} style={{ marginRight: 10 }}>
                    <input
                      type="checkbox"
                      checked={form.interests.includes(i)}
                      onChange={() => toggleInterest(i)}
                    />
                    {i}
                  </label>
                )
              )}
            </div>

            <button onClick={saveProfile} style={btnPrimary}>
              Save
            </button>
            <button onClick={() => setEditMode(false)} style={btnCancel}>
              Cancel
            </button>
          </>
        )}

        {/* -------------------- PASSWORD SECTION -------------------- */}
        {pwdMode && (
          <div style={{ marginTop: 30 }}>
            <h3>Change Password</h3>

            <label>Old Password:</label>
            <input
              type="password"
              name="oldPassword"
              value={pwdForm.oldPassword}
              onChange={(e) =>
                setPwdForm({ ...pwdForm, oldPassword: e.target.value })
              }
              style={inputStyle}
            />

            <label>New Password:</label>
            <input
              type="password"
              name="newPassword"
              value={pwdForm.newPassword}
              onChange={(e) =>
                setPwdForm({ ...pwdForm, newPassword: e.target.value })
              }
              style={inputStyle}
            />

            <button onClick={updatePassword} style={btnPrimary}>
              Update Password
            </button>
            <button onClick={() => setPwdMode(false)} style={btnCancel}>
              Cancel
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "10px",
  marginBottom: "12px",
  borderRadius: "6px",
  border: "1px solid #ccc",
};

const btnPrimary = {
  width: "100%",
  padding: "10px",
  background: "#007bff",
  color: "white",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
  marginTop: "10px",
};

const btnSecondary = {
  width: "100%",
  padding: "10px",
  background: "#28a745",
  color: "white",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
  marginTop: "10px",
};

const btnCancel = {
  width: "100%",
  padding: "10px",
  background: "#dc3545",
  color: "white",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
  marginTop: "10px",
};
