import Navbar from "../components/Navbar";
import { useParams, useNavigate } from "react-router-dom";
import { challengeList } from "./Challenges";

export default function ChallengeDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const challenge = challengeList.find(c => c.id === id);

  if (!challenge)
    return (
      <div style={{ color: "white", textAlign: "center", padding: 60 }}>
        <Navbar />
        Challenge not found!
      </div>
    );

  return (
    <div style={{
      background: "#18162b",
      minHeight: "100vh",
      padding: "36px 0",
      color: "white",
      display: "flex",
      flexDirection: "column",
      alignItems: "center"
    }}>
      <Navbar />
      <button
        onClick={() => navigate(-1)}
        style={{
          marginBottom: 32,
          color: "#bdb9d0",
          background: "none",
          border: "none",
          cursor: "pointer",
          fontSize: "1.05rem",
          alignSelf: "flex-start"
        }}
      >
        ← Back to Challenges
      </button>
      <div style={{
        maxWidth: 520,
        width: "100%",
        background: "#202036",
        borderRadius: 22,
        padding: "2.6rem 2.2rem",
        boxShadow: "0 4px 24px #0002"
      }}>
        <h1 style={{
          fontSize: '2.05em',
          color: "#a78bfa",
          marginBottom: '11px',
          fontWeight: 700
        }}>
          {challenge.title}
        </h1>
        <p style={{ color: "#bdb9d0", marginBottom: "22px" }}>{challenge.desc}</p>
        <div style={{ marginBottom: "32px" }}>
          <strong>Type:</strong>{" "}
          <span style={{
            background: "#23214f",
            color: "#a78bfa",
            borderRadius: 7,
            padding: "2px 13px",
            fontWeight: 600,
            fontSize: ".93rem"
          }}>{challenge.type}</span>
        </div>
        <div style={{ marginBottom: "24px" }}>
          <strong>Progress:</strong>
          <div style={{
            height: 14,
            borderRadius: 8,
            marginTop: 5,
            background: "#23214f"
          }}>
            <div style={{
              width: challenge.progress + "%",
              height: "100%",
              borderRadius: 8,
              background: "linear-gradient(90deg, #a78bfa, #34d399)",
              transition: "width 0.5s"
            }} />
          </div>
          <div style={{ color: "#6ee7b7", marginTop: 5 }}>{challenge.progress}%</div>
        </div>
        <div style={{ marginBottom: "18px" }}>
          <strong>Points:</strong> {challenge.points}
        </div>
        {challenge.completed ? (
          <div style={{
            background: "#34d39944",
            color: "#22c55e",
            padding: "10px 20px",
            borderRadius: 12,
            textAlign: "center",
            fontWeight: 600
          }}>
            🎉 Completed!
          </div>
        ) : (
          <button style={{
            padding: ".75rem 2.5rem",
            background: "#a78bfa",
            color: "#23214f",
            fontWeight: 700,
            border: "none",
            borderRadius: "10px",
            marginTop: "20px",
            cursor: "pointer",
            fontSize: "1.1rem"
          }}>
            Start Challenge
          </button>
        )}
      </div>
    </div>
  );
}
