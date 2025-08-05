import Navbar from "../components/Navbar";
import ProgressBar from "../components/ProgressBar";

const articles = [
  {
    id: 1,
    title: "2024 Personal Finance Trends",
    author: "Dr. Wenyao Hu",
    progress: 75,
    duration: "45 min",
    lessons: 8,
  },
  {
    id: 2,
    title: "How To Build An Emergency Fund",
    author: "GoodMoneying",
    progress: 55,
    duration: "35 min",
    lessons: 6,
  },
  {
    id: 3,
    title: "7 Rules Every Young Earner Should Know",
    author: "Financial Express",
    progress: 20,
    duration: "28 min",
    lessons: 5,
  }
];

const advice = [
  "Track every rupee: Use simple apps to see where your money goes.",
  "Set a fixed ‘pay yourself first’ savings every month.",
  "Always have 3+ months' living costs in an emergency fund.",
  "Start an SIP (Systematic Investment Plan) as soon as you get income.",
  "Don’t take loans for non-investment things.",
  "Review your biggest spend each month and ask 'why?'."
];

function MinimalProgressBar({ percent }) {
  return (
    <div style={{
      marginTop: "8px",
      marginBottom: "2px",
      height: 11,
      width: "100%",
      background: "#23214f",
      borderRadius: 7,
      position: "relative"
    }}>
      <div style={{
        width: `${percent}%`,
        height: "100%",
        background: "linear-gradient(90deg, #a78bfa, #34d399)",
        borderRadius: 7,
        transition: "width 0.3s"
      }} />
      <span style={{
        position: "absolute",
        right: 9,
        top: 0,
        color: "#bdb9d0",
        fontSize: "0.79rem",
        fontWeight: 600,
        lineHeight: "11px"
      }}>{percent}%</span>
    </div>
  );
}

export default function Learn() {
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
        padding: "20px"
      }}
    >
      <Navbar />
      <div style={{ maxWidth: 600, width: "100%", margin: "0 auto" }}>
        <h1 style={{
          color: "#a78bfa",
          fontWeight: "700",
          fontSize: "2rem",
          textAlign: "center",
          marginBottom: "1.8rem"
        }}>
          Learn & Grow 📚
        </h1>

        <section style={{ marginBottom: "2.2rem" }}>
          <h2 style={{
            color: "#a78bfa",
            marginBottom: ".95rem",
            textAlign: "center",
            fontWeight: 600,
            fontSize: "1.25rem"
          }}>
            Courses
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
            {articles.map(({ id, title, author, progress, duration, lessons }) => (
              <div
                key={id}
                style={{
                  background: "#202036",
                  borderRadius: "16px",
                  padding: "1.15rem 1.2rem",
                  cursor: "default",
                  boxShadow: "0 4px 14px rgba(0,0,0,0.17)",
                  transition: "all 0.25s cubic-bezier(.22,.61,.36,1)",
                  display: "flex",
                  flexDirection: "column",
                  gap: "8px",
                  alignItems: "flex-start"
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.transform = "scale(1.03)";
                  e.currentTarget.style.boxShadow = "0 10px 24px rgba(52,43,199,0.12)";
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = "none";
                  e.currentTarget.style.boxShadow = "0 4px 14px rgba(0,0,0,0.17)";
                }}
              >
                <div style={{
                  color: "#a78bfa",
                  fontWeight: 600,
                  fontSize: "1.05rem"
                }}>{title}</div>
                <div style={{
                  fontSize: ".87rem",
                  color: "#afafc8",
                  margin: "2px 0 1px 0",
                  display: "flex",
                  gap: "13px"
                }}>
                  <span>{duration}</span>
                  <span>· {lessons} lessons</span>
                </div>
                <div style={{ fontSize: ".87rem", color: "#bdb9d0" }}>By {author}</div>
                <MinimalProgressBar percent={progress} />
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 style={{
            color: "#a78bfa",
            marginBottom: ".75rem",
            textAlign: "center",
            fontWeight: 600,
            fontSize: "1.13rem"
          }}>
            Money Advice & Tips
          </h2>
          <ul style={{
            listStyleType: "none",
            paddingLeft: 0,
            display: "flex",
            flexDirection: "column",
            gap: "12px",
            margin: 0
          }}>
            {advice.map((tip, idx) => (
              <li
                key={idx}
                style={{
                  background: "#202036",
                  borderRadius: "13px",
                  padding: ".8rem 1.1rem",
                  boxShadow: "0 3px 6px rgba(0,0,0,0.15)",
                  transition: "all 0.2s cubic-bezier(.22,.61,.36,1)",
                  cursor: "default"
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.transform = "scale(1.02)";
                  e.currentTarget.style.boxShadow = "0 10px 18px rgba(52,43,199,0.10)";
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = "none";
                  e.currentTarget.style.boxShadow = "0 3px 6px rgba(0,0,0,0.15)";
                }}
              >
                {tip}
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}
