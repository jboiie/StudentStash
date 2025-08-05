import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Challenges from "./pages/Challenges";
import ChallengeDetail from "./pages/ChallengeDetail";
import Rewards from "./pages/Rewards";
import Leaderboard from "./pages/Leaderboard";
import Learn from "./pages/Learn";
import FinanceBro from "./pages/FinanceBro";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";

function App() {
  // Theme & user state
  const [mode, setMode] = useState(localStorage.getItem("mode") || "genz");
  const [user, setUser] = useState(localStorage.getItem("studentstash_user") || "");

  function toggleMode() {
    const nextMode = mode === "genz" ? "boomer" : "genz";
    setMode(nextMode);
    localStorage.setItem("mode", nextMode);
  }

  function logout() {
    localStorage.removeItem("studentstash_user");
    setUser("");
  }

  return (
    <Router>
      <MainRouter
        user={user}
        setUser={setUser}
        mode={mode}
        toggleMode={toggleMode}
        logout={logout}
      />
    </Router>
  );
}

function MainRouter({ user, setUser, mode, toggleMode, logout }) {
  const location = useLocation();

  if (!user && location.pathname === "/login") {
    return <Login setUser={setUser} />;
  }
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: mode === "boomer" ? "#f4f2ee" : "#18162b",
        color: mode === "boomer" ? "#272727" : "#fff",
        transition: "background 0.3s"
      }}
    >
      <Navbar
        mode={mode}
        toggleMode={toggleMode}
        logout={logout}
        user={user}
      />
      <div style={{ maxWidth: 1000, margin: "0 auto", paddingTop: 20 }}>
        <Routes>
          <Route path="/" element={<Dashboard mode={mode} user={user} />} />
          <Route path="/challenges" element={<Challenges mode={mode} user={user} />} />
          <Route path="/challenges/:id" element={<ChallengeDetail mode={mode} user={user} />} />
          {/* HERE: Pass user prop to Rewards */}
          <Route path="/rewards" element={<Rewards mode={mode} user={user} />} />
          <Route path="/leaderboard" element={<Leaderboard mode={mode} user={user} />} />
          <Route path="/learn" element={<Learn mode={mode} user={user} />} />
          <Route path="/finance-bro" element={<FinanceBro mode={mode} user={user} />} />
          <Route path="/login" element={<Navigate to="/" />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
