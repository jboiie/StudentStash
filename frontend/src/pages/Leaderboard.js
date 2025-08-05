import Navbar from "../components/Navbar";

// Dummy leaderboard data
const leaderboard = [
  { rank: 1, initials: "PS", name: "Priya Sharma", points: 2850, streak: 18, saved: "₹3200", growth: "+20%" },
  { rank: 2, initials: "RK", name: "Rahul Kumar", points: 2650, streak: 16, saved: "₹3200", growth: "+18%" },
  { rank: 3, initials: "AS", name: "Aaranya Singh", points: 2450, streak: 18, saved: "₹2400", growth: "+14%" },
  { rank: 4, initials: "AP", name: "Arjun Patel", points: 2200, streak: 14, saved: "₹2400", growth: "+12%" },
  { rank: 5, initials: "YU", name: "You", points: 1450, streak: 7, saved: "₹1200", growth: "+22%", you: true },
  { rank: 6, initials: "KR", name: "Kavya Reddy", points: 1380, streak: 8, saved: "₹1000", growth: "+10%" },
  { rank: 7, initials: "VJ", name: "Vikram Joshi", points: 1250, streak: 5, saved: "₹930", growth: "+9%" },
  { rank: 8, initials: "SG", name: "Sneha Gupta", points: 1180, streak: 6, saved: "₹900", growth: "+7%" },
];

export default function Leaderboard() {
  return (
    <div
      className="fade-in-page"
      style={{
        background: "#18162b",
        minHeight: "100vh",
        color: "white",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        paddingBottom: 40,
      }}
    >
      <Navbar />
      <div style={{ maxWidth: 700, width: "100%", margin: "0 auto" }}>
        <h1 style={{
          color: "#a78bfa", fontWeight: 700, fontSize: "2.1rem", textAlign: "center", marginTop: 20
        }}>
          Leaderboard <span role="img" aria-label="trophy">🏆</span>
        </h1>
        <p style={{ color: "#bdb9d0", textAlign: "center", marginBottom: 28, marginTop: "-10px" }}>
          See how you stack up against other savers!
        </p>

        {/* Stat cards row */}
        <div style={{
          display: "flex", justifyContent: "center", gap: "32px", margin: "32px 0", flexWrap: "wrap"
        }}>
          <div style={statCardStyle}><div>🏅</div>
            <div style={{ fontWeight: 700, fontSize: 24 }}>5th</div>
            <div style={{ color: "#bdb9d0", marginTop: "-6px", fontSize: 14 }}>Your Rank</div>
          </div>
          <div style={statCardStyle}><div>📈</div>
            <div style={{ fontWeight: 700, fontSize: 24 }}>+22%</div>
            <div style={{ color: "#bdb9d0", marginTop: "-6px", fontSize: 14 }}>This Week</div>
          </div>
          <div style={statCardStyle}><div>🌟</div>
            <div style={{ fontWeight: 700, fontSize: 24 }}>1450</div>
            <div style={{ color: "#bdb9d0", marginTop: "-6px", fontSize: 14 }}>Your Points</div>
          </div>
        </div>

        {/* Top savers highlight (Gradient) */}
        <div style={{
          background: "linear-gradient(92deg, #a78bfa, #34d399)",
          borderRadius: 20,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "30px 0 24px",
          marginBottom: "36px",
        }}>
          {/* Center medalist bigger */}
          <div style={{ textAlign: "center", margin: "0 32px", flex: 1 }}>
            <div style={{
              margin: "0 auto 8px",
              background: "#18162b",
              width: 62, height: 62, borderRadius: "50%",
              color: "#a78bfa", fontWeight: 700, fontSize: 26,
              display: "flex", alignItems: "center", justifyContent: "center", border: "2.5px solid #fde68a"
            }}>PS</div>
            <div style={{ fontWeight: 700 }}>Priya Sharma</div>
            <div style={{ color: "#fde68a", fontWeight: 600, fontSize: 14 }}>2850 pts</div>
            <div style={{ color: "#fde68a", fontWeight: 600, fontSize: 12, marginTop: 1 }}>🥇 Top Saver</div>
          </div>
          {/* Left and right */}
          <div style={{ textAlign: "center", margin: "0 16px", flex: 1 }}>
            <div style={{
              margin: "0 auto 8px",
              background: "#18162b",
              width: 44, height: 44, borderRadius: "50%",
              color: "#bdb9d0", fontWeight: 700, fontSize: 19.5,
              display: "flex", alignItems: "center", justifyContent: "center", border: "2px solid #c5baff"
            }}>RK</div>
            <div style={{ fontWeight: 700, fontSize: 15 }}>Rahul Kumar</div>
            <div style={{ color: "#c5baff", fontWeight: 600, fontSize: 12 }}>2650 pts</div>
          </div>
          <div style={{ textAlign: "center", margin: "0 16px", flex: 1 }}>
            <div style={{
              margin: "0 auto 8px",
              background: "#18162b",
              width: 44, height: 44, borderRadius: "50%",
              color: "#bdb9d0", fontWeight: 700, fontSize: 19.5,
              display: "flex", alignItems: "center", justifyContent: "center", border: "2px solid #a78bfa"
            }}>AS</div>
            <div style={{ fontWeight: 700, fontSize: 15 }}>Aaranya Singh</div>
            <div style={{ color: "#a78bfa", fontWeight: 600, fontSize: 12 }}>2450 pts</div>
          </div>
        </div>

        {/* Rankings List */}
        <div style={{
          background: "#202036",
          borderRadius: 18,
          padding: "1rem 1.3rem",
          maxWidth: 700,
        }}>
          <div style={{
            color: "#a78bfa",
            fontWeight: 600,
            fontSize: 18,
            margin: "0 0 18px"
          }}>
            Full Rankings
          </div>
          <div>
            {
              leaderboard.map((entry, i) => (
                <div key={entry.rank} style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  border: entry.you ? "2px solid #a78bfa" : "1px solid #23214f",
                  background: entry.you ? "#a78bfa12" : "none",
                  borderRadius: 7,
                  padding: "10px 16px",
                  marginBottom: 9,
                  fontWeight: entry.you ? 700 : 500,
                  color: entry.you ? "#a78bfa" : "#fff"
                }}>
                  <span>
                    <span style={{
                      background: entry.you ? "#a78bfa" : "#23214f",
                      color: entry.you ? "#23214f" : "#bdb9d0",
                      fontWeight: 700,
                      fontSize: 15,
                      borderRadius: "4px",
                      padding: "3px 8px",
                      marginRight: "13px"
                    }}>{entry.initials}</span>
                    {entry.name}
                    <span style={{
                      marginLeft: 13, color: "#fff", fontWeight: 400, fontSize: 13
                    }}>| {entry.streak}d streak | {entry.saved}</span>
                  </span>
                  <span style={{ color: "#6ee7b7", fontWeight: 700 }}>{entry.points}</span>
                </div>
              ))
            }
          </div>
        </div>
      </div>
    </div>
  );
}

// For the stat cards at the top
const statCardStyle = {
  background: "#202036",
  borderRadius: "14px",
  padding: "18px 34px 13px 34px",
  width: 135,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  fontSize: 16,
  color: "#fff"
};
