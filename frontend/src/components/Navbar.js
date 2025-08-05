import React from "react";
import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const location = useLocation();

  const navItems = [
    { name: "Dashboard", path: "/" },
    { name: "History", path: "/history" },
    { name: "Profile", path: "/profile" },
    { name: "Leaderboard", path: "/leaderboard" }
  ];

  return (
    <nav style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "space-around",
      padding: "1rem",
      background: "linear-gradient(90deg, #1e1b4b, #0f172a)",
      color: "white",
      boxShadow: "0 2px 10px rgba(0,0,0,0.5)"
    }}>
      {navItems.map((item) => (
        <Link
          key={item.path}
          to={item.path}
          style={{
            textDecoration: "none",
            color: location.pathname === item.path ? "#a78bfa" : "white",
            fontWeight: location.pathname === item.path ? "bold" : "normal",
            padding: "0.5rem 1rem",
            borderRadius: "8px",
            transition: "all 0.3s ease",
            background:
              location.pathname === item.path
                ? "rgba(167, 139, 250, 0.2)"
                : "transparent"
          }}
        >
          {item.name}
        </Link>
      ))}
    </nav>
  );
}
