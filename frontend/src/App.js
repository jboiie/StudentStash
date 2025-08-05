import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";
import Dashboard from "./pages/Dashboard";

function Login({ onLogin, isLoggedIn }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  if (isLoggedIn) {
    return <Navigate to="/dashboard" />;
  }

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
        setError(data.message || "Login failed");
      }
    } catch (err) {
      setError("Error connecting to server");
    }
  };

  return (
    <div
      style={{
        height: "100vh",
        background: "linear-gradient(135deg, #0a0f2c, #1a1447, #3b0764)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "sans-serif",
        color: "white",
      }}
    >
      <div
        style={{
          background: "rgba(49, 46, 129, 0.9)",
          padding: "2rem",
          borderRadius: "10px",
          boxShadow: "0px 0px 20px rgba(255, 255, 255, 0.2)",
          textAlign: "center",
          width: "300px",
        }}
      >
        <h1 style={{ color: "#a78bfa" }}>🔐 Login</h1>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={{
            padding: "0.5rem",
            width: "100%",
            marginBottom: "1rem",
            borderRadius: "8px",
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
            padding: "0.5rem",
            width: "100%",
            marginBottom: "1rem",
            borderRadius: "8px",
            border: "none",
            outline: "none",
          }}
        />
        <button
          onClick={handleLogin}
          style={{
            padding: "0.5rem 1rem",
            background: "#6366f1",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            width: "100%",
            transition: "0.3s",
          }}
          onMouseOver={(e) => {
            e.target.style.background = "#4f46e5";
          }}
          onMouseOut={(e) => {
            e.target.style.background = "#6366f1";
          }}
        >
          Login
        </button>
        {error && <p style={{ color: "#f87171", marginTop: "1rem" }}>{error}</p>}
      </div>
    </div>
  );
}

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={<Login onLogin={() => setIsLoggedIn(true)} isLoggedIn={isLoggedIn} />}
        />
        <Route
          path="/dashboard"
          element={
            isLoggedIn ? <Dashboard /> : <Navigate to="/" />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
