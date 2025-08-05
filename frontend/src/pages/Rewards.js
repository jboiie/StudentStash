import Navbar from "../components/Navbar";

const userPoints = 1450;

const ownedBadges = [
  { id: 1, title: "Streak Week", desc: "Saved 7 days in a row", icon: "🔥" },
  { id: 2, title: "Goal Smasher", desc: "Reached a saving goal", icon: "🏆" },
  { id: 3, title: "Quick Start", desc: "Saved first ₹100", icon: "⚡" },
  { id: 4, title: "Caffeine Saver", desc: "Skipped 3 coffees", icon: "☕" },
];

const nextBadges = [
  { id: 5, title: "Money Master", desc: "Save ₹5000 total", icon: "💰", need: "Save ₹5000" },
  { id: 6, title: "Streak Month", desc: "Save 30 days in a row", icon: "💫", need: "30-day streak" },
  { id: 7, title: "Scholar", desc: "Complete 5 Learn courses", icon: "📚", need: "5 courses" },
  { id: 8, title: "Saver Pro", desc: "Hit 10 savings goals", icon: "🥇", need: "10 goals" },
];

const rewards = [
  { id: 1, title: "Coffee Voucher", desc: "Campus café", points: 200, icon: "☕" },
  { id: 2, title: "Book Voucher", desc: "Book store ₹300", points: 300, icon: "📚" },
  { id: 3, title: "Spotify Premium", desc: "3mo. Premium", points: 800, icon: "🎵" },
  { id: 4, title: "Steam Credits", desc: "₹500 Steam", points: 1000, icon: "🎮" },
  { id: 5, title: "Movie Ticket", desc: "Any show", points: 500, icon: "🎬" },
  { id: 6, title: "Food Credit", desc: "₹200 delivery", points: 400, icon: "🍔" },
];

export default function Rewards() {
  return (
    <div
      className="fade-in-page"
      style={{
        background: "#18162b",
        minHeight: "100vh",
        color: "#fff",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "20px",
      }}
    >
      <Navbar />
      <div style={{ maxWidth: 730, width: "100%", margin: "0 auto", display: "flex", flexDirection: "column", alignItems: "center" }}>
        {/* Animated points */}
        <div style={{
          margin: "34px 0 38px 0",
          textAlign: "center",
          padding: "2.1rem 0 2.3rem",
          borderRadius: "24px",
          background: "linear-gradient(91deg, #a78bfa 60%, #34d399 100%)",
          boxShadow: "0 0 40px 3px #a78bfa33, 0 16px 40px #0004",
          color: "#1f193f",
          fontWeight: 700,
          fontSize: "2.18rem",
          animation: "glowpulse 2s infinite alternate",
          width: "96%",
          maxWidth: "480px",
          display: "flex", flexDirection: "column", alignItems: "center" }}
        >
          <div style={{ fontSize: "1.07rem", color: "#513ecb", fontWeight: 600, marginBottom: "7px", letterSpacing: "0.7px" }}>
            Your Total Points
          </div>
          <span style={{ fontSize: "2.35rem", color: "#fff", textShadow: "0 4px 24px #a78bfa96" }}>
            {userPoints} pts
          </span>
        </div>
        {/* Owned Badges */}
        <h2 style={{ color: "#a78bfa", marginTop: 8, marginBottom: 7, fontWeight: 600, fontSize: "1.09rem", textAlign: "center" }}>🎖️ Owned Badges</h2>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(4,1fr)",
          gap: "14px",
          width: "100%",
          justifyItems: "center",
          marginBottom: "20px"
        }}>
          {ownedBadges.map(badge => (
            <div key={badge.id} style={{
              background: "#23214f",
              borderRadius: "14px",
              boxShadow: "0 3px 10px #20203644",
              padding: "1rem 0.2rem",
              minWidth: 90,
              maxWidth: 115,
              width: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              fontWeight: 600,
            }}>
              <span style={{ fontSize: "2rem", marginBottom: "3px" }}>{badge.icon}</span>
              <span style={{ color: "#a78bfa", fontWeight: 600, fontSize: ".98rem", textAlign: "center" }}>{badge.title}</span>
              <span style={{ color: "#bdb9d0", fontWeight: 400, fontSize: ".8rem", textAlign: "center" }}>{badge.desc}</span>
            </div>
          ))}
        </div>
        {/* Unlockable Badges */}
        <h2 style={{ color: "#a78bfa", marginBottom: 7, fontWeight: 600, fontSize: "1.08rem", marginTop: "11px", textAlign: "center" }}>🔒 Next Badges to Unlock</h2>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(4,1fr)",
          gap: "14px",
          width: "100%",
          justifyItems: "center",
          marginBottom: "38px",
        }}>
          {nextBadges.map(badge => (
            <div key={badge.id} style={{
              background: "#202036",
              borderRadius: "14px",
              boxShadow: "0 3px 10px #20203622",
              padding: "1rem 0.2rem",
              minWidth: 90,
              maxWidth: 115,
              width: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              opacity: .43,
              filter: "grayscale(1)"
            }}>
              <span style={{ fontSize: "2rem", marginBottom: "3px", opacity: 0.7 }}>{badge.icon}</span>
              <span style={{ color: "#a78bfa", fontWeight: 600, fontSize: ".98rem", textAlign: "center" }}>{badge.title}</span>
              <span style={{ color: "#bdb9d0", fontWeight: 400, fontSize: ".8rem", textAlign: "center" }}>{badge.desc}</span>
              <span style={{ color: "#fde68a", fontWeight: 600, fontSize: ".87rem", marginTop: 3 }}>{badge.need}</span>
            </div>
          ))}
        </div>
        {/* Reward Store */}
        <h2 style={{
          color: "#a78bfa",
          margin: "20px 0 16px 0",
          fontWeight: 600,
          fontSize: "1.12rem",
          textAlign: "center"
        }}>🛒 Reward Store</h2>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(3,1fr)",
          gap: "20px",
          width: "100%",
          padding: "12px 0 52px 0",
          justifyItems: "center"
        }}>
          {rewards.map(({ id, title, desc, points, icon }) => (
            <div
              key={id}
              style={{
                background: "#202036",
                borderRadius: "14px",
                minWidth: 72,
                maxWidth: 130,
                width: "100%",
                boxShadow: "0 3px 10px rgba(0,0,0,0.12)",
                padding: "0.87rem 0.4rem 0.87rem 0.4rem",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                position: "relative",
                cursor: "pointer",
                transition: "all 0.21s cubic-bezier(.22,.61,.36,1)"
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = "scale(1.06)";
                e.currentTarget.style.boxShadow = "0 10px 24px rgba(52,43,199,0.13)";
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = "none";
                e.currentTarget.style.boxShadow = "0 3px 10px rgba(0,0,0,0.12)";
              }}
            >
              <div style={{
                fontSize: "1.48rem",
                marginBottom: 4,
                textShadow: "0 2px 8px #a78bfa1a"
              }}>{icon}</div>
              <div style={{
                fontWeight: 700,
                fontSize: ".95rem",
                color: "#a78bfa",
                marginBottom: 2,
                textAlign: "center"
              }}>
                {title}
              </div>
              <div style={{
                fontSize: ".86rem",
                color: "#bdb9d0",
                marginBottom: 3,
                textAlign: "center"
              }}>{desc}</div>
              <div style={{
                fontSize: ".89rem",
                color: "#6ee7b7",
                marginTop: 1
              }}>
                {points} pts
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Glow animation */}
      <style>{`
        @keyframes glowpulse {
          from { box-shadow: 0 0 40px 3px #a78bfa33, 0 16px 40px #0004; }
          to   { box-shadow: 0 0 68px 6px #a78bfa44, 0 22px 60px #34d39933; }
        }
        @media (max-width: 900px) {
          .fade-in-page > div > div[style*="grid-template-columns: repeat(4"] {
            grid-template-columns: repeat(2,1fr) !important;
          }
          .fade-in-page > div > div[style*="grid-template-columns: repeat(3"] {
            grid-template-columns: repeat(2,1fr) !important;
          }
        }
        @media (max-width: 600px) {
          .fade-in-page > div > div[style*="grid-template-columns: repeat(4"] {
            grid-template-columns: 1fr !important;
          }
          .fade-in-page > div > div[style*="grid-template-columns: repeat(3"] {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
