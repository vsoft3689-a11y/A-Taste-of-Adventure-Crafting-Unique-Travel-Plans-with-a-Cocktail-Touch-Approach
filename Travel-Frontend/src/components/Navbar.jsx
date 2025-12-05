import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../App.css"; // ← import CSS

export default function Navbar() {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const role = localStorage.getItem("role");
    const token = localStorage.getItem("token");

    if (token && role) {
      setUser(token);
      setRole(role);
    }
  }, [navigate]);

  function logout() {
    localStorage.clear();
    setUser(null);
    setRole(null);
    navigate("/login");
  }

  return (
    <nav className="nav">
      <div className="nav-left">
        <Link className="nav-logo" to="/">
          TravelX
        </Link>

      </div>

      <div className="nav-right">
        {user ? (
          <>
          {role === "ROLE_USER" && (
            <>
              <Link className="nav-link" to="/tourist/dashboard">Dashboard</Link>
            </>
          )}
  
          {role === "ROLE_ADMIN" && (
            <>
              <Link className="nav-link" to="/admin/dashboard">Dashboard</Link>
            </>
          )}
          <button className="logout-btn" onClick={logout}>Logout</button>
          </>
        ) : (
          <>
            <Link className="nav-btn" to="/login">Login</Link>
            <Link className="nav-btn" to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}
