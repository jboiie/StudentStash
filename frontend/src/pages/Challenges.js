import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

export const challengeList = [
  {
    id: "morning-saver",
    title: "Morning Saver",
    desc: "Save ₹10 before 10 AM",
    type: "Daily",
    progress: 100,
    points: 25,
    completed: true,
  },
  {
    id: "lunch-money-challenge",
    title: "Lunch Money Challenge",
    desc: "Save ₹30 instead of buying lunch.",
    type: "Daily",
    progress: 0,
    points: 100,
    completed: false,
  },
  {
    id: "week-warrior",
    title: "Week Warrior",
    desc: "Save every day for 7 days straight.",
    type: "Weekly",
    progress: 71,
    points: 500,
    completed: false,
  },
  {
    id: "coffee-shop-skip",
    title: "Coffee Shop Skip",
    desc: "Skip expensive coffee 5 times this week.",
    type: "Weekly",
    progress: 67,
    points: 150,
    completed: false,
  },
  {
    id: "monthly-marathon",
    title: "Monthly Marathon",
    desc: "Save ₹1000 this month.",
    type: "Monthly",
    progress: 35,
    points: 1000,
    completed: false,
  },
];

export default function Challenges() {
  const navigate = useNavigate();

  return (
    <div
      className="fade-in-page"
      style={{
        background: "#18162b",
        minHeight: "100vh",
        padding: "36px 0",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Navbar />
      <div style={{
        maxWidth: 680,
        width: "100%",
        margin: "0 auto"
      }}>
        <div style={{ marginBottom: 28 }}>
          <h1 style={{
            color: "#a78bfa",
            fontWeight: 700,
            fontSize: "2.1rem",
            textAlign: "center"
          }}>
            Savings Challenges <span role="img" aria-label="grape">🍇</span>
          </h1>
          <p style={{ color: "#bdb9d0", textAlign: "center" }}>
            Complete challenges to earn points and build habits!
          </p>
        </div>
        <div style={{
          display: "flex", gap: "13px", justifyContent: "center", marginBottom: "18px"
        }}>
          {["All Challenges", "Daily", "Weekly", "Monthly"].map(f => (
            <span key={f}
              style={{
                background: f === "All Challenges" ? "#513ecb" : "#23214f",
                color: "#eee",
                borderRadius: 12,
                fontWeight: 600,
                padding: "6px 19px",
                cursor: "pointer",
                fontSize: "0.96rem"
              }}>{f}</span>
          ))}
        </div>
        {challengeList.map(challenge => (
          <div
            key={challenge.id}
            style={{
              margin: "19px 0",
              background: "#202036",
              borderRadius: "15px",
              boxShadow: "0 2px 14px #16151a22",
              border: challenge.completed ? "2px solid #34d399" : "1.5px solid #23214f",
              cursor: "pointer",
              padding: "1.2rem 1.7rem",
              transition: "box-shadow .15s",
              position: "relative",
            }}
            onClick={() => navigate(`/challenges/${challenge.id}`)}
          >
            <div style={{
              display: "flex", alignItems: "center", marginBottom: 7
            }}>
              <span style={{
                fontWeight: 700, fontSize: "1.17rem", color: "#fff"
              }}>{challenge.title}</span>
              <span style={{
                marginLeft: "auto",
                background: "#23214f",
                color: "#a78bfa",
                borderRadius: 7,
                fontSize: ".93rem",
                padding: "2px 15px",
                fontWeight: 600
              }}>{challenge.type}</span>
            </div>
            <div style={{ color: "#cfccf7", marginBottom: 15, fontSize: ".99rem" }}>
              {challenge.desc}
            </div>
            <div style={{ marginBottom: 9 }}>
              <span style={{ fontSize: ".95rem", color: "#bdb9d0" }}>Progress</span>
              <div style={{
                height: 12, borderRadius: 8, margin: "4px 0", background: "#2d2957"
              }}>
                <div style={{
                  width: `${challenge.progress}%`,
                  height: "100%",
                  borderRadius: 8,
                  background: challenge.completed
                    ? "#34d399"
                    : "linear-gradient(90deg, #a78bfa, #34d399)",
                  transition: "width 0.5s"
                }} />
              </div>
            </div>
            <div style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between"
            }}>
              <span style={{
                color: "#6ee7b7", fontWeight: 700, fontSize: ".98rem"
              }}>
                {challenge.points} pts {challenge.completed ? "✓ Completed" : ""}
              </span>
              {challenge.completed ? (
                <div style={{
                  background: "#34d39911",
                  color: "#22c55e",
                  padding: "8px 18px",
                  borderRadius: 8,
                  fontWeight: "bold"
                }}>Completed!</div>
              ) : (
                <button style={{
                  padding: ".48rem 1.6rem",
                  background: "#a78bfa",
                  color: "#23214f",
                  fontWeight: 700,
                  border: "none",
                  borderRadius: "7px",
                  cursor: "pointer",
                  fontSize: "1rem"
                }}>
                  Start Challenge
                </button>
              )}
            </div>
            <span style={{
              position: "absolute", top: 0, left: 0, right: 0, bottom: 0, zIndex: 1
            }} />
          </div>
        ))}
        <div style={{
          margin: "32px auto 0",
          background: "linear-gradient(95deg, #a78bfa, #34d399)",
          borderRadius: "16px",
          padding: "2.1rem 0",
          color: "#fff",
          width: "100%",
          textAlign: "center",
        }}>
          <div style={{ fontWeight: 700, fontSize: "1.18rem", marginBottom: 8 }}>
            Create Your Own Challenge
          </div>
          <div style={{ opacity: 0.86, marginBottom: "13px", fontSize: ".99rem" }}>
            Set a personal savings goal and timeline
          </div>
          <button style={{
            background: "#23214f",
            color: "#a78bfa",
            fontWeight: 700,
            border: "none",
            borderRadius: "7px",
            padding: ".6rem 2.3rem",
            fontSize: "1rem"
          }}>
            Create Challenge
          </button>
        </div>
      </div>
    </div>
  );
}
