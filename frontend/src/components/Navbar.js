import React from "react";

const navStyle = {
  display: "flex",
  gap: "32px",
  background: "#18162b",
  padding: "1.5rem 2rem",
  borderRadius: "16px",
  alignItems: "center",
};

const activeTab = {
  background: "#6d28d9",
  color: "#fff",
};

export default function Navbar({ active = "Dashboard" }) {
  const tabs = ["Dashboard", "Challenges", "Rewards", "Leaderboard", "Learn"];
  return (
    <nav style={navStyle}>
      {tabs.map(tab => (
        <div
          key={tab}
          style={{
            padding: "7px 22px",
            borderRadius: "10px",
            fontWeight: 600,
            color: "#fff",
            background: active === tab ? activeTab.background : "transparent",
            boxShadow: active === tab ? "0 0 8px #6d28d9" : "none",
            cursor: "pointer",
            border: "none"
          }}
        >
          {tab}
        </div>
      ))}
    </nav>
  );
}
