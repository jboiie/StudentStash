import React from "react";

export default function ModeSlider({ mode, toggleMode }) {
  return (
    <div
      style={{
        position: "fixed",
        top: 18,
        right: 28,
        zIndex: 9999,
        display: "flex",
        alignItems: "center",
        background: "rgba(24,22,43,0.95)",
        borderRadius: 20,
        padding: "4px 12px 4px 16px",
        boxShadow: "0 2px 8px #0005"
      }}
    >
      <span
        style={{
          fontWeight: 600,
          color: mode === "boomer" ? "#007bff" : "#a78bfa",
          fontSize: ".98rem",
          marginRight: 9
        }}
      >
        {mode === "boomer" ? "Boomer" : "Gen Z"}
      </span>
      <div
        style={{
          width: "38px",
          height: "20px",
          background: mode === "boomer" ? "#bdbdbd" : "#a78bfa",
          borderRadius: "15px",
          cursor: "pointer",
          position: "relative",
          transition: "background 0.24s"
        }}
        onClick={toggleMode}
        title="Toggle Gen Z / Boomer mode"
      >
        <div
          style={{
            width: "18px",
            height: "18px",
            borderRadius: "50%",
            background: "#fff",
            position: "absolute",
            left: mode === "boomer" ? "18px" : "2px",
            top: "1px",
            boxShadow: "0 1px 4px #bbb",
            transition: "left 0.20s"
          }}
        />
      </div>
    </div>
  );
}
