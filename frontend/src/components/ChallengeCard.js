export default function ChallengeCard({ onClick }) {
  return (
    <div
      style={{
        background: "linear-gradient(120deg, #a78bfa, #6d28d9)",
        borderRadius: "16px",
        padding: "1.4rem 2rem",
        color: "#fff",
        flex: 1,
        marginRight: "18px",
        minWidth: 240
      }}
    >
      <div style={{ fontWeight: 700, marginBottom: ".6rem", fontSize: "1.1rem" }}>
        🎯 Daily Challenge
      </div>
      <div style={{ opacity: 0.92, marginBottom: "1rem" }}>
        Save ₹25 and earn 50 points!
      </div>
      <button
        style={{
          background: "#33E1B8",
          color: "#22223b",
          padding: ".52rem 2.2rem",
          fontWeight: 700,
          border: "none",
          borderRadius: "8px",
          marginTop: ".5rem",
          opacity: 0.93,
          cursor: "pointer"
        }}
        onClick={onClick}
      >
        Start Challenge
      </button>
    </div>
  );
}
