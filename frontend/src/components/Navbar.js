import { NavLink, useLocation } from "react-router-dom";

const tabs = [
  { name: "Dashboard", path: "/" },
  { name: "Challenges", path: "/challenges" },
  { name: "Rewards", path: "/rewards" },
  { name: "Leaderboard", path: "/leaderboard" },
  { name: "Learn", path: "/learn" },
];

const navStyle = {
  display: "flex",
  gap: "32px",
  background: "#18162b",
  padding: "1.5rem 2rem",
  borderRadius: "16px",
  alignItems: "center",
  justifyContent: "center",
  marginBottom: "25px"
};

const tabStyle = {
  padding: "7px 22px",
  borderRadius: "10px",
  fontWeight: 600,
  color: "#fff",
  textDecoration: "none",
  fontSize: "1.05rem",
  border: "none"
};

export default function Navbar() {
  const location = useLocation();

  return (
    <nav style={navStyle}>
      {tabs.map(tab => (
        <NavLink
          key={tab.name}
          to={tab.path}
          style={({ isActive }) => ({
            ...tabStyle,
            background: isActive ? "#6d28d9" : "transparent",
            boxShadow: isActive ? "0 0 8px #6d28d9" : "none",
          })}
          end={tab.path === "/"}
        >
          {tab.name}
        </NavLink>
      ))}
    </nav>
  );
}
