import React, { useEffect, useState } from "react";

// Example challenges data
const challengeList = [
  {
    id: 1,
    emoji: "🌞",
    title: "Morning Saver",
    desc: "Save ₹10 before 10 AM",
    points: 25,
    type: "Daily"
  },
  {
    id: 2,
    emoji: "🍱",
    title: "Lunch Money Challenge",
    desc: "Save ₹50 instead of buying lunch",
    points: 100,
    type: "Daily"
  },
  {
    id: 3,
    emoji: "⚔️",
    title: "Week Warrior",
    desc: "Save every day for 7 days straight",
    points: 500,
    type: "Weekly"
  },
  {
    id: 4,
    emoji: "☕",
    title: "Coffee Shop Skip",
    desc: "Skip expensive coffee 3 times this week",
    points: 150,
    type: "Weekly"
  },
  {
    id: 5,
    emoji: "🔥",
    title: "Monthly Marathon",
    desc: "Save ₹1000 this month",
    points: 1000,
    type: "Monthly"
  }
];

export default function Challenges({ user }) {
  const [completed, setCompleted] = useState([]);

  useEffect(() => {
    setCompleted(JSON.parse(localStorage.getItem(`completed_challenges_${user}`) || "[]"));

    function onStorage(event) {
      if (!event || event.key === null || event.key === `completed_challenges_${user}`) {
        setCompleted(JSON.parse(localStorage.getItem(`completed_challenges_${user}`) || "[]"));
      }
    }
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, [user]);

  function handleCompleteChallenge(ch) {
    if (completed.includes(ch.id)) return;
    const updatedCompleted = [...completed, ch.id];
    setCompleted(updatedCompleted);
    localStorage.setItem(`completed_challenges_${user}`, JSON.stringify(updatedCompleted));
    // award points
    const prevPoints = parseInt(localStorage.getItem(`points_${user}`) || "0", 10);
    const updatedPoints = prevPoints + ch.points;
    localStorage.setItem(`points_${user}`, updatedPoints);
    window.dispatchEvent(new Event("storage"));
  }

  return (
    <div style={{ maxWidth: 900, margin: "0 auto", padding: "38px 16px", color: "#fff" }}>
      <h1 style={{ color: "#a78bfa", fontSize: "2rem", fontWeight: 800 }}>
        Savings Challenges <span role="img" aria-label="apple">🍏</span>
      </h1>
      <div style={{ color: "#b6b6db", marginBottom: 22 }}>
        Complete challenges to earn points and build habits!
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 30 }}>
        {challengeList.map(ch => {
          const isDone = completed.includes(ch.id);
          return (
            <div
              key={ch.id}
              style={{
                background: "#202036",
                padding: "1.65rem 2.2rem",
                borderRadius: 16,
                boxShadow: isDone
                  ? "0 0 0 2.3px #41fa8f, 0 2px 24px #1affa455"
                  : "0 0 0 2px #232047",
                border: "1.5px solid #232047",
                marginBottom: 0
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 13, marginBottom: 7 }}>
                <span style={{ fontSize: "1.6rem" }}>{ch.emoji}</span>
                <span style={{
                  fontWeight: 800, fontSize: "1.18rem", letterSpacing: ".01em"
                }}>{ch.title}</span>
                <span style={{
                  background: ch.type === "Daily"
                    ? "#6a90fa"
                    : ch.type === "Weekly"
                      ? "#1affa4"
                      : "#a78bfa",
                  color: "#fff",
                  marginLeft: 10,
                  padding: "3px 15px",
                  fontWeight: 700,
                  borderRadius: 22,
                  fontSize: ".96rem",
                  boxShadow: "0 0 0 2px #232047"
                }}>{ch.type}</span>
              </div>
              <div style={{
                color: "#bbeae3", fontWeight: 600, marginLeft: 44, marginBottom: 8
              }}>
                {ch.desc}
              </div>
              {/* Progress Bar */}
              <div style={{ marginLeft: 44, marginTop: 2, marginBottom: 12, width: "75%" }}>
                <div style={{
                  width: "100%",
                  height: 10,
                  background: "#232047",
                  borderRadius: 6,
                  overflow: "hidden"
                }}>
                  <div
                    style={{
                      height: "100%",
                      background: isDone
                        ? "linear-gradient(90deg,#41fa8f 50%,#a78bfa 120%)"
                        : "linear-gradient(90deg,#332769 80%,#232047 120%)",
                      width: isDone ? "100%" : "0%",
                      transition: "width 0.6s"
                    }}
                  ></div>
                </div>
              </div>
              <div style={{
                marginLeft: 44,
                marginBottom: 14, color: "#53fca1", fontWeight: 700
              }}>
                {ch.points} pts
              </div>
              <button
                disabled={isDone}
                style={{
                  marginLeft: 44,
                  marginTop: 8,
                  fontWeight: 700,
                  padding: ".60em 1.41em",
                  borderRadius: 10,
                  border: "none",
                  background: isDone
                    ? "linear-gradient(90deg,#232047,#232047 100%)"
                    : "linear-gradient(90deg,#41fa8f,#a78bfa 120%)",
                  color: isDone
                    ? "#a78bfa"
                    : "#18162b",
                  fontSize: ".99rem",
                  cursor: isDone ? "not-allowed" : "pointer",
                  boxShadow: !isDone ? "0 1.5px 8px #41fa8f33" : undefined,
                  transition: "background .14s"
                }}
                onClick={() => handleCompleteChallenge(ch)}
              >
                {isDone ? "Completed ✔" : "Complete Challenge"}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
