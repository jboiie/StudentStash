import React, { useContext, useState, useEffect } from "react";
import { ThemeContext } from "../App";

// ---- "Study Missions" (all unique to here, all working links) ----
const missions = [
  {
    title: "Level 1: How to Open a Student Bank Account",
    desc: "Follow this step-by-step guide for Indian students—easy, no jargon.",
    url: "https://www.hdfcbank.com/personal/resources/learning-centre/banking-basics/how-to-open-a-student-bank-account"
  },
  {
    title: "Level 2: What is UPI? The Ultimate Student Guide",
    desc: "Learn how UPI payments work, find great tips for safety.",
    url: "https://www.phonepe.com/blog/digital-payments/basics-of-upi/"
  },
  {
    title: "Level 3: Creating Your Monthly Budget With Google Sheets",
    desc: "Hands-on, with free templates and a walkthrough video.",
    url: "https://www.youtube.com/watch?v=NWI7GACrFQA"
  },
  {
    title: "Level 4: The Magic of Compounding (Animated Demo)",
    desc: "Why everyone says 'start early'; see the numbers come alive!",
    url: "https://www.youtube.com/watch?v=JuWdrhKj2tw"
  },
  {
    title: "Level 5: Start Your First SIP Online",
    desc: "Actual screenshot demo—how to start a SIP, what to look out for.",
    url: "https://groww.in/p/sip/how-to-start-sip-online"
  }
];

const learnResources = [
  // Basics
  {
    tab: "Basics", icon: "📚",
    title: "What Is a Mutual Fund?",
    desc: "Understand how funds pool money—simple, with analogies.",
    url: "https://groww.in/p/mutual-funds/what-are-mutual-funds"
  },
  {
    tab: "Basics", icon: "💳",
    title: "How Do Credit Cards Work?",
    desc: "The difference between debit, credit, and why it's not free money.",
    url: "https://www.moneycontrol.com/news/business/personal-finance/how-does-a-credit-card-work-find-out-here-3288231.html"
  },
  {
    tab: "Basics", icon: "🏦",
    title: "Bank Accounts 101",
    desc: "Different types, best for students, safe online banking.",
    url: "https://www.bankbazaar.com/saving-schemes/types-of-bank-accounts.html"
  },
  // Personal Finance
  {
    tab: "Personal Finance", icon: "💡",
    title: "How to Budget as a Student",
    desc: "Real-world ways to track money and make it last.",
    url: "https://www.cnbctv18.com/personal-finance/student-budget-tips-15406241.htm"
  },
  {
    tab: "Personal Finance", icon: "💸",
    title: "Why You Need Emergency Funds",
    desc: "Starting early means less panic when things go wrong.",
    url: "https://www.groww.in/p/learn/how-to-build-an-emergency-fund"
  },
  {
    tab: "Personal Finance", icon: "🧾",
    title: "How to File Taxes (as a Young Adult)",
    desc: "Demystifying the process, finding your forms—quick video, too.",
    url: "https://cleartax.in/s/filing-income-tax-return-first-time"
  },
  // Investing
  {
    tab: "Investing", icon: "🌱",
    title: "SIP vs. Lump Sum: Which is Better?",
    desc: "Breakdown of returns, risk—interactive calculator included.",
    url: "https://groww.in/calculators/sip-calculator"
  },
  {
    tab: "Investing", icon: "💹",
    title: "Index Funds: Why They Matter",
    desc: "How the simplest fund historically beats most experts.",
    url: "https://www.etmoney.com/learn/index-funds"
  },
  {
    tab: "Investing", icon: "📈",
    title: "How Does the Stock Market Work?",
    desc: "Crash course with short YouTube explainer.",
    url: "https://www.youtube.com/watch?v=p7HKvqRI_Bo"
  },
  // Career & Adulting
  {
    tab: "Career", icon: "🧑‍💻",
    title: "How to Ace Your First Internship",
    desc: "Checklist to impress your boss, even remotely.",
    url: "https://www.indeed.com/career-advice/career-development/tips-first-internship"
  },
  {
    tab: "Career", icon: "🏠",
    title: "Understanding Rent, Deposits & Agreements",
    desc: "What to check before you sign—India specific.",
    url: "https://www.hdfc.com/blog/rent-agreement"
  },
  {
    tab: "Career", icon: "💼",
    title: "How to Make a Resume (Free Templates)",
    desc: "Avoid classic errors, use good design templates.",
    url: "https://www.canva.com/resumes/templates/"
  }
];

const learnTabs = [
  { label: "All", color: "#41fa8f" },
  { label: "Basics", color: "#a78bfa" },
  { label: "Personal Finance", color: "#fed661" },
  { label: "Investing", color: "#47ddde" },
  { label: "Career", color: "#feae6f" }
];

// --- Helper: key for user progress ---
function getUser() {
  return localStorage.getItem("studentstash_user") || "default";
}

// ---- Missions Progress Bar ----
function MissionsProgressBar({ progress, total, theme }) {
  const pct = Math.round((progress / total) * 100);
  return (
    <div style={{ width: "100%", height: 10, background: theme.card, borderRadius: 7, overflow: "hidden", margin: "7px 0 16px 0" }}>
      <div
        style={{
          width: `${pct}%`,
          height: "100%",
          background: `linear-gradient(90deg,${theme.accent},${theme.highlight})`,
          borderRadius: "8px",
          transition: "width 0.31s"
        }}
      />
    </div>
  );
}

// ---- Category Progress Bar ----
function CategoryProgressBar({ tab, theme, visited }) {
  const tabResources = learnResources.filter(r => r.tab === tab);
  const done = tabResources.filter(r => visited.includes(r.url)).length;
  const pct = tabResources.length === 0 ? 0 : Math.round((done / tabResources.length) * 100);
  return (
    <div style={{ width: "100%", height: 9, background: theme.card, borderRadius: 6, overflow: "hidden", margin: "7px 0 10px 0" }}>
      <div
        style={{
          width: `${pct}%`,
          height: "100%",
          background: learnTabs.find(t => t.label === tab)?.color || theme.accent,
          borderRadius: 6,
          transition: "width 0.31s"
        }}
      />
    </div>
  );
}

export default function Learn() {
  const { theme } = useContext(ThemeContext);
  const userKey = `learn_progress_${getUser()}`;
  const [activeTab, setActiveTab] = useState("All");
  const [missionLevel, setMissionLevel] = useState(() =>
    Number(localStorage.getItem(`learn_mission_${getUser()}`)) || 0
  );
  const [visited, setVisited] = useState(() =>
    JSON.parse(localStorage.getItem(userKey) || "[]")
  );

  useEffect(() => {
    localStorage.setItem(`learn_mission_${getUser()}`, missionLevel);
  }, [missionLevel]);
  useEffect(() => {
    localStorage.setItem(userKey, JSON.stringify(visited));
  }, [visited, userKey]);

  function handleMissionClick(idx, m) {
    if (idx > missionLevel) return;
    window.open(m.url, "_blank", "noopener,noreferrer");
    if (idx === missionLevel) setMissionLevel(idx + 1);
  }

  function handleResourceClick(url) {
    if (!visited.includes(url)) setVisited([...visited, url]);
  }

  function resetProgress() {
    if (!window.confirm("Reset all learning progress? This will clear your mission level and visited links.")) return;
    setMissionLevel(0);
    setVisited([]);
    localStorage.removeItem(`learn_mission_${getUser()}`);
    localStorage.removeItem(userKey);
    alert("Learning progress reset successfully!");
  }

  const filtered = activeTab === "All"
    ? learnResources
    : learnResources.filter(r => r.tab === activeTab);

  return (
    <div style={{ maxWidth: 980, margin: "0 auto", padding: "44px 13px 36px 13px", color: theme.text }}>
      <h1 style={{
        color: theme.highlight, fontWeight: 900, fontSize: "2.18rem",
        letterSpacing: ".01em", marginBottom: 14
      }}>
        Learn <span role="img" aria-label="learning">📚</span>
      </h1>

      {/* ============== Missions Progression Section ============== */}
      <div style={{
        background: theme.card,
        border: `2px solid ${theme.highlight}`,
        borderRadius: 15,
        boxShadow: `0 2px 16px ${theme.highlight}18`,
        padding: "1.5rem 2rem 1.2rem 2rem",
        maxWidth: 680,
        margin: "0 auto 34px auto",
        position: "relative"
      }}>
        {/* Reset button in top-right corner */}
        <button
          onClick={resetProgress}
          style={{
            position: "absolute",
            top: "1rem",
            right: "1.5rem",
            background: "transparent",
            border: `1px solid ${theme.muted}`,
            color: theme.muted,
            borderRadius: "6px",
            padding: "0.35rem 0.7rem",
            fontSize: "0.85rem",
            fontWeight: 600,
            cursor: "pointer",
            transition: "all 0.15s",
            opacity: 0.7
          }}
          onMouseOver={(e) => {
            e.target.style.opacity = "1";
            e.target.style.borderColor = theme.highlight;
            e.target.style.color = theme.highlight;
          }}
          onMouseOut={(e) => {
            e.target.style.opacity = "0.7";
            e.target.style.borderColor = theme.muted;
            e.target.style.color = theme.muted;
          }}
          title="Reset all learning progress (for testing)"
        >
          🔄 Reset
        </button>

        <div style={{ fontWeight: 800, color: theme.accent, fontSize: "1.12rem", marginBottom: 2 }}>
          Study Missions <span role="img" aria-label="level up">🎮</span>
        </div>
        <div style={{ color: theme.muted, fontSize: ".99rem", marginBottom: 13 }}>
          Unlock new lessons as you finish each level—your progress auto-saves!
        </div>
        <MissionsProgressBar progress={missionLevel} total={missions.length} theme={theme} />
        <div>
          {missions.map((m, idx) => (
            <div key={m.title} style={{
              background: idx < missionLevel ? theme.accent :
                idx === missionLevel ? theme.highlight : theme.card,
              color: idx < missionLevel
                ? "#181a2d"
                : idx === missionLevel
                  ? "#232640"
                  : theme.muted,
              border: idx === missionLevel ? `2px solid ${theme.accent}` : "none",
              borderRadius: 10,
              padding: "1em 1.3em",
              marginBottom: 13,
              display: "flex", alignItems: "center",
              boxShadow: idx === missionLevel ? "0 2px 9px #41fa8f16" : undefined,
              cursor: idx <= missionLevel ? "pointer" : "not-allowed",
              opacity: idx <= missionLevel ? 1 : 0.5,
              fontWeight: idx === missionLevel ? 700 : 600,
            }}
              onClick={() => handleMissionClick(idx, m)}
              title={idx > missionLevel ? "Unlock previous level first!" : "Open this lesson"}
            >
              <span>{m.title} &nbsp;
                {idx < missionLevel
                  ? <span role="img" aria-label="done">✅</span>
                  : idx === missionLevel
                    ? <span role="img" aria-label="now">👁️</span>
                    : <span role="img" aria-label="lock">🔒</span>}
              </span>
              <span style={{ fontWeight: 400, fontSize: "1.01em", marginLeft: "0.75em" }}>{m.desc}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ============== Tabs ============== */}
      <div style={{ display: "flex", gap: 16, marginBottom: 22, flexWrap: "wrap" }}>
        {learnTabs.map(tab =>
          <button
            key={tab.label}
            style={{
              background: activeTab === tab.label ? tab.color : theme.card,
              color: activeTab === tab.label ? "#191913" : tab.color,
              border: `1.2px solid ${tab.color}`,
              fontWeight: 700,
              fontSize: ".98rem",
              borderRadius: "8px",
              padding: ".37em 1.25em",
              cursor: "pointer",
              transition: "background 0.16s, color 0.16s"
            }}
            onClick={() => setActiveTab(tab.label)}
          >
            {tab.label}
          </button>
        )}
      </div>

      {/* ============== Category Progress Bars ============== */}
      <div style={{
        display: "flex", gap: "17px", marginBottom: 17, flexWrap: "wrap", alignItems: "center"
      }}>
        {learnTabs.filter(t => t.label !== "All").map(t =>
          <div key={t.label} style={{ minWidth: 115, flex: 1 }}>
            <div style={{ color: t.color, fontWeight: 700, fontSize: ".97em", marginBottom: 5 }}>{t.label}</div>
            <CategoryProgressBar tab={t.label} theme={theme} visited={visited} />
          </div>
        )}
      </div>

      {/* ============== Resource Cards ============== */}
      <div style={{
        display: "flex",
        flexWrap: "wrap",
        gap: 23,
        justifyContent: "center"
      }}>
        {filtered.map(res => (
          <div key={res.title}
            style={{
              background: theme.card,
              border: `2px solid ${learnTabs.find(t=>t.label === res.tab)?.color || theme.highlight}`,
              borderRadius: 14,
              boxShadow: `0 2px 10px ${(learnTabs.find(t=>t.label === res.tab)?.color || theme.accent)}18`,
              padding: "1.14rem 1.3rem",
              minWidth: 270, maxWidth: 312,
              display: "flex", flexDirection: "column", alignItems: "flex-start",
              marginBottom: 4
            }}
          >
            <div style={{
              fontSize: "1.45rem",
              marginBottom: ".3em"
            }}>{res.icon}</div>
            <div style={{ fontWeight: 700, fontSize: "1.08rem", color: theme.text, marginBottom: 2 }}>
              {res.title}
            </div>
            <div style={{ color: theme.muted, fontSize: ".98rem", marginBottom: 13 }}>
              {res.desc}
            </div>
            <a
              href={res.url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => handleResourceClick(res.url)}
              style={{
                background: `linear-gradient(90deg,${learnTabs.find(t=>t.label===res.tab)?.color || theme.highlight},${theme.accent})`,
                color: "#191a2d",
                fontWeight: 700,
                border: "none",
                borderRadius: 8,
                fontSize: "1.01rem",
                padding: ".63em 1.05em",
                textDecoration: "none",
                transition: "background .14s"
              }}
            >
              Learn more
            </a>
          </div>
        ))}
      </div>

      <div style={{
        color: theme.muted,
        fontSize: ".97rem",
        marginTop: 32,
        background: theme.card,
        borderRadius: 12,
        padding: "1.1rem 1.45rem",
        border: `1px solid ${theme.border}`,
        maxWidth: 720,
        marginLeft: "auto", marginRight: "auto"
      }}>
        All links above open in a new tab—your study progress is saved for every session. Finish your missions to unlock more knowledge!
      </div>
    </div>
  );
}
