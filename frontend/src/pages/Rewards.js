import React, { useState, useEffect, useContext } from "react";
import { ThemeContext } from "../App";

const baseStore = [
  { id: 1, name: "Coffee Voucher", desc: "Free coffee at campus cafe", cost: 200, emoji: "☕" },
  { id: 2, name: "Movie Ticket", desc: "Cinema ticket for latest movies", cost: 500, emoji: "🎬" },
  { id: 3, name: "Book Voucher", desc: "₹100 book store credit", cost: 300, emoji: "📗" },
  { id: 4, name: "Food Delivery", desc: "₹200 food delivery credit", cost: 400, emoji: "🍔" },
  { id: 5, name: "Spotify Premium", desc: "3 months Spotify Premium", cost: 800, emoji: "🎵" },
  { id: 6, name: "Gaming Credits", desc: "₹500 Steam wallet credit", cost: 1000, emoji: "🎮" }
];
const extraStore = [
  { id: 7, name: "Fitness Class", desc: "1 free fitness class pass", cost: 250, emoji: "💪" },
  { id: 8, name: "Lunch Coupon", desc: "₹150 campus lunch coupon", cost: 300, emoji: "🍱" },
];

export default function Rewards({ user }) {
  const { theme } = useContext(ThemeContext);
  const [store, setStore] = useState(baseStore);
  const [points, setPoints] = useState(0);
  const [claimed, setClaimed] = useState([]);

  useEffect(() => {
    setPoints(parseInt(localStorage.getItem(`points_${user}`) || "0", 10));
    setClaimed(JSON.parse(localStorage.getItem(`claimed_rewards_${user}`) || "[]"));
    const more = JSON.parse(localStorage.getItem('demo_rewards_extra') || "false");
    setStore(more ? [...baseStore, ...extraStore] : baseStore);

    function onStorage(event) {
      if (!event || event.key === null || event.key === `points_${user}`) {
        setPoints(parseInt(localStorage.getItem(`points_${user}`) || "0", 10));
      }
      if (event && event.key === `claimed_rewards_${user}`) {
        setClaimed(JSON.parse(localStorage.getItem(`claimed_rewards_${user}`) || "[]"));
      }
      if (event && event.key === 'demo_rewards_extra') {
        setStore(JSON.parse(localStorage.getItem('demo_rewards_extra'))
          ? [...baseStore, ...extraStore]
          : baseStore
        );
      }
    }
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, [user]);

  function resetChallengesAndRewards() {
    if (!window.confirm("Reset all your challenges and rewards? This cannot be undone!")) return;
    localStorage.removeItem(`claimed_rewards_${user}`);
    localStorage.removeItem(`challenges_${user}`);
    localStorage.removeItem(`completed_challenges_${user}`);
    localStorage.removeItem(`challenge_progress_${user}`);
    localStorage.removeItem(`points_${user}`);
    localStorage.removeItem(`history_${user}`);
    setPoints(0);
    setClaimed([]);
    alert('Your challenges and rewards progress has been reset!');
    window.location.reload();
  }
  function refreshMoreRewardsAndChallenges() {
    localStorage.setItem('demo_rewards_extra', 'true');
    setStore([...baseStore, ...extraStore]);
    alert('More rewards and challenges have been added. (Simulated refresh)');
    window.location.reload();
  }
  function claimReward(item) {
    if (points < item.cost) return;
    if (claimed.some(r => r.rewardId === item.id && r.status === "available")) return;
    const updatedClaimed = [...claimed, { rewardId: item.id, status: "available" }];
    setClaimed(updatedClaimed);
    localStorage.setItem(`claimed_rewards_${user}`, JSON.stringify(updatedClaimed));
    const newPoints = points - item.cost;
    setPoints(newPoints);
    localStorage.setItem(`points_${user}`, newPoints);
    window.dispatchEvent(new Event("storage"));
  }
  function markRewardUsed(item) {
    const idx = claimed.findIndex(r => r.rewardId === item.rewardId && r.status === "available");
    if (idx === -1) return;
    const updated = [...claimed];
    updated[idx] = { ...updated[idx], status: "used" };
    setClaimed(updated);
    localStorage.setItem(`claimed_rewards_${user}`, JSON.stringify(updated));
  }

  const yourRewards = claimed
    .map(r => ({ ...store.find(s => s.id === r.rewardId), ...r }))
    .filter(item => item.name)
    .sort((a, b) => a.status === "available" ? -1 : 1);

  return (
    <div style={{
      maxWidth: 900, margin: "0 auto", padding: "38px 16px", color: theme.text
    }}>
      <h1 style={{
        color: theme.highlight, fontSize: "2rem", fontWeight: 800, letterSpacing: ".01em"
      }}>
        Rewards & Badges <span role="img" aria-label="badge">🏆</span>
      </h1>
      <div style={{ color: theme.muted, marginBottom: 28 }}>
        Redeem your points and showcase your achievements!
      </div>
      {/* CONTROL BUTTONS */}
      <div style={{ display: "flex", gap: 12, marginBottom: 24 }}>
        <button
          style={{
            background: theme.boomer ? "#b17a31" : "#e53e3e", // sepia or red
            color: "#fff",
            padding: "0.7rem 1.2rem",
            fontWeight: 700,
            border: "none",
            borderRadius: 8,
            cursor: "pointer"
          }}
          onClick={resetChallengesAndRewards}
        >
          Reset Challenges & Rewards
        </button>
        <button
          style={{
            background: theme.boomer
              ? "linear-gradient(90deg,#f5e8d6,#e7ddca 80%)"
              : "linear-gradient(90deg,#43e97b,#38f9d7 80%)",
            color: theme.boomer ? "#3c2c12" : "#18162b",
            padding: "0.7rem 1.2rem",
            fontWeight: 700,
            border: "none",
            borderRadius: 8,
            cursor: "pointer"
          }}
          onClick={refreshMoreRewardsAndChallenges}
        >
          Refresh with More Rewards & Challenges
        </button>
      </div>
      {/* POINTS DISPLAY */}
      <div style={{
        margin: "0 auto 35px",
        padding: "2rem 0 1.2rem",
        borderRadius: 18,
        background: theme.boomer
          ? `linear-gradient(90deg,${theme.highlight} 60%,${theme.accent} 120%)`
          : "linear-gradient(90deg,#a583fd 60%,#55eebc 120%)",
        boxShadow: theme.boomer
          ? `0 4px 24px ${theme.highlight}33`
          : "0 4px 24px #a78bfa44",
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
      }}>
        <div style={{
          fontSize: "2.1rem",
          color: theme.boomer ? "#7a6d52" : "#a78bfa",
          marginBottom: 9, fontWeight: 600
        }}>
          <span role="img" aria-label="trophy">🎯</span> Your Points
        </div>
        <div style={{
          fontSize: "3.1rem",
          color: theme.text,
          fontWeight: 900
        }}>
          {points}
        </div>
        <div style={{
          color: theme.boomer ? "#bba76b" : "#413888",
          fontWeight: 600,
          marginTop: 7
        }}>
          Keep saving to earn more!
        </div>
      </div>
      {/* YOUR REWARDS SECTION */}
      <div style={{ marginBottom: 36 }}>
        <div style={{
          fontWeight: 700, color: theme.highlight, fontSize: "1.09rem", marginBottom: 13
        }}>Your Rewards</div>
        {yourRewards.length === 0 ? (
          <div style={{ color: theme.muted, fontStyle: "italic", marginBottom: 18 }}>You haven't claimed any rewards yet.</div>
        ) : (
          <div style={{ display: "flex", gap: "18px", flexWrap: "wrap", marginBottom: 18 }}>
            {yourRewards.map(item => (
              <div key={item.rewardId}
                style={{
                  background: theme.card,
                  border: `1.8px solid ${theme.border}`,
                  borderRadius: 10,
                  padding: "1.15rem 1.27rem",
                  color: item.status === "used" ? theme.muted : theme.text,
                  minWidth: 200,
                  maxWidth: 250,
                  boxShadow: theme.boomer
                    ? "0 1px 12px #e7ddca21"
                    : "0 1px 12px #40ffbe21",
                  opacity: item.status === "used" ? 0.45 : 1,
                  marginBottom: 2
                }}>
                <div style={{
                  fontWeight: 700, fontSize: "1.08rem", color: item.status === "used" ? theme.muted : theme.highlight
                }}>{item.emoji} {item.name}</div>
                <div style={{
                  color: item.status === "used"
                    ? theme.muted
                    : (theme.boomer ? "#bba76b" : "#75dbbd"),
                  fontWeight: 500, marginBottom: 7
                }}>{item.desc}</div>
                <div style={{
                  color: item.status === "used"
                    ? theme.muted
                    : (theme.boomer ? "#7c734e" : "#53fca1"),
                  fontWeight: 700,
                  fontSize: ".99rem",
                  marginBottom: 5
                }}>{item.cost} pts</div>
                {item.status === "available" ? (
                  <button
                    style={{
                      padding: ".67rem 1.17rem",
                      borderRadius: "7px",
                      border: "none",
                      background:
                        theme.boomer
                          ? "linear-gradient(90deg,#e7ddca,#f5e8d6 80%)"
                          : "linear-gradient(90deg,#43e97b,#38f9d7 80%)",
                      color: theme.boomer ? "#232433" : "#232433",
                      fontWeight: 700,
                      fontSize: "1rem",
                      cursor: "pointer",
                      marginTop: 5
                    }}
                    onClick={() => markRewardUsed(item)}
                  >
                    Use
                  </button>
                ) : (
                  <span style={{
                    display: "inline-block",
                    marginTop: 10,
                    background: theme.boomer ? "#5a5036" : "#20223a",
                    padding: ".65rem 1.14rem",
                    borderRadius: 7,
                    color: theme.boomer ? "#b2aa9b" : "#b7bfd4",
                    fontWeight: 700,
                    fontSize: ".99rem"
                  }}>
                    Used
                  </span>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
      {/* Rewards Store */}
      <div>
        <div style={{
          fontWeight: 700,
          color: theme.highlight,
          fontSize: "1.01rem",
          marginBottom: 13
        }}>Rewards Store</div>
        <div style={{ display: "flex", gap: "18px", flexWrap: "wrap" }}>
          {store.map(item => (
            <div key={item.id} style={{
              background: theme.card,
              border: `1.7px solid ${theme.border}`,
              borderRadius: 10,
              padding: "1.11rem 1.29rem",
              color: theme.text,
              minWidth: 230,
              maxWidth: 260,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between"
            }}>
              <div style={{
                fontWeight: 700, fontSize: "1.08rem", marginBottom: 8, color: theme.highlight
              }}>{item.emoji} {item.name}</div>
              <div style={{
                color: theme.boomer ? "#aa936b" : "#75dbbd",
                fontWeight: 500, marginBottom: 7
              }}>{item.desc}</div>
              <div style={{
                color: theme.boomer ? "#bca256" : "#53fca1",
                fontWeight: 700, fontSize: ".99rem", margin: "5px 0"
              }}>{item.cost} pts</div>
              <button
                disabled={points < item.cost || claimed.some(r => r.rewardId === item.id && r.status === "available")}
                style={{
                  padding: ".69rem 1.21rem",
                  borderRadius: "8px",
                  border: "none",
                  background: points >= item.cost && !claimed.some(r => r.rewardId === item.id && r.status === "available")
                    ? theme.boomer
                      ? "linear-gradient(90deg,#e7ddca,#f5e8d6 80%)"
                      : "linear-gradient(90deg,#43e97b,#38f9d7 80%)"
                    : theme.boomer
                      ? "#222017"
                      : "#22243c",
                  color: points >= item.cost && !claimed.some(r => r.rewardId === item.id && r.status === "available")
                    ? theme.boomer ? "#523d21" : "#292a34"
                    : theme.boomer ? "#959260" : "#959ad0",
                  fontWeight: 700,
                  fontSize: "1rem",
                  cursor: points >= item.cost && !claimed.some(r => r.rewardId === item.id && r.status === "available")
                    ? "pointer"
                    : "not-allowed",
                  opacity: points >= item.cost && !claimed.some(r => r.rewardId === item.id && r.status === "available")
                    ? 1
                    : 0.6,
                  transition: "background 0.15s",
                  marginTop: 3
                }}
                onClick={() => claimReward(item)}
              >
                {claimed.some(r => r.rewardId === item.id && r.status === "available") ? "Claimed" : "Redeem"}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
