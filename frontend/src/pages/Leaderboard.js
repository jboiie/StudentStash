import React, { useEffect, useState } from "react";

const DEMO_RANKINGS = [
  {
    initials: "PS",
    name: "Priya Sharma",
    points: 2850,
    streak: 15,
    saved: 3200,
    growth: 12,
  },
  {
    initials: "RK",
    name: "Rahul Kumar",
    points: 2650,
    streak: 12,
    saved: 2900,
    growth: 8,
  },
  {
    initials: "AS",
    name: "Ananya Singh",
    points: 2450,
    streak: 18,
    saved: 2750,
    growth: 15,
  },
  {
    initials: "AP",
    name: "Arjun Patel",
    points: 2200,
    streak: 9,
    saved: 2400,
    growth: 5,
  },
  {
    initials: "KR",
    name: "Kavya Reddy",
    points: 1380,
    streak: 6,
    saved: 1180,
    growth: 3,
  },
  {
    initials: "VJ",
    name: "Vikram Joshi",
    points: 1250,
    streak: 7,
    saved: 1050,
    growth: 16,
  },
  {
    initials: "SG",
    name: "Sneha Gupta",
    points: 1180,
    streak: 8,
    saved: 980,
    growth: 7,
  },
];

function getUserRow(userPoints) {
  return {
    initials: "YOU",
    name: "You",
    points: userPoints,
    streak: 7,
    saved: 1250,
    growth: 22,
    isYou: true,
  };
}

export default function Leaderboard({ user }) {
  const [entries, setEntries] = useState([]);
  const [yourRank, setYourRank] = useState(5);
  const [yourGrowth, setYourGrowth] = useState(22);
  const [yourPoints, setYourPoints] = useState(0);

  // Update leaderboard from storage for the current user
  function updateLeaderboardFromStorage() {
    const userPoints = parseInt(localStorage.getItem(`points_${user}`) || "0", 10);
    setYourPoints(userPoints);
    const allEntries = [
      ...DEMO_RANKINGS.slice(0, 4),
      getUserRow(userPoints),
      ...DEMO_RANKINGS.slice(4),
    ].sort((a, b) => b.points - a.points);
    const yourPos = allEntries.findIndex((entry) => entry.isYou);
    setYourRank(yourPos + 1);
    setYourGrowth(allEntries[yourPos]?.growth || 0);
    setEntries(allEntries);
  }

  useEffect(() => {
    updateLeaderboardFromStorage();
    function onStorage(event) {
      if (
        !event ||
        event.key === null ||
        event.key === `points_${user}`
      ) {
        updateLeaderboardFromStorage();
      }
    }
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, [user]);

  // Top savers (uses top 3 after sorting)
  const topSavers = entries.slice(0, 3);

  return (
    <div style={{ maxWidth: 1000, margin: "36px auto 0 auto", color: "#fff" }}>
      <h1 style={{
        color: "#b688f7", fontSize: "2rem", fontWeight: 800,
        letterSpacing: ".01em", marginBottom: 6,
      }}>
        Leaderboard <span role="img" aria-label="trophy">🏆</span>
      </h1>
      <div style={{ color: "#b6b6db", marginBottom: 26, fontWeight: 500, fontSize: "1.13rem" }}>
        See how you stack up against other savers!
      </div>

      {/* Rank & stats cards at the top */}
      <div style={{
        display: "flex", gap: 28, marginBottom: 38, flexWrap: "wrap",
        alignItems: "center"
      }}>
        <div style={{
          background: "#18162b",
          borderRadius: "13px",
          padding: "1.2rem 2.1rem",
          color: "#fed661",
          fontWeight: 700,
          fontSize: "1.35rem",
          minWidth: 130,
          textAlign: "center",
          flex: "0 0 190px",
        }}>
          <div style={{ fontSize: "1rem", color: "#fff", fontWeight: 500 }}>Your Rank</div>
          <div style={{ fontSize: "2.1rem" }}>{yourRank}{["st", "nd", "rd"][yourRank - 1] || "th"}</div>
        </div>
        <div style={{
          background: "#18162b",
          borderRadius: "13px",
          padding: "1.2rem 2.1rem",
          color: "#53fca1",
          fontWeight: 700,
          fontSize: "1.35rem",
          minWidth: 130,
          textAlign: "center",
          flex: "0 0 190px",
        }}>
          <div style={{ fontSize: "1rem", color: "#fff", fontWeight: 500 }}>This Week</div>
          <div style={{ fontSize: "2.1rem" }}>+{yourGrowth}%</div>
        </div>
        <div style={{
          background: "#18162b",
          borderRadius: "13px",
          padding: "1.2rem 2.1rem",
          color: "#fff",
          fontWeight: 700,
          fontSize: "1.35rem",
          minWidth: 130,
          textAlign: "center",
          flex: "0 0 190px",
        }}>
          <div style={{ fontSize: "1rem", color: "#fff", fontWeight: 500 }}>Your Points</div>
          <div style={{ fontSize: "2.1rem", color: "#fed661" }}>{yourPoints}</div>
        </div>
      </div>

      {/* Top savers */}
      <div style={{
        background: "linear-gradient(99deg,#b58aff,#3bf8b4,#fce781 120%)",
        borderRadius: 20,
        marginBottom: 40,
        padding: "2.2rem 1.5rem 2.5rem",
        boxShadow: "0 2px 24px #a7fdfa30",
        maxWidth: 750,
        marginLeft: "auto",
        marginRight: "auto"
      }}>
        <div style={{ textAlign: "center", fontWeight: 700, fontSize: "1.1rem", color: "#fff", marginBottom: 22 }}>
          <span role="img" aria-label="cup">🏅</span> Top Savers
        </div>
        <div style={{
          display: "flex", gap: "32px", justifyContent: "center", alignItems: "end"
        }}>
          {/* 2nd Place */}
          {topSavers[1] && (
            <div style={{
              background: "#00000034",
              padding: "2.1rem 1.5rem 1.7rem",
              borderRadius: 14,
              minWidth: 115,
              textAlign: "center",
              boxShadow: "0 2px 15px #bbffee55",
              opacity: 0.8
            }}>
              <div style={{
                width: 44, height: 44, background: "#23204f", borderRadius: 22,
                color: "#fed661", fontWeight: 700, fontSize: "1.4rem", margin: "0 auto 7px", display: "flex",
                alignItems: "center", justifyContent: "center"
              }}>{topSavers[1].initials}</div>
              <div style={{ color: "#fff", fontWeight: 700 }}>{topSavers[1].name}</div>
              <div style={{ color: "#e3fff9", fontSize: ".97rem", marginBottom: 4 }}>{topSavers[1].points} pts</div>
            </div>
          )}
          {/* 1st Place (center) */}
          {topSavers[0] && (
            <div style={{
              background: "#fff2",
              padding: "2.6rem 2.2rem 1.7rem",
              borderRadius: 20,
              minWidth: 145,
              textAlign: "center",
              marginTop: -50,
              border: "3.8px solid #fed661",
              boxShadow: "0 2px 16px #fed66133"
            }}>
              <div style={{
                width: 62, height: 62, background: "#23204f", borderRadius: 31,
                color: "#fed661", fontWeight: 800, fontSize: "2rem", margin: "0 auto 9px", display: "flex",
                alignItems: "center", justifyContent: "center"
              }}>{topSavers[0].initials}</div>
              <div style={{ color: "#fff", fontWeight: 700, fontSize: "1.1rem" }}>{topSavers[0].name}</div>
              <div style={{ color: "#fffbe1", fontSize: "1.15rem", marginBottom: 4 }}>{topSavers[0].points} pts</div>
            </div>
          )}
          {/* 3rd Place */}
          {topSavers[2] && (
            <div style={{
              background: "#00000034",
              padding: "2.1rem 1.5rem 1.7rem",
              borderRadius: 14,
              minWidth: 115,
              textAlign: "center",
              boxShadow: "0 2px 13px #abf24d44",
              opacity: 0.8
            }}>
              <div style={{
                width: 44, height: 44, background: "#23204f", borderRadius: 22,
                color: "#fed661", fontWeight: 700, fontSize: "1.4rem", margin: "0 auto 7px", display: "flex",
                alignItems: "center", justifyContent: "center"
              }}>{topSavers[2].initials}</div>
              <div style={{ color: "#fff", fontWeight: 700 }}>{topSavers[2].name}</div>
              <div style={{ color: "#e3fff9", fontSize: ".97rem", marginBottom: 4 }}>{topSavers[2].points} pts</div>
            </div>
          )}
        </div>
      </div>

      {/* Full rankings table/list */}
      <div>
        <div style={{
          color: "#fff", fontWeight: 700, marginBottom: 18, fontSize: "1.14rem"
        }}>
          Full Rankings
        </div>
        <div>
          {entries.map((entry, idx) => (
            <div
              key={entry.name}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                background: entry.isYou
                  ? "linear-gradient(90deg,rgba(80,255,210,0.07),rgba(186,85,247,0.15))"
                  : "#231d36d4",
                boxShadow: entry.isYou
                  ? "0 0 4px 1.5px #4ffdbe44"
                  : "0 0 1.5px #331f5c33",
                border: entry.isYou
                  ? "2px solid #43e97b99"
                  : "2px solid #2c2645",
                borderRadius: 11,
                marginBottom: 13,
                padding: "0.78rem 1.2rem",
                color: "#fff",
                fontWeight: entry.isYou ? 700 : 500,
                position: "relative"
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 19 }}>
                <div style={{
                  width: 40, height: 40, background: "#291a44", borderRadius: 20,
                  color: "#fed661", fontWeight: 700, fontSize: "1.1rem", display: "flex",
                  alignItems: "center", justifyContent: "center"
                }}>
                  {entry.initials}
                </div>
                <div>
                  <div style={{ fontWeight: entry.isYou ? 800 : 700, fontSize: "1rem", color: entry.isYou ? "#aeeeeb" : "#fff" }}>
                    <span style={{ marginRight: 5 }}>
                      {idx === 0 && <span role="img" aria-label="first">🏆</span>}
                      {idx === 1 && <span role="img" aria-label="second">🥈</span>}
                      {idx === 2 && <span role="img" aria-label="third">🥉</span>}
                    </span>
                    {entry.name}
                    {entry.isYou && (
                      <span style={{
                        background: "#ff5edd",
                        color: "#1d1731",
                        borderRadius: "8px",
                        fontWeight: 700,
                        fontSize: ".93rem",
                        marginLeft: 10,
                        padding: "1px 8px"
                      }}>
                        YOU
                      </span>
                    )}
                  </div>
                  <div style={{ color: "#b7ffe4", fontSize: ".97rem" }}>
                    {entry.streak} day streak · ₹{entry.saved} saved
                  </div>
                </div>
              </div>
              {/* Points and growth */}
              <div style={{
                minWidth: 110,
                textAlign: "right"
              }}>
                <span style={{
                  fontWeight: 800,
                  fontSize: "1.25rem",
                  color: entry.isYou ? "#fffc8b" : "#caffc1",
                  letterSpacing: ".01em",
                  marginRight: 10
                }}>{entry.points}</span>
                <span style={{
                  color: entry.growth > 0 ? "#53fca1" : "#ffceab",
                  fontWeight: 700,
                  fontSize: "1rem"
                }}>
                  {entry.growth > 0 ? "+" : ""}{entry.growth}%
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
