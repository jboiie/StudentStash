import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// DEMO: Hardcoded user credentials
const DEMO_USER = {
  username: "admin",
  password: "1234"
};

export default function Login({ setUser }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [mode] = useState(localStorage.getItem("mode") || "genz");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    if (username.trim().toLowerCase() !== DEMO_USER.username ||
        password !== DEMO_USER.password) {
      setError("Invalid username or password.");
      return;
    }
    localStorage.setItem("studentstash_user", username);
    setUser(username);
    navigate("/");
  }

  // THEME COLORS
  const isBoomer = mode === "boomer";
  const gradientBg = isBoomer
    ? "linear-gradient(120deg, #ffeeca 0%, #cfe6f3 100%)"
    : "linear-gradient(130deg, #4a39bb 0%, #b98efa 60%, #49c7fa 100%)";
  const cardBg = isBoomer
    ? "#fcfaf7ee"
    : "rgba(30,17,84,0.94)";
  const textColor = isBoomer ? "#223a5d" : "#efeaff";
  const subtitleColor = isBoomer ? "#526282" : "#bcbfe2";
  const inputBg = isBoomer ? "#fcf8ef" : "#23214f";
  const border = isBoomer ? "1.2px solid #d1bfa8" : "1.1px solid #513ab1";
  const focusShadow = isBoomer
    ? "0 0 0 1.2px #5cb7fe"
    : "0 0 0 2.2px #a78bfa90";
  const titleColor = isBoomer ? "#3d6596" : "#a78bfa";
  const btnBg = isBoomer ? "#3f89bb" : "#a78bfa";
  const btnColor = isBoomer ? "#fff" : "#18162b";

  return (
    <div style={{
      minHeight: "100vh",
      minWidth: "100vw",
      width: "100vw",
      height: "100vh",
      background: gradientBg,
      color: textColor,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      boxSizing: "border-box"
    }}>
      <div style={{
        minWidth: 335,
        maxWidth: 375,
        width: "100%",
        borderRadius: "22px",
        background: cardBg,
        boxShadow: isBoomer
          ? "0 7px 40px #b4c7d888, 0 2px 8px #20202424"
          : "0 12px 56px 6px #7e72ae39, 0 1.5px 10px #0003",
        padding: "2.3rem 2.1rem 1.5rem",
        position: "relative",
        backdropFilter: "blur(2.5px)"
      }}>
        {/* Mascot */}
        <div
          style={{
            width: "100%",
            textAlign: "center",
            marginBottom: "13px",
            userSelect: "none",
            fontSize: "2.42rem",
            lineHeight: 1,
          }}
        >
          <span role="img" aria-label="money bag">💰</span>
        </div>
        {/* Title */}
        <div
          style={{
            fontFamily: "inherit",
            fontSize: "2.0rem",
            letterSpacing: ".02em",
            fontWeight: 800,
            color: titleColor,
            textAlign: "center",
            margin: "0 0 2px 0"
          }}
        >
          StudentStash Login
        </div>
        <div style={{
          color: subtitleColor,
          textAlign: "center",
          fontWeight: 500,
          fontSize: ".98rem",
          letterSpacing: ".01em",
          margin: "12px 0 22px",
        }}>
          Sign in to save, track, and stack your finances!
        </div>
        <form
          onSubmit={handleSubmit}
          style={{ display: "flex", flexDirection: "column", gap: "1.15rem" }}
          autoComplete="off"
        >
          <label style={{
            fontWeight: 600,
            fontSize: ".99rem",
            color: isBoomer ? "#4b607a" : "#dacfff"
          }}>
            Username
            <input
              type="text"
              autoCapitalize="none"
              autoFocus
              style={{
                display: "block",
                width: "100%",
                marginTop: "7px",
                borderRadius: "8px",
                border,
                padding: ".78rem",
                background: inputBg,
                color: textColor,
                fontWeight: 500,
                fontSize: "1.07rem",
                outline: "none",
                transition: "box-shadow 0.16s",
              }}
              value={username}
              onChange={e => { setUsername(e.target.value); setError(""); }}
              onFocus={e => e.target.style.boxShadow = focusShadow}
              onBlur={e => e.target.style.boxShadow = "none"}
              required
            />
          </label>
          <label style={{
            fontWeight: 600,
            fontSize: ".995rem",
            color: isBoomer ? "#4b607a" : "#dacfff"
          }}>
            Password
            <input
              type="password"
              autoComplete="current-password"
              style={{
                display: "block",
                width: "100%",
                marginTop: "7px",
                borderRadius: "8px",
                border,
                padding: ".78rem",
                background: inputBg,
                color: textColor,
                fontWeight: 500,
                fontSize: "1.07rem",
                outline: "none",
                transition: "box-shadow 0.16s"
              }}
              value={password}
              onChange={e => { setPassword(e.target.value); setError(""); }}
              onFocus={e => e.target.style.boxShadow = focusShadow}
              onBlur={e => e.target.style.boxShadow = "none"}
              required
            />
          </label>
          <button
            style={{
              background: btnBg,
              color: btnColor,
              fontWeight: 700,
              padding: "1.05rem",
              borderRadius: "10px",
              border: "none",
              fontSize: "1.12rem",
              boxShadow: isBoomer
                ? "0 1px 14px 0 #b1d4fa29"
                : "0 2.5px 19px #733ee527",
              cursor: "pointer",
              marginTop: "6px",
              letterSpacing: ".01em",
              transition: "all 0.16s"
            }}
            type="submit"
          >
            Log In
          </button>
          {error && <div style={{
            color: "#d93333",
            background: isBoomer ? "#fff6f6" : "#36162c",
            borderRadius: "5px",
            fontSize: "1rem",
            padding: "10px 0 10px 14px",
            marginTop: "-8px"
          }}>{error}</div>}
          <div style={{
            fontSize: ".93rem",
            textAlign: "center",
            marginTop: "13px",
            color: isBoomer ? "#7a6b54" : "#c6cbfb"
          }}>
            <span style={{ opacity: 0.86 }}>Demo login: <b>admin</b> / <b>1234</b></span>
          </div>
        </form>
      </div>
    </div>
  );
}
