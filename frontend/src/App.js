import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import Challenges from "./pages/Challenges";
import ChallengeDetail from "./pages/ChallengeDetail";
import Rewards from "./pages/Rewards";
import Leaderboard from "./pages/Leaderboard";
import Learn from "./pages/Learn";
import Login from "./pages/Login";
import FinanceBro from "./pages/FinanceBro";

function App() {
  const [mode, setMode] = useState(localStorage.getItem("mode") || "genz");
  const [user, setUser] = useState(localStorage.getItem("studentstash_user") || "");

  const toggleMode = () => {
    const nextMode = mode === "genz" ? "boomer" : "genz";
    setMode(nextMode);
    localStorage.setItem("mode", nextMode);
  };

  const logout = () => {
    localStorage.removeItem("studentstash_user");
    setUser("");
  };

  return (
    <Router>
      <div
        className="app-container"
        style={{
          backgroundColor: mode === "boomer" ? "#e9e6df" : "#1a172f",
          color: mode === "boomer" ? "#24446e" : "white",
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Navbar mode={mode} toggleMode={toggleMode} logout={logout} user={user} />
        {!user ? (
          <Login onLoginSuccess={(username) => setUser(username)} />
        ) : (
          <div style={{ flex: 1, padding: "0 20px", position: "relative" }}>
            <Routes>
              <Route path="/" element={<Dashboard mode={mode} />} />
              <Route path="/challenges" element={<Challenges mode={mode} />} />
              <Route path="/challenge/:id" element={<ChallengeDetail mode={mode} />} />
              <Route path="/rewards" element={<Rewards mode={mode} />} />
              <Route path="/leaderboard" element={<Leaderboard mode={mode} />} />
              <Route path="/learn" element={<Learn mode={mode} />} />
              <Route path="/finance-bro" element={<FinanceBro mode={mode} />} />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </div>
        )}
      </div>
    </Router>
  );
}

export default App;
