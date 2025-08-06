import React, { useContext, useState } from "react";
import { ThemeContext } from "../App";

// === All mutual funds (add/update as needed) ===
const mutualFunds = [
  // Large Cap
  { name: "ICICI Prudential Bluechip", type: "Large Cap", aum: "₹39,146 Cr", returns: { "1Y": 23.1, "3Y": 16.2, "5Y": 16.3 }, min: 100, risk: "Low", rating: "🏅 Safe", amc: "ICICI Prudential MF" },
  { name: "Mirae Asset Large Cap", type: "Large Cap", aum: "₹41,240 Cr", returns: { "1Y": 22.5, "3Y": 15.4, "5Y": 15.6 }, min: 100, risk: "Low", rating: "🏅 Safe", amc: "Mirae Asset MF" },
  { name: "Nippon India Large Cap", type: "Large Cap", aum: "₹18,245 Cr", returns: { "1Y": 22.3, "3Y": 14.3, "5Y": 15.2 }, min: 100, risk: "Low", rating: "🌱 SIP", amc: "Nippon India MF" },
  { name: "SBI Bluechip", type: "Large Cap", aum: "₹36,153 Cr", returns: { "1Y": 24.0, "3Y": 14.0, "5Y": 14.8 }, min: 500, risk: "Low", rating: "🏅 Safe", amc: "SBI MF" },
  { name: "Kotak Bluechip", type: "Large Cap", aum: "₹7,350 Cr", returns: { "1Y": 22.6, "3Y": 13.5, "5Y": 14.4 }, min: 100, risk: "Low", rating: "🌱 SIP", amc: "Kotak MF" },
  { name: "HDFC Top 100", type: "Large Cap", aum: "₹20,111 Cr", returns: { "1Y": 20.1, "3Y": 12.7, "5Y": 13.9 }, min: 100, risk: "Low", rating: "👍 Buy", amc: "HDFC MF" },

  // Multi Cap (6)
  { name: "Quant Active Multi Cap", type: "Multi Cap", aum: "₹4,782 Cr", returns: { "1Y": 44.1, "3Y": 28.5, "5Y": 26.8 }, min: 500, risk: "High", rating: "🚀 Momentum", amc: "Quant MF" },
  { name: "Nippon India Multi Cap", type: "Multi Cap", aum: "₹8,236 Cr", returns: { "1Y": 49.2, "3Y": 21.3, "5Y": 19.4 }, min: 100, risk: "High", rating: "✨ Growth", amc: "Nippon India MF" },
  { name: "ICICI Prudential Multi Cap", type: "Multi Cap", aum: "₹8,136 Cr", returns: { "1Y": 40.2, "3Y": 23.0, "5Y": 20.6 }, min: 100, risk: "High", rating: "🚀 Momentum", amc: "ICICI Prudential MF" },
  { name: "Motilal Oswal Multi Cap", type: "Multi Cap", aum: "₹2,584 Cr", returns: { "1Y": 39.9, "3Y": 20.6, "5Y": 19.0 }, min: 500, risk: "High", rating: "✨ Growth", amc: "Motilal Oswal MF" },
  { name: "Axis Multi Cap", type: "Multi Cap", aum: "₹1,789 Cr", returns: { "1Y": 35.7, "3Y": 19.8, "5Y": 17.2 }, min: 100, risk: "High", rating: "🌱 SIP", amc: "Axis MF" },
  { name: "HDFC Multi Cap", type: "Multi Cap", aum: "₹10,431 Cr", returns: { "1Y": 34.3, "3Y": 18.9, "5Y": 16.5 }, min: 100, risk: "High", rating: "🌱 SIP", amc: "HDFC MF" },

  // Flexi Cap
  { name: "Parag Parikh Flexi Cap", type: "Flexi Cap", aum: "₹56,564 Cr", returns: { "1Y": 34.6, "3Y": 19.6, "5Y": 21.5 }, min: 500, risk: "Moderate", rating: "🌱 SIP", amc: "Parag Parikh MF" },
  { name: "HDFC Flexi Cap", type: "Flexi Cap", aum: "₹39,200 Cr", returns: { "1Y": 32.4, "3Y": 17.0, "5Y": 16.7 }, min: 100, risk: "Moderate", rating: "🌱 SIP", amc: "HDFC MF" },
  { name: "UTI Flexi Cap", type: "Flexi Cap", aum: "₹29,338 Cr", returns: { "1Y": 31.2, "3Y": 17.2, "5Y": 16.3 }, min: 500, risk: "Moderate", rating: "👍 Buy", amc: "UTI MF" },
  { name: "Kotak Flexi Cap", type: "Flexi Cap", aum: "₹26,212 Cr", returns: { "1Y": 30.9, "3Y": 16.1, "5Y": 15.9 }, min: 100, risk: "Moderate", rating: "🌱 SIP", amc: "Kotak MF" },
  { name: "DSP Flexi Cap", type: "Flexi Cap", aum: "₹10,821 Cr", returns: { "1Y": 30.8, "3Y": 16.4, "5Y": 15.2 }, min: 100, risk: "Moderate", rating: "🌱 SIP", amc: "DSP MF" },
  { name: "SBI Flexi Cap", type: "Flexi Cap", aum: "₹5,640 Cr", returns: { "1Y": 29.7, "3Y": 15.2, "5Y": 14.8 }, min: 500, risk: "Moderate", rating: "👍 Buy", amc: "SBI MF" },

  // Small Cap (6)
  { name: "Nippon India Small Cap", type: "Small Cap", aum: "₹48,721 Cr", returns: { "1Y": 52.3, "3Y": 30.8, "5Y": 27.7 }, min: 100, risk: "High", rating: "✨ Growth", amc: "Nippon India MF" },
  { name: "Quant Small Cap", type: "Small Cap", aum: "₹4,980 Cr", returns: { "1Y": 68.1, "3Y": 38.4, "5Y": 32.9 }, min: 500, risk: "High", rating: "⚠️ Risky", amc: "Quant MF" },
  { name: "SBI Small Cap", type: "Small Cap", aum: "₹18,443 Cr", returns: { "1Y": 50.6, "3Y": 29.6, "5Y": 25.4 }, min: 500, risk: "High", rating: "🌱 SIP", amc: "SBI MF" },
  { name: "Kotak Small Cap", type: "Small Cap", aum: "₹7,623 Cr", returns: { "1Y": 51.3, "3Y": 25.1, "5Y": 24.2 }, min: 100, risk: "High", rating: "🌱 SIP", amc: "Kotak MF" },
  { name: "HDFC Small Cap", type: "Small Cap", aum: "₹18,169 Cr", returns: { "1Y": 53.4, "3Y": 29.9, "5Y": 23.7 }, min: 100, risk: "High", rating: "🌱 SIP", amc: "HDFC MF" },
  { name: "Axis Small Cap", type: "Small Cap", aum: "₹10,062 Cr", returns: { "1Y": 47.6, "3Y": 22.8, "5Y": 22.1 }, min: 500, risk: "High", rating: "✨ Growth", amc: "Axis MF" },

  // Index (6)
  { name: "HDFC Index Sensex", type: "Index", aum: "₹9,351 Cr", returns: { "1Y": 25.5, "3Y": 15.6, "5Y": 15.6 }, min: 500, risk: "Low", rating: "🔗 Index", amc: "HDFC MF" },
  { name: "Nippon India Nifty 50", type: "Index", aum: "₹24,670 Cr", returns: { "1Y": 25.3, "3Y": 15.4, "5Y": 15.5 }, min: 100, risk: "Low", rating: "🔗 Index", amc: "Nippon India MF" },
  { name: "ICICI Prudential Nifty Next 50 Index", type: "Index", aum: "₹5,922 Cr", returns: { "1Y": 25.2, "3Y": 17.5, "5Y": 14.3 }, min: 100, risk: "Low", rating: "🔗 Index", amc: "ICICI Prudential MF" },
  { name: "Axis Nifty ETF", type: "Index", aum: "₹2,358 Cr", returns: { "1Y": 24.3, "3Y": 15.4, "5Y": 14.1 }, min: 100, risk: "Low", rating: "🔗 Index", amc: "Axis MF" },
  { name: "UTI Nifty 50 Index", type: "Index", aum: "₹4,114 Cr", returns: { "1Y": 25.6, "3Y": 15.1, "5Y": 14.0 }, min: 100, risk: "Low", rating: "🔗 Index", amc: "UTI MF" },
  { name: "SBI Nifty Index", type: "Index", aum: "₹5,102 Cr", returns: { "1Y": 25.1, "3Y": 15.2, "5Y": 13.7 }, min: 500, risk: "Low", rating: "🔗 Index", amc: "SBI MF" }
];

// --- Tabs ---
const fundTypes = [
  { label: "All", color: "#dde7f0" },
  { label: "Large Cap", color: "#41fa8f" },
  { label: "Multi Cap", color: "#47ddde" },
  { label: "Flexi Cap", color: "#a78bfa" },
  { label: "Small Cap", color: "#feae6f" },
  { label: "Index", color: "#fed661" }
];

const riskColor = r =>
  r === "Low" ? "#41fa8f" : r === "Moderate" ? "#fed661" : "#fc8181";

const allocation = [
  { sector: "Large Cap", pct: 30, color: "#41fa8f" },
  { sector: "Multi Cap", pct: 18, color: "#47ddde" },
  { sector: "Flexi Cap", pct: 17, color: "#a78bfa" },
  { sector: "Small Cap", pct: 13, color: "#feae6f" },
  { sector: "Index", pct: 17, color: "#fed661" },
  { sector: "Liquid/Debt", pct: 5, color: "#b8c5d5" }
];

// -- Pie Chart for Allocation --
function PieChart({ data, size = 176 }) {
  let cx = size / 2, cy = size / 2, r = size / 2 - 10;
  let lastAngle = 0;
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      {data.map((item, idx) => {
        const angle = (item.pct / 100) * 360;
        const x1 = cx + r * Math.cos(Math.PI * (lastAngle - 90) / 180);
        const y1 = cy + r * Math.sin(Math.PI * (lastAngle - 90) / 180);
        const last = lastAngle + angle;
        const x2 = cx + r * Math.cos(Math.PI * (last - 90) / 180);
        const y2 = cy + r * Math.sin(Math.PI * (last - 90) / 180);
        const largeArc = angle > 180 ? 1 : 0;
        const path = `
          M ${cx} ${cy}
          L ${x1} ${y1}
          A ${r} ${r} 0 ${largeArc} 1 ${x2} ${y2}
          Z
        `;
        lastAngle += angle;
        return <path key={item.sector} d={path} fill={item.color} />;
      })}
    </svg>
  );
}

// -- Category bar chart (real working) --
function BarChart({ data, indexValue, theme }) {
  const vals = [...data.map(x => x.avg5y), indexValue];
  const maxVal = Math.max(...vals);
  return (
    <div style={{
      display: "flex", alignItems: "flex-end", gap: 30, marginTop: 8, marginBottom: 14
    }}>
      {data.map(cat => (
        <div key={cat.label} style={{ textAlign: "center", flex: 1 }}>
          <div style={{
            height: (cat.avg5y / maxVal) * 140 + 5,
            width: 28,
            background: cat.color,
            borderRadius: 7,
            margin: "0 auto 9px auto",
            boxShadow: `0 1px 8px ${cat.color}33`
          }} />
          <div style={{ color: theme.text, fontWeight: 700, fontSize: "1.01rem" }}>{cat.label}</div>
          <div style={{ color: theme.muted, fontSize: ".93rem" }}>{cat.avg5y}%</div>
        </div>
      ))}
      <div style={{ textAlign: "center", flex: 1 }}>
        <div style={{
          height: (indexValue / maxVal) * 140 + 5,
          width: 28,
          background: "#858ab3",
          borderRadius: 7,
          margin: "0 auto 9px auto",
          boxShadow: "0 1px 8px #858ab344"
        }} />
        <div style={{ color: theme.text, fontWeight: 700, fontSize: "1.01rem" }}>Nifty</div>
        <div style={{ color: theme.muted, fontSize: ".93rem" }}>{indexValue}%</div>
      </div>
    </div>
  );
}

// -- Compute actual category averages from data above --
function getCategoryAverages() {
  const cats = ["Large Cap", "Multi Cap", "Flexi Cap", "Small Cap", "Index"];
  const result = cats.map(label => {
    const f = mutualFunds.filter(mf => mf.type === label);
    return {
      label, color: fundTypes.find(ft => ft.label === label)?.color,
      avg5y: Math.round(f.reduce((sum,m) => sum+m.returns["5Y"], 0)/f.length*10)/10
    };
  });
  return result;
}

export default function Investing() {
  const { theme } = useContext(ThemeContext);
  const [activeType, setActiveType] = useState("All");

  // "All" = top 6, else full segment
  let shownFunds = [];
  if (activeType === "All") {
    shownFunds = [...mutualFunds]
      .sort((a, b) => b.returns["5Y"] - a.returns["5Y"])
      .slice(0, 6);
  } else {
    shownFunds = mutualFunds.filter(f => f.type === activeType);
  }

  // For the comparison bar chart
  const barData = getCategoryAverages();
  const niftyLongAvg = 15.0; // You can update to latest Nifty 50 5Y CAGR

  return (
    <div style={{ maxWidth: 980, margin: "0 auto", padding: "44px 13px 36px 13px", color: theme.text }}>
      <h1 style={{
        color: theme.highlight, fontWeight: 900, fontSize: "2.2rem", letterSpacing: ".01em", marginBottom: 14
      }}>
        Investing Center <span role="img" aria-label="stocks">📈</span>
      </h1>
      
      {/* Suggestion panel */}
      <div
        style={{
          background: theme.card,
          border: `1.6px solid ${theme.highlight}`,
          borderRadius: "11px",
          padding: "1.08rem 1.5rem",
          margin: "0 auto 23px auto",
          color: theme.text,
          display: "flex",
          alignItems: "center",
          fontSize: "1.04rem",
          gap: "14px",
          boxShadow: `0 2px 13px ${theme.highlight}19`,
          maxWidth: 720
        }}
      >
        <span role="img" aria-label="bulb" style={{ fontSize: "1.3rem" }}>💡</span>
        <span>
          <b>Pro tip:</b>&nbsp;
          <span style={{ color: theme.accent, fontWeight: 600 }}>
            We suggest <a href="https://groww.in/" target="_blank" rel="noopener noreferrer"
              style={{ color: theme.accent, textDecoration: "underline" }}>Groww</a> for your investing app
          </span>{" "}
          <span style={{ color: theme.muted }}>(it's easy and student-friendly)</span> — but you can use any platform you prefer!
        </span>
      </div>

      {/* Ideal allocation pie chart */}
      <div style={{
        background: theme.card,
        borderRadius: 20,
        display: "flex",
        gap: 32,
        alignItems: "center",
        padding: "1.7rem 2.1rem .6rem 2rem",
        marginBottom: 33,
        boxShadow: `0 1.5px 13px ${theme.muted}1b`,
        flexWrap: "wrap"
      }}>
        <div>
          <PieChart data={allocation} />
        </div>
        <div style={{ minWidth: 220 }}>
          <div style={{ fontWeight: 800, fontSize: "1.1rem", color: theme.accent, marginBottom: 7 }}>
            Ideal SIP Portfolio Allocation <span style={{ fontSize: "1.08em" }}>🧾</span>
          </div>
          <div style={{ fontSize: ".98rem", color: theme.muted }}>
            <ul style={{ margin: "6px 0 0 .8em", padding: 0 }}>
              {allocation.map(a =>
                <li key={a.sector} style={{ color: a.color, marginBottom: 1, fontWeight: 700, fontSize: ".97rem" }}>
                  {a.sector}: <span style={{ color: theme.text, fontWeight: 600 }}>{a.pct}%</span>
                </li>
              )}
            </ul>
            <span style={{ color: theme.muted, fontWeight: 500 }}>
              Diversify between caps & index for lower risk and smoother growth.
            </span>
          </div>
        </div>
      </div>

      <div style={{ color: theme.muted, fontSize: "1.11rem", fontWeight: 500, marginBottom: 24 }}>
        Beginner-friendly fund explorer: Tap a type (or “All”) and compare India's top mutual funds by returns, risk, AUM, AMC, and more.
      </div>

      {/* Tab Bar */}
      <div style={{
        display: "flex", gap: 16, marginBottom: 21, flexWrap: "wrap"
      }}>
        {fundTypes.map(ft =>
          <button
            key={ft.label}
            style={{
              background: activeType === ft.label ? ft.color : theme.card,
              color: activeType === ft.label ? "#18162b" : ft.color,
              border: `1.3px solid ${ft.color}`,
              fontWeight: 700,
              fontSize: ".98rem",
              borderRadius: "8px",
              padding: ".37em 1.3em",
              cursor: "pointer",
              transition: "background 0.19s, color 0.19s"
            }}
            onClick={() => setActiveType(ft.label)}
          >
            {ft.label}
          </button>
        )}
      </div>

      {/* Mutual Fund Cards */}
      <div style={{ display: "flex", flexDirection: "column", gap: "15px", marginBottom: 18 }}>
        {shownFunds.length === 0
          ? <div style={{ color: theme.muted }}>No funds available for this category.</div>
          : shownFunds.map(fund => (
          <div key={fund.name} style={{
            background: theme.card,
            border: `2.2px solid ${fundTypes.find(t => fund.type === t.label)?.color || theme.highlight}`,
            borderRadius: "15px",
            padding: "1.13rem 1.35rem",
            display: "flex",
            alignItems: "center",
            gap: 19,
            boxShadow: `0 1.2px 7px ${(fundTypes.find(t => fund.type === t.label)?.color || theme.accent)}21`
          }}>
            <div style={{
              color: fundTypes.find(t => fund.type === t.label)?.color || theme.accent,
              fontWeight: 900, fontSize: "1.19rem", width: 32, marginRight: 11
            }}>
              💰
            </div>
            <div style={{ flex: 1 }}>
              <div style={{
                fontWeight: 700, color: theme.text, fontSize: "1.09rem", marginBottom: 3
              }}>{fund.name}</div>
              <div style={{ color: theme.muted, fontSize: ".98rem", marginBottom: 2 }}>{fund.type} | {fund.amc}</div>
              <div style={{ color: "#bca256", fontWeight: 600, fontSize: ".97rem" }}>
                AUM: {fund.aum} | Min SIP ₹{fund.min}
              </div>
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontWeight: 700, color: riskColor(fund.risk), fontSize: ".97rem" }}>{fund.risk} Risk</div>
              <div style={{ fontWeight: 700, color: fund.returns["5Y"] > 18 ? "#41fa8f" : theme.highlight, fontSize: "1.06rem" }}>
                5Y CAGR: {fund.returns["5Y"]}%
              </div>
              <div style={{ color: "#7c734e", fontWeight: 600, fontSize: ".95rem" }}>
                3Y: {fund.returns["3Y"]}% | 1Y: {fund.returns["1Y"]}%
              </div>
              <div style={{ fontWeight: 800, color: "#41fa8f", fontSize: "1.08rem", marginTop: 3 }}>
                {fund.rating}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Bar chart at bottom: Cat avg 5Y vs Nifty */}
      <div style={{
        background: theme.card,
        border: `1.5px solid ${theme.border}`,
        borderRadius: "15px",
        boxShadow: `0 0 10px ${theme.accent}12`,
        maxWidth: 760,
        margin: "41px auto 0 auto",
        padding: "1.2rem 2.1rem"
      }}>
        <div style={{ fontWeight: 800, color: theme.accent, fontSize: "1.08rem", marginBottom: 8 }}>
          5Y Category Return vs. Nifty 50 average <span role="img" aria-label="chart">📊</span>
        </div>
        <BarChart data={barData} indexValue={niftyLongAvg} theme={theme} />
        <div style={{ color: theme.muted, fontSize: ".98rem", marginTop: 2 }}>
          See how different cap/category averages compare to Nifty's 5Y performance (<b>{niftyLongAvg}% CAGR</b>).
        </div>
      </div>

      <div style={{
        color: theme.muted,
        fontSize: ".97rem",
        marginTop: 35,
        maxWidth: 800,
        background: theme.card,
        borderRadius: 12,
        padding: "1.1rem 1.45rem",
        border: `1px solid ${theme.border}`,
        marginLeft: "auto", marginRight: "auto"
      }}>
        <span style={{ fontWeight: 700, color: theme.accent }}>Note:</span> Tap any tab to filter by segment, or “All” for Top 6 by 5Y CAGR. Always use SIP, diversify, and review before investing.
      </div>
    </div>
  );
}
