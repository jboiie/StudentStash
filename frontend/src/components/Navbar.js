import { Link, useLocation } from "react-router-dom";

const navItems = [
  { name: "Dashboard", path: "/" },
  { name: "Challenges", path: "/challenges" },
  { name: "Rewards", path: "/rewards" },
  { name: "Leaderboard", path: "/leaderboard" },
  { name: "Learn", path: "/learn" },
  { name: "Finance Bro", path: "/finance-bro" }
];

export default function Navbar({ mode, toggleMode, logout, user }) {
  const location = useLocation();
  const navBarBg = mode === "boomer" ? "#e9e6df" : "#18162b";
  const accent = mode === "boomer" ? "#24446e" : "#a78bfa";
  const navLinkActiveBg = mode === "boomer" ? "#dbeafe" : "#3d217e88";

  return (
    <nav
      style={{
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        height: "58px",
        background: navBarBg,
        borderBottom: mode === "boomer" ? "1.5px solid #d9d5cb" : "none",
        marginBottom: 22,
        fontFamily: "inherit"
      }}
    >
      {/* LEFT: Mode Switch */}
      <div style={{
        position: "absolute",
        left: 22,
        top: 0,
        height: "100%",
        display: "flex",
        alignItems: "center",
        gap: "9px"
      }}>
        <span
          style={{
            color: accent,
            fontWeight: 600,
            fontSize: ".93rem"
          }}
        >
          {mode === "boomer" ? "Boomer" : "Gen Z"}
        </span>
        <div
          style={{
            width: "23px",
            height: "13px",
            background: mode === "boomer" ? "#7ba7e1" : "#a78bfa",
            borderRadius: "7px",
            cursor: "pointer",
            position: "relative",
            transition: "background 0.18s"
          }}
          onClick={toggleMode}
          title="Toggle Gen Z / Boomer mode"
        >
          <div
            style={{
              width: "9px",
              height: "9px",
              borderRadius: "50%",
              background: "#fff",
              position: "absolute",
              left: mode === "boomer" ? "11px" : "2px",
              top: "2px",
              boxShadow: "0 1px 2px #bbb",
              transition: "left 0.13s"
            }}
          />
        </div>
      </div>
      {/* CENTER: Navigation Links */}
      <div style={{ display: "flex", gap: "20px" }}>
        {navItems.map(({ name, path }) => {
          // Only highlight when the path matches exactly!
          const active = location.pathname === path;
          return (
            <Link
              key={name}
              to={path}
              style={{
                color: accent,
                textDecoration: "none",
                fontWeight: 600,
                fontSize: "1.05rem",
                padding: "6px 16px",
                borderRadius: "8px",
                background: active ? navLinkActiveBg : "none",
                boxShadow: active
                  ? mode === "boomer"
                    ? "0 1.5px 7px #b6d0eb22"
                    : "0 0 0 2px #a78bfa62"
                  : "none",
                transition: "box-shadow 0.16s, background 0.17s"
              }}
            >
              {name}
            </Link>
          );
        })}
      </div>
      {/* RIGHT: Welcome and Logout */}
      <div style={{
        position: "absolute",
        right: 24,
        top: 0,
        height: "100%",
        display: "flex",
        alignItems: "center",
        gap: "13px"
      }}>
        <span style={{
          fontWeight: 600,
          color: accent,
          fontSize: ".97rem",
          letterSpacing: ".02em"
        }}>
          Welcome, {user}
        </span>
        <button
          onClick={logout}
          style={{
            background: "transparent",
            color: mode === "boomer" ? "#c23030" : "#a78bfa",
            border: mode === "boomer"
              ? "1.2px solid #c23030"
              : "1.08px solid #a78bfa",
            borderRadius: "7px",
            padding: "0.26rem 0.81rem",
            cursor: "pointer",
            fontWeight: 580,
            fontSize: ".90rem",
            fontFamily: "inherit"
          }}
        >
          Logout
        </button>
      </div>
    </nav>
  );
}
