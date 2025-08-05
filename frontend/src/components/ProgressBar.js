export default function ProgressBar({ current, goal }) {
  const percent = Math.min(100, (current / goal) * 100);
  return (
    <div style={{ width: "100%", margin: "14px 0" }}>
      <div
        style={{
          width: "100%",
          background: "#29274A",
          height: "12px",
          borderRadius: "8px",
          position: "relative"
        }}
      >
        <div
          style={{
            width: percent + "%",
            background: "linear-gradient(90deg, #a78bfa, #34d399)",
            height: "100%",
            borderRadius: "8px",
            transition: "width 0.5s"
          }}
        ></div>
      </div>
      <div style={{ color: "#d1d5db", marginTop: "5px", fontSize: "0.95rem" }}>
        ₹{current} / ₹{goal}
      </div>
    </div>
  );
}
