import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import challengeList from "../data/challengeList";

export default function ChallengeDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const challenge = challengeList.find(c => String(c.id) === String(id));

  if (!challenge) {
    return (
      <div style={{ color: "#fff", padding: "2rem" }}>
        <h2>Challenge not found</h2>
        <button
          style={{ marginTop: 20, padding: "0.7rem 1.1rem", fontWeight: 700, borderRadius: 8, cursor: "pointer" }}
          onClick={() => navigate(-1)}
        >Back</button>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 600, margin: "50px auto", background: "#151326", borderRadius: 15, boxShadow: "0 2px 20px #7b30f522", padding: "2.3rem 2rem", color: "#fff" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        <span style={{ fontSize: "2.1rem" }}>{challenge.emoji}</span>
        <h2 style={{ color: "#b688f7", margin: 0 }}>{challenge.title}</h2>
      </div>
      <p style={{ color: "#d9e5ff", marginTop: 13, fontSize: "1.13rem" }}>{challenge.desc}</p>
      <div style={{ color: "#9ff4d1", fontWeight: 600, margin: "15px 0 8px", fontSize: "1.05rem" }}>
        Challenge Type: <span style={{ color: "#fff" }}>{challenge.type}</span>
      </div>
      <div style={{ color: "#53fca1", fontWeight: 700, fontSize: "1.18rem" }}>
        Points: {challenge.points}
      </div>
      <button
        style={{ marginTop: 27, padding: "0.7rem 1.1rem", fontWeight: 700, borderRadius: 8, cursor: "pointer", border: "none", background: "#8456f7", color: "#fff", fontSize: "1.08rem" }}
        onClick={() => navigate(-1)}
      >Back to Challenges</button>
    </div>
  );
}
