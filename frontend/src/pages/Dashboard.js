import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Card from "../components/Card";
import ProgressBar from "../components/ProgressBar";

export default function Dashboard({ user = "Student" }) {
  const [total, setTotal] = useState(0);
  const [amount, setAmount] = useState("");
  const [status, setStatus] = useState("");
  const [history, setHistory] = useState([]);
  const [goal, setGoal] = useState(1000);
  const [goalInput, setGoalInput] = useState("");
  const [streak, setStreak] = useState(7);
  const [growth, setGrowth] = useState(12);
  const navigate = useNavigate();

  useEffect(() => { loadData(); }, []);

  const loadData = async () => {
    const totalRes = await fetch("http://localhost:3001/api/total");
    const totalData = await totalRes.json();
    setTotal(totalData.total);

    const historyRes = await fetch("http://localhost:3001/api/history");
    const historyData = await historyRes.json();
    setHistory(historyData.history || []);

    const savedGoal = localStorage.getItem("goal");
    if (savedGoal) setGoal(parseFloat(savedGoal));
  };

  const handleSave = async () => {
    const value = parseFloat(amount);
    if (isNaN(value) || value <= 0) {
      setStatus("❌ Invalid amount");
      return;
    }
    await fetch("http://localhost:3001/api/save", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount: value }),
    });
    setAmount("");
    setStatus(`✅ Saved ₹${value}`);
    loadData();
  };

  const handleClear = async () => {
    if (!window.confirm("Clear all data?")) return;
    await fetch("http://localhost:3001/api/clear", { method: "POST" });
    setStatus("🧹 Cleared");
    loadData();
  };

  const handleDownloadCSV = () => {
    if (history.length === 0) {
      alert("Nothing to download");
      return;
    }
    let csv = "Amount,Date\n";
    history.forEach((entry) => {
      csv += `${entry.amount},${entry.time}\n`;
    });
    const blob = new Blob([csv], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "studentstash_history.csv";
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const handleSetGoal = () => {
    const value = parseFloat(goalInput);
    if (isNaN(value) || value <= 0) {
      setStatus("❌ Enter a valid goal");
      return;
    }
    setGoal(value);
    localStorage.setItem("goal", value);
    setGoalInput("");
    setStatus(`🎯 Goal set to ₹${value}`);
  };

  return (
    <div
      className="fade-in-page"
      style={{
        background: "#18162b",
        minHeight: "100vh",
        padding: "24px 0",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        fontFamily: "'Inter','Montserrat',Arial,sans-serif"
      }}
    >
      <div style={{ maxWidth: "900px", width: "100%" }}>
        {/* HEADER */}
        <div style={{ textAlign: "center", margin: "36px 0 16px" }}>
          <h1 style={{
            color: "#a78bfa",
            fontSize: "2.65rem",
            fontWeight: 800,
            marginBottom: "-4px",
            textShadow: "0 3px 20px #784ff044"
          }}>
            Welcome back, {user}! <span role="img" aria-label="grape">🍇</span>
          </h1>
          <p style={{ color: "#bdb9d0", fontSize: "1.15rem" }}>Keep building those saving habits!</p>
        </div>
        {/* STATS */}
        <div style={{
          display: "flex",
          justifyContent: "center",
          gap: "32px",
          margin: "40px 0",
          flexWrap: "wrap"
        }}>
          <Card label="Total Saved" value={`₹${total}`} highlight color="#6ee7b7" />
          <Card label="Daily Goal" value={`₹${goal}`} color="#a78bfa" />
          <Card label="Streak" value={<span style={{ color: "#fde68a" }}>{streak} days</span>} />
          <Card label="Growth" value={<span style={{ color: "#34d399" }}>+{growth}%</span>} />
        </div>
        {/* GOAL INPUT */}
        <div style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginBottom: "26px",
          gap: "10px"
        }}>
          <input
            type="number"
            placeholder="Set your goal (₹)"
            value={goalInput}
            onChange={(e) => setGoalInput(e.target.value)}
            style={{
              padding: "0.47rem",
              borderRadius: "8px",
              border: "none",
              outline: "none",
              width: "220px",
              marginRight: "4px",
              fontSize: "1.01rem",
              background: "#231e44",
              color: "#fff"
            }}
          />
          <button
            onClick={handleSetGoal}
            style={{
              ...quickBtnStyle, background: "#6366f1", color: "white", minWidth: "110px"
            }}
          >
            Set Goal
          </button>
        </div>
        {/* PROGRESS & ACTIONS */}
        <div style={{
          background: "#202036",
          borderRadius: "18px",
          padding: "2.1rem 2rem",
          marginBottom: "35px",
          color: "#fff",
          maxWidth: "100%",
          width: "100%",
        }}>
          <div style={{
            marginBottom: ".7rem",
            fontWeight: 600,
            fontSize: "1.17rem",
            textAlign: "center"
          }}>Today's Progress</div>
          <ProgressBar current={total} goal={goal} />
          <div style={{
            display: "flex",
            gap: "22px",
            marginTop: "18px",
            justifyContent: "center"
          }}>
            <button style={quickBtnStyle} onClick={() => setAmount("10")}>Add ₹10</button>
            <button style={quickBtnStyle} onClick={() => setAmount("20")}>Add ₹20</button>
            <input
              type="number"
              placeholder="Custom Amount"
              value={amount}
              onChange={e => setAmount(e.target.value)}
              style={{
                ...quickBtnStyle,
                width: 130,
                padding: "0.6rem",
                color: "#22223b",
                background: "#e0f2fe"
              }}
            />
            <button style={quickBtnStyle} onClick={handleSave}>Save</button>
          </div>
          {status && <p style={{ color: "#94a3b8", textAlign: "center" }}>{status}</p>}
        </div>
        
        {/* CHALLENGE & LEADERBOARD (THEMED VERSION) */}
        <div style={{
          display: "flex",
          gap: "32px",
          justifyContent: "center",
          marginBottom: "34px",
          flexWrap: "wrap"
        }}>
          {/* Daily Challenge Card - themed */}
          <div style={{
            background: "#202036",
            border: "2px solid #a78bfa",
            borderRadius: "17px",
            boxShadow: "0 2px 21px #a78bfa42",
            color: "#fff",
            minWidth: 300,
            flex: 1,
            display: "flex",
            flexDirection: "column",
            padding: "1.38rem 2.1rem 1.2rem 2.1rem",
            marginBottom: 12
          }}>
            <div style={{ fontWeight: 800, color: "#a78bfa", fontSize: "1.14rem", marginBottom: 11, letterSpacing: ".01em" }}>
              Daily Challenge <span role="img" aria-label="challenge">🎯</span>
            </div>
            <div style={{ color: "#bbeae3", fontWeight: 600, fontSize: "1.08rem", marginBottom: 4 }}>Save ₹25 and earn 50 points!</div>
            <button
              style={{
                background: "linear-gradient(90deg,#41e895,#a78bfa 120%)",
                color: "#18162b",
                fontWeight: 700,
                borderRadius: "13px",
                border: "none",
                fontSize: "1rem",
                padding: ".8rem 2.2rem",
                marginTop: 9,
                boxShadow: "0 2px 13px #a78bfa33",
                cursor: "pointer"
              }}
              onClick={() => navigate("/challenges")}
            >
              Start Challenge
            </button>
          </div>

          {/* Leaderboard Card - themed */}
          <div style={{
            background: "#202036",
            border: "2px solid #fed661",
            borderRadius: "17px",
            boxShadow: "0 2px 21px #fed66145",
            color: "#fff",
            minWidth: 300,
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "1.38rem 2.1rem 1.2rem 2.1rem",
            marginBottom: 12
          }}>
            <div style={{ fontWeight: 800, color: "#fed661", fontSize: "1.12rem", marginBottom: 13, letterSpacing: ".01em" }}>
              Leaderboard <span role="img" aria-label="leaderboard">🏆</span>
            </div>
            <div style={{
              fontWeight: 600, color: "#bbeae3", fontSize: "1.06rem",
              marginBottom: 6
            }}>You're rank #5 this week!</div>
            <button
              style={{
                background: "linear-gradient(90deg,#fed661,#a78bfa 85%)",
                color: "#232047",
                fontWeight: 700,
                borderRadius: "13px",
                border: "none",
                fontSize: "1rem",
                padding: ".8rem 2.2rem",
                marginTop: 7,
                boxShadow: "0 2px 13px #fed66145",
                cursor: "pointer"
              }}
              onClick={() => navigate("/leaderboard")}
            >
              View Rankings
            </button>
          </div>
        </div>

        {/* HISTORY */}
        <div style={{
          background: "#202036",
          borderRadius: "14px",
          padding: "1.5rem 2rem",
          color: "#fff",
          maxWidth: "100%",
          width: "100%",
          margin: "0 auto"
        }}>
          <h2 style={{ color: "#a78bfa", marginBottom: "16px" }}>📜 History</h2>
          {history.length === 0 ? (
            <p>No history yet.</p>
          ) : (
            <ul style={{ listStyle: "none", padding: 0 }}>
              {history.map((h, i) => (
                <li
                  key={i}
                  style={{
                    background: "#312e81",
                    padding: "0.55rem",
                    borderRadius: 7,
                    marginBottom: "0.62rem",
                  }}
                >
                  ₹{h.amount} on {new Date(h.time || h.date).toLocaleString()}
                </li>
              ))}
            </ul>
          )}
          <div style={{
            display: "flex",
            gap: "20px",
            marginTop: "16px",
            justifyContent: "center"
          }}>
            <button
              style={{ ...quickBtnStyle, background: "#ef4444", color: "white" }}
              onClick={handleClear}
            >
              Clear
            </button>
            <button
              style={{ ...quickBtnStyle, background: "#3b82f6", color: "white" }}
              onClick={handleDownloadCSV}
            >
              Download CSV
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

const quickBtnStyle = {
  background: "#34d399",
  color: "#22223b",
  fontWeight: 700,
  border: "none",
  borderRadius: "8px",
  padding: ".75rem 1.1rem",
  minWidth: "100px",
  cursor: "pointer",
  fontSize: "1rem",
  marginRight: "4px",
  transition: "0.12s all"
};
