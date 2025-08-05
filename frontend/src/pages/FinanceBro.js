import React from "react";
import FinanceBroChatBot from "../components/FinanceBroChatBot";

export default function FinanceBro({ mode }) {
  return (
    <div
      style={{
        minHeight: "80vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginTop: "48px",
      }}
    >
      <h1
        style={{
          color: mode === "boomer" ? "#24446e" : "#a78bfa",
          fontWeight: "bold",
          fontSize: "2rem",
          letterSpacing: ".5px",
          marginBottom: "8px",
        }}
      >
        Finance Bro 🕶️
      </h1>
      <div
        style={{
          color: mode === "boomer" ? "#24446e" : "#aab0fa",
          marginBottom: "22px",
          textAlign: "center",
        }}
      >
        Chat with your personal finance bro on all things money!
      </div>
      <div
        style={{
          background: mode === "boomer" ? "#f5f5f0" : "rgba(36, 32, 70, 0.87)",
          borderRadius: "24px",
          padding: "26px 24px 12px 24px",
          boxShadow: mode === "boomer" ? "0 0 24px 0 #aaa" : "0 0 24px 0 #271c45a3",
          width: "100%",
          maxWidth: "440px",
          minHeight: "340px",
          margin: "auto",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
        }}
      >
        <FinanceBroChatBot mode={mode} />
      </div>
    </div>
  );
}
