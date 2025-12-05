import React, { useState } from "react";
import { loginUser } from "../../api";
import "../../App.css";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function handleLogin() {
    const data = { email, password };

    const res = await loginUser(data);

    localStorage.setItem("token", res.token);
    localStorage.setItem("role", res.role);
    localStorage.setItem("userId", res.id);


    alert("Login Successful!");

    if (res.role === "ROLE_ADMIN") {
      navigate("/admin/dashboard");
    } else {
      navigate("/tourist/dashboard");
    }
  }

  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="login-title">Login Page</h2>

        <input
          className="login-input"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className="login-input"
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="login-btn" onClick={handleLogin}>
          Login
        </button>
      </div>
    </div>
  );
}
