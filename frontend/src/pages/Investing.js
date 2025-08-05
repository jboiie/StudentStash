import React, { useContext } from "react";
import { ThemeContext } from "../App";

// Simple mock data for rankings
const stocks = [
  { symbol: "TCS", name: "Tata Consultancy Services", price: 3920, rating: "🌱 SIP", advice: "Great for SIP; stable returns." },
  { symbol: "INFY", name: "Infosys", price: 1805, rating: "👍 Buy", advice: "Buy on dips; strong fundamentals." },
  { symbol: "HDFCBANK", name: "HDFC Bank", price: 1670, rating: "🌱 SIP", advice: "Consistent compounding for the long-term." },
  { symbol: "RELIANCE", name: "Reliance Industries", price: 3055, rating: "🤔 Hold", advice: "Wait for dips to accumulate more." },
  { symbol: "MARUTI", name: "Maruti Suzuki", price: 12240, rating: "👍 Buy", advice: "Momentum play; good growth prospects." },
  { symbol: "IRFC", name: "Indian Railway Fin Corp", price: 126, rating: "🌱 SIP", advice: "Cheap, government-backed; SIP friendly." },
  { symbol: "ITC", name: "ITC Limited", price: 470, rating: "👍 Buy", advice: "Resilient dividend stock." },
  { symbol: "ZOMATO", name: "Zomato", price: 142, rating: "⚠️ Risky", advice: "Potential, but not for everyone. Small SIP only." }
];

export default function Investing() {
  const { theme } = useContext(ThemeContext);

  return (
    <div style={{
      maxWidth: 900,
      margin: "0 auto",
      padding: "40px 12px",
      color: theme.text
    }}>
      <h1 style={{
        color: theme.highlight,
        fontWeight: 900,
        fontSize: "2.2rem",
        letterSpacing: ".01em",
        marginBottom: 18
      }}>
        Investing <span role="img" aria-label="stocks">📈</span>
      </h1>
      <div style={{
        color: theme.muted,
        fontSize: "1.15rem",
        fontWeight: 500,
        marginBottom: 36
      }}>
        Simple, beginner-friendly stock rankings and suggestions—no jargon, just actionable ideas! <span role="img" aria-label="green shoot">🌱</span>
      </div>
      <div style={{
        display: "flex",
        flexDirection: "column",
        gap: "22px"
      }}>
        {stocks.map(item => (
          <div key={item.symbol}
            style={{
              background: theme.card,
              borderRadius: "14px",
              border: `1.5px solid ${theme.highlight}`,
              boxShadow: "0 1px 14px " + (theme.highlight || "#a78bfa") + "22",
              padding: "1.33rem 1.8rem",
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: 28
            }}>
            <div style={{
              minWidth: 65,
              color: theme.accent,
              fontSize: "1.36rem",
              fontWeight: 900,
              letterSpacing: ".01em"
            }}>{item.symbol}</div>
            <div style={{ flex: 1 }}>
              <div style={{
                color: theme.text,
                fontWeight: 700,
                fontSize: "1.09rem"
              }}>{item.name}</div>
              <div style={{
                color: theme.muted,
                fontSize: "1rem",
                margin: "0.2em 0 4px 0"
              }}>₹{item.price} per share</div>
              <div style={{
                fontSize: "1rem",
                fontWeight: 500,
                color: item.rating.includes("Risky")
                  ? "#e53e3e"
                  : item.rating.includes("Hold")
                    ? "#edb65e"
                    : item.rating.includes("SIP")
                      ? "#41fa8f"
                      : theme.highlight
              }}>
                <span style={{
                  fontWeight: 800,
                  marginRight: 7
                }}>{item.rating}</span>
                {item.advice}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div style={{
        color: theme.muted,
        fontSize: ".98rem",
        marginTop: 33,
        maxWidth: 720,
        background: theme.card,
        borderRadius: 12,
        padding: "1.22rem 1.5rem",
        border: `1px solid ${theme.border}`,
        marginLeft: "auto",
        marginRight: "auto"
      }}>
        <span style={{ fontWeight: 700, color: theme.accent }}>Disclaimer:</span> All rankings and suggestions here are for educational, demo purposes. For real investing, always study and start with small S.I.P. amounts!
      </div>
    </div>
  );
}
