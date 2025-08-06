// src/pages/FinanceBro.js
import React from "react";
import FinanceBroChatBot from "../components/FinanceBroChatBot";

export default function FinanceBro() {
  return (
    <div
      style={{
        minHeight: "80vh",
        width: "100vw",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "none",
        margin: 0,
        padding: 0,
      }}
    >
      <FinanceBroChatBot />
    </div>
  );
}
