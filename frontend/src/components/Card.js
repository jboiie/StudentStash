export default function Card({ label, value, highlight = false, color, children }) {
  return (
    <div
      style={{
        background: highlight ? "#29274A" : "#202036",
        borderRadius: "16px",
        padding: "1.1rem 1.4rem",
        minWidth: "180px",
        color: color || "#fff",
        boxShadow: highlight ? "0 0 10px #bbf" : "none",
        marginRight: "16px"
      }}
    >
      <div style={{ opacity: 0.8, marginBottom: "0.22rem" }}>{label}</div>
      <div style={{ fontWeight: 600, fontSize: "1.45rem" }}>
        {value}
        {children}
      </div>
    </div>
  );
}
