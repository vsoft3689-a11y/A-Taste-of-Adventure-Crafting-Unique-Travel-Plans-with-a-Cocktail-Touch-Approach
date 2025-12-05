import React, { useState } from "react";
import AddLandscape from "./AddLandscape";
import ManageLandscapes from "./ManageLandscapes";
import AddPackage from "./AddPackage";
import ManagePackages from "./ManagePackages";
import "../../App.css"; // same styling used by tourist dashboard
import { useNavigate } from "react-router-dom";

export default function AdminDashboard() {
  // const [activeTab, setActiveTab] = useState("");
  const navigate = useNavigate();

  const renderContent = (activeTab) => {
    switch (activeTab) {
      case "add-landscape":
        return navigate("/admin/add-landscape");
      case "manage-landscapes":
        return navigate("/admin/manage-landscapes");
      case "add-package":
        return navigate("/admin/add-package");
      case "manage-packages":
        return navigate("/admin/packages");
      case "manage-bookings":
        return navigate("/admin/bookings");
      default:
      // return (
      //   <div className="admin-welcome">
      //     <h2>Welcome, Admin 👑</h2>
      //     <p>Select a card below to begin managing the system.</p>
      //   </div>
      // );
    }
  };

  return (
    <div className="tourist-container">
      <h2 className="tourist-title">Admin Dashboard</h2>
      <br />
      <div className="admin-welcome">
        <h2>Welcome, Admin</h2>
        {/* <p>Select a card below to begin managing the system.</p> */}
      </div>
      <br />
      <hr className="divider" />
      {/* <br /> */}
      {/* ---- Admin Card Menu ---- */}
      <h3 className="section-title">Quick Actions</h3>

      <div className="slider">
        <div
          className="slider-card pink"
          onClick={() => renderContent("add-landscape")}
        >
          <h4>🏞 Add Landscape</h4>
          <br />
          <p>Create new landscape</p>
        </div>

        <div
          className="slider-card yellow"
          onClick={() => renderContent("manage-landscapes")}
        >
          <h4>🗂 Manage Landscapes</h4>
          <br />
          <p>View landscapes</p>
        </div>

        <div
          className="slider-card blue"
          onClick={() => renderContent("add-package")}
        >
          <h4>📦 Add Package</h4>
          <br />
          <p>Create new travel package</p>
        </div>

        <div
          className="slider-card green"
          onClick={() => renderContent("manage-packages")}
        >
          <h4>🛠 Manage Packages</h4>
          <br />
          <p>View packages</p>
        </div>
        <div
          className="slider-card brown"
          onClick={() => renderContent("manage-bookings")}
        >
          <h4>📅 Manage Bookings</h4>
          <br />
          <p>View bookings</p>
        </div>
      </div>

      <hr className="divider" />

      {/* ---- Render Selected Component ---- */}
      {/* <div className="admin-content-box">{renderContent()}</div> */}
    </div>
  );
}
