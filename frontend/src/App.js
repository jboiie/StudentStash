import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Challenges from "./pages/Challenges";
import ChallengeDetail from "./pages/ChallengeDetail";
import Rewards from "./pages/Rewards";
import Leaderboard from "./pages/Leaderboard";
import Learn from "./pages/Learn";
import { useState } from "react";
import Login from "./pages/Login"; // if you use login

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <Router>
      <Routes>
        {/* Login page; remove if not using authentication */}
        <Route path="/login" element={<Login onLogin={() => setIsLoggedIn(true)} />} />

        {/* Main pages */}
        <Route
          path="/"
          element={isLoggedIn ? <Dashboard /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/challenges"
          element={isLoggedIn ? <Challenges /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/challenges/:id"
          element={isLoggedIn ? <ChallengeDetail /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/rewards"
          element={isLoggedIn ? <Rewards /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/leaderboard"
          element={isLoggedIn ? <Leaderboard /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/learn"
          element={isLoggedIn ? <Learn /> : <Navigate to="/login" replace />}
        />

        {/* Redirect any unknown route */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
