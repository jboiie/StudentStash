import React, { useState, createContext, useContext } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Challenges from "./pages/Challenges";
import ChallengeDetail from "./pages/ChallengeDetail";
import Rewards from "./pages/Rewards";
import Leaderboard from "./pages/Leaderboard";
import Investing from "./pages/Investing";
import Learn from "./pages/Learn";
import FinanceBro from "./pages/FinanceBro";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";

const THEME_COLORS = {
  genz: {
    background: "#18162b",
    card: "#202036",
    highlight: "#a78bfa",
    accent: "#41fa8f",
    border: "#a78bfa",
    text: "#fff",
    muted: "#b6b6db",
    badgeLocked: "#2d2d46"
  },
  boomer: {
    background: "#181511",
    card: "#21201d",
    highlight: "#e7ddca",
    accent: "#f5e8d6",
    border: "#a69979",
    text: "#ede8df",
    muted: "#a69979",
    badgeLocked: "#7a6d52"
  }
};

export const ThemeContext = createContext();

export default function App() {
  const [mode, setMode] = useState(localStorage.getItem("mode") || "genz");
  const [user, setUser] = useState(localStorage.getItem("studentstash_user") || "");
  const theme = THEME_COLORS[mode];

  function toggleMode() {
    const nextMode = mode === "genz" ? "boomer" : "genz";
    setMode(nextMode);
    localStorage.setItem("mode", nextMode);
    document.body.style.background = THEME_COLORS[nextMode].background;
  }

  function logout() {
    localStorage.removeItem("studentstash_user");
    setUser("");
  }

  return (
    <ThemeContext.Provider value={{ mode, theme, toggleMode }}>
      <Router>
        <MainRouter user={user} setUser={setUser} logout={logout} />
      </Router>
    </ThemeContext.Provider>
  );
}

function MainRouter({ user, setUser, logout }) {
  const location = useLocation();
  const { theme } = useContext(ThemeContext);

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
        background: theme.background,
        color: theme.text,
        transition: "background 0.3s"
      }}
    >
      <Navbar mode={useContext(ThemeContext).mode} toggleMode={useContext(ThemeContext).toggleMode} logout={logout} user={user} />
      <div style={{ maxWidth: 1000, margin: "0 auto", paddingTop: 20 }}>
        <Routes>
          <Route path="/" element={<Dashboard user={user} />} />
          <Route path="/challenges" element={<Challenges user={user} />} />
          <Route path="/challenges/:id" element={<ChallengeDetail user={user} />} />
          <Route path="/rewards" element={<Rewards user={user} />} />
          <Route path="/leaderboard" element={<Leaderboard user={user} />} />
          <Route path="/investing" element={<Investing user={user} />} />
          <Route path="/learn" element={<Learn user={user} />} />
          <Route path="/finance-bro" element={<FinanceBro user={user} />} />
          <Route path="/login" element={<Navigate to="/" replace />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </div>
  );
}
