import React from "react";

// Learning modules
const modules = [
  {
    key: "saving",
    title: "Saving Basics",
    desc: "Learn the fundamentals of saving money",
    icon: "💰",
    info: "5 min · 4 lessons",
    progress: 100,
    status: "review",
    link: "https://www.moneyhelper.org.uk/en/savings/types-of-savings/savings-tips"
  },
  {
    key: "budget",
    title: "Budgeting 101",
    desc: "Create and stick to your first budget",
    icon: "📊",
    info: "6 min · 5 lessons",
    progress: 100,
    status: "review",
    link: "https://www.nerdwallet.com/uk/personal-finance/how-to-budget/"
  },
  {
    key: "emergency",
    title: "Emergency Fund",
    desc: "Why and how to build an emergency fund",
    icon: "🚨",
    info: "5 min · 5 lessons",
    progress: 60,
    status: "continue",
    link: "https://www.investopedia.com/articles/pf/06/emergencyfund.asp"
  },
  {
    key: "invest",
    title: "Investment Basics",
    desc: "Introduction to investing for beginners",
    icon: "📈",
    info: "8 min · 6 lessons",
    progress: 0,
    status: "locked",
    link: "https://www.themotleyfool.com/investing/how-to-invest/stocks/"
  },
  {
    key: "student",
    title: "Student Finance",
    desc: "Managing money during college years",
    icon: "🎓",
    info: "7 min · 5 lessons",
    progress: 0,
    status: "locked",
    link: "https://www.nationwide.co.uk/guides/manage-your-money/how-to-manage-money-at-university/"
  }
];

// All fresh, working tips:
const dailyTips = [
  {
    tip: "Start small – even ₹10 daily adds up to ₹3,650 annually!",
    url: "https://www.cnbc.com/select/how-small-steps-can-help-you-save-more-money/"
  },
  {
    tip: "Set specific savings goals rather than vague ones.",
    url: "https://www.bankrate.com/banking/savings/how-to-set-savings-goals/"
  },
  {
    tip: "Automate your savings to make it effortless.",
    url: "https://www.forbes.com/advisor/banking/automatic-savings/"
  },
  {
    tip: "Use apps to track expenses and savings.",
    url: "https://www.businessinsider.in/tech/apps/news/best-expense-tracker-apps-in-india/articleshow/101573818.cms"
  },
  {
    tip: "Join saving challenges for motivation.",
    url: "https://www.moneycrashers.com/savings-challenge-ideas/"
  }
];

export default function Learn() {
  const completeModules = modules.filter(m => m.progress === 100).length;

  return (
    <div style={{
      background: "#18162b",
      minHeight: "100vh",
      padding: "36px 0 36px",
      fontFamily: "'Inter', 'Montserrat', Arial, sans-serif",
    }}>
      <div style={{ maxWidth: 650, margin: "0 auto" }}>
        {/* Heading */}
        <h1 style={{
          color: "#a78bfa",
          fontSize: "2rem",
          fontWeight: 800,
          textAlign: "center",
          letterSpacing: ".01em"
        }}>
          Learn & Grow <span role="img" aria-label="book">📗</span>
        </h1>
        <div style={{
          color: "#bdb9d0", fontSize: "1.13rem", fontWeight: 500,
          textAlign: "center", marginBottom: 34
        }}>
          Build financial literacy one lesson at a time!
        </div>

        {/* Progress Bar (top) */}
        <div style={{
          background: "#232047",
          borderRadius: 14,
          padding: "1.1rem 1.7rem 1.15rem 1.2rem",
          marginBottom: 32,
          color: "#fff",
          boxShadow: "0 1.2px 12px #a78bfa33"
        }}>
          <div style={{
            fontWeight: 700,
            fontSize: "1.09rem",
            marginBottom: 7,
            color: "#a78bfa",
            letterSpacing: ".01em"
          }}>
            Your Learning Progress
          </div>
          <div style={{
            color: "#b6b6db",
            fontWeight: 500,
            fontSize: ".97rem",
            marginBottom: 10
          }}>
            Keep learning to unlock new features and earn bonus points!
          </div>
          {/* Progress bar */}
          <div style={{
            width: "100%",
            background: "#312e81",
            height: 10,
            borderRadius: 7,
            marginBottom: 7
          }}>
            <div style={{
              width: `${(completeModules / modules.length) * 100}%`,
              background: "linear-gradient(90deg,#a78bfa 10%,#41fa8f)",
              height: 10,
              borderRadius: 7,
              transition: "width 0.6s"
            }} />
          </div>
          <div style={{
            color: "#67fcb6",
            fontWeight: 700,
            fontSize: ".99rem",
            float: "right"
          }}>
            {completeModules}/{modules.length} Complete
          </div>
          <div style={{ clear: "both" }} />
        </div>

        {/* Modules */}
        <div style={{ fontWeight: 800, color: "#f8ffbb", fontSize: "1.07rem", marginBottom: 12 }}>
          <span role="img" aria-label="book">📚</span> Learning Modules
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
          {modules.map(m => (
            <div key={m.key} style={{
              background: m.status === "locked" ? "#23213e" : "#202036",
              borderRadius: 15,
              boxShadow: m.status === "locked"
                ? "none"
                : "0 2px 24px 2px #a78bfa28",
              padding: "1.25rem 1.6rem 1.21rem 1.4rem",
              opacity: m.status === "locked" ? 0.6 : 1,
              position: "relative",
              marginBottom: 0,
              border: m.status === "review" ? "2px solid #a78bfa" : "none"
            }}>
              <div style={{
                display: "flex", gap: 17, alignItems: "center", marginBottom: 7
              }}>
                <span style={{ fontSize: "1.27rem" }}>{m.icon}</span>
                <span style={{
                  fontWeight: 700, color: "#fff", fontSize: "1.11rem", letterSpacing: ".01em"
                }}>{m.title}</span>
                <span style={{ fontSize: "1rem", color: "#a8ffea", fontWeight: 500, marginLeft: 12 }}>
                  {m.info}
                </span>
              </div>
              <div style={{
                color: "#cfd0ff", fontWeight: 500,
                marginLeft: 29, marginBottom: 7,
                fontSize: ".98rem"
              }}>{m.desc}</div>
              <div style={{ marginLeft: 29, color: "#b6b6db", fontSize: ".99rem", marginBottom: 6 }}>
                Progress
              </div>
              {/* Module progress bar */}
              <div style={{
                marginLeft: 29,
                width: "85%",
                background: "#312e81",
                height: 8,
                borderRadius: 5,
                marginBottom: 13
              }}>
                <div style={{
                  width: `${m.progress}%`,
                  background: "linear-gradient(90deg,#a78bfa 10%,#41fa8f)",
                  height: 8,
                  borderRadius: 5,
                  transition: "width 0.6s"
                }} />
              </div>
              {/* Status/Button */}
              {m.status === "continue" && (
                <a
                  href={m.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "inline-block",
                    fontWeight: 700,
                    padding: ".5em 1.4em",
                    borderRadius: 10,
                    border: "none",
                    background: "#41fa8f",
                    color: "#18162b",
                    fontSize: ".98rem",
                    fontFamily: "inherit",
                    textDecoration: "none",
                    marginLeft: 29,
                    marginTop: 7,
                    boxShadow: "0 1.5px 8px #41fa8f33",
                    transition: "background .14s"
                  }}
                >Continue</a>
              )}
              {m.status === "review" && (
                <a
                  href={m.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "inline-block",
                    fontWeight: 700,
                    padding: ".5em 1.4em",
                    borderRadius: 10,
                    border: "none",
                    background: "#a78bfa",
                    color: "#18162b",
                    fontSize: ".98rem",
                    fontFamily: "inherit",
                    textDecoration: "none",
                    marginLeft: 29,
                    marginTop: 7,
                    boxShadow: "0 1.5px 8px #54468f22",
                    transition: "background .14s"
                  }}
                >Review</a>
              )}
              {m.status === "locked" && (
                <button disabled tabIndex={-1}
                  style={{
                    display: "inline-block",
                    fontWeight: 700,
                    padding: ".49em 1.35em",
                    borderRadius: 10,
                    border: "none",
                    background: "#483b68",
                    color: "#ccc",
                    fontSize: ".97rem",
                    marginLeft: 29,
                    marginTop: 7,
                    opacity: 0.7,
                    cursor: "not-allowed"
                  }}>
                  Locked
                </button>
              )}
            </div>
          ))}
        </div>
        <div style={{ height: 15 }} />

        {/* Daily Tips */}
        <div style={{
          marginTop: 4,
          background: "#202036",
          borderRadius: 13,
          boxShadow: "0 1px 12px #77ffea0c",
          padding: "1.15rem 1.1rem 1rem 1.25rem"
        }}>
          <div style={{
            fontWeight: 700, color: "#ffe8b9", marginBottom: 11, fontSize: "1.1rem"
          }}>
            <span role="img" aria-label="bulb">💡</span> Daily Tips
          </div>
          <ul style={{
            padding: 0, margin: 0, listStyle: "none", fontSize: ".98rem"
          }}>
            {dailyTips.map((tip, idx) => (
              <li key={idx}
                style={{
                  background: "#292049",
                  borderRadius: 7,
                  padding: "8px 15px",
                  color: "#fff",
                  fontWeight: 600,
                  marginBottom: 8
                }}>
                <a
                  href={tip.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    color: "#41fa8f",
                    textDecoration: "underline",
                    fontWeight: 700,
                    wordBreak: "break-word",
                    transition: "color .13s"
                  }}
                >
                  {tip.tip}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
