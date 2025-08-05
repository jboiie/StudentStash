import React, { useState } from "react";

export default function Login({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    try {
      const res = await fetch("http://localhost:3001/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (data.success) {
        onLogin();
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError("Login failed");
    }
  };

  const buttonStyle = {
    padding: "0.5rem 1.5rem",
    border: "none",
    borderRadius: 8,
    background: "#6366f1",
    color: "white",
    cursor: "pointer",
    transition: "all 0.3s ease",
    fontSize: "1rem",
  };

  const hoverEffect = {
    boxShadow: "0px 0px 12px rgba(255,255,255,0.6)",
    transform: "scale(1.05)",
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(135deg, #0f172a, #1e1b4b, #3b0764)",
        fontFamily: "sans-serif",
      }}
    >
      <div
        style={{
          background: "rgba(255,255,255,0.05)",
          padding: "2rem",
          borderRadius: "12px",
          boxShadow: "0 0 20px rgba(0,0,0,0.5)",
          width: "300px",
          textAlign: "center",
          color: "white",
        }}
      >
        <h2 style={{ color: "#a78bfa", marginBottom: "1.5rem" }}>🔐 Login</h2>

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={{
            width: "100%",
            padding: "0.5rem",
            marginBottom: "1rem",
            borderRadius: 8,
            border: "none",
            outline: "none",
          }}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{
            width: "100%",
            padding: "0.5rem",
            marginBottom: "1rem",
            borderRadius: 8,
            border: "none",
            outline: "none",
          }}
        />

        {error && <p style={{ color: "red", fontSize: "0.9rem" }}>{error}</p>}

        <button
          style={buttonStyle}
          onMouseOver={(e) => Object.assign(e.target.style, hoverEffect)}
          onMouseOut={(e) =>
            Object.assign(e.target.style, {
              boxShadow: "none",
              transform: "scale(1)",
            })
          }
          onClick={handleLogin}
        >
          Login
        </button>
      </div>
    </div>
  );
}
