export default function Leaderboard() {
  return (
    <div
      style={{
        background: "linear-gradient(120deg, #34d399, #16a34a)",
        borderRadius: "16px",
        padding: "1.4rem 2rem",
        color: "#22223b",
        flex: 1,
        minWidth: 240
      }}
    >
      <div style={{ fontWeight: 700, marginBottom: ".6rem", fontSize: "1.1rem" }}>
        🏆 Leaderboard
      </div>
      <div style={{ opacity: 0.9, marginBottom: "1rem" }}>
        You’re rank <b>#5</b> this week!
      </div>
      <button
        style={{
          background: "#C7FFED",
          color: "#22223b",
          padding: ".52rem 2.2rem",
          fontWeight: 700,
          border: "none",
          borderRadius: "8px",
          cursor: "pointer"
        }}
      >
        View Rankings
      </button>
    </div>
  );
}
