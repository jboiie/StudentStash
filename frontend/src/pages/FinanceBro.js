import React, { useRef, useEffect } from "react";

export default function FinanceBro() {
  // Scroll chat to bottom when messages update (for actual integration)
  const messagesEndRef = useRef(null);
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  // Sample (placeholder) message sequence
  const demoMessages = [
    { sender: "bot", text: "Hey, I'm Finance Bro 🤖💸\nAsk me anything about budgeting, investing, or money hacks!" },
    { sender: "user", text: "How do I start a budget?" },
    { sender: "bot", text: "It's easy, bro. Track your income & expenses, set spending limits, and stick to them! \nWant a guide? [Nerdwallet Budgeting Guide](https://www.nerdwallet.com/article/finance/how-to-budget) 💵" }
  ];

  return (
    <div style={{
      minHeight: "100vh",
      background: "#18162b",
      fontFamily: "'Inter','Montserrat',Arial,sans-serif",
      padding: "0",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    }}>
      <div style={{
        margin: "42px 0 26px",
        fontWeight: 800,
        color: "#a78bfa",
        fontSize: "2.13rem",
        textAlign: "center",
        letterSpacing: ".01em"
      }}>
        Finance Bro <span role="img" aria-label="sunglasses">🕶️</span>
      </div>
      <div style={{
        color: "#b6b6db",
        marginBottom: 8,
        textAlign: "center",
        fontWeight: 500,
        fontSize: "1.11rem"
      }}>
        Chat with your personal finance bro on all things money!
      </div>
      <div style={{
        width: "100%",
        maxWidth: 590,
        flex: "1 1 auto",
        background: "#202036",
        borderRadius: 16,
        boxShadow: "0 2px 24px #a78bfa29",
        margin: "16px auto 0",
        minHeight: 480,
        display: "flex",
        flexDirection: "column",
        position: "relative"
      }}>
        {/* Message area */}
        <div style={{
          flex: 1,
          overflowY: "auto",
          padding: "1.1rem 1.5rem 1.65rem 1.45rem",
          display: "flex",
          flexDirection: "column",
          gap: "14px"
        }}>
          {demoMessages.map((msg, i) =>
            <div
              key={i}
              style={{
                alignSelf: msg.sender === "user" ? "flex-end" : "flex-start",
                maxWidth: "78%",
                padding: ".81rem 1.18rem",
                borderRadius: msg.sender === "user" ? '19px 19px 4px 19px' : '19px 19px 19px 4px',
                background: msg.sender === "user"
                  ? "linear-gradient(90deg,#6ee7b7 80%,#a78bfa 130%)"
                  : "#232047",
                boxShadow: msg.sender === "user"
                  ? "0 2px 15px #a7fdfa34"
                  : "0 1px 9px #a78bfa16",
                color: msg.sender === "user" ? "#232047" : "#fff",
                fontWeight: 600,
                fontSize: "1rem",
                whiteSpace: "pre-wrap"
              }}
            >
              {/* Hyperlink support in bot messages for demo */}
              {msg.sender === "bot"
                ? msg.text.split(/(\[.*?\]\(.*?\))/g).map((part, idx) => {
                  const match = part.match(/\[(.*)\]\((.*)\)/);
                  if (match) {
                    return (
                      <a
                        key={idx}
                        href={match[2]}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ color: "#41fa8f", fontWeight: "bold", textDecoration: "underline" }}
                      >
                        {match[1]}
                      </a>
                    );
                  }
                  return part;
                })
                : msg.text}
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
        {/* Input area (dummy, not wired up) */}
        <form style={{
          borderTop: "1.5px solid #2a2442",
          display: "flex",
          alignItems: "center",
          gap: 12,
          padding: "1.2rem 1.2rem 1.2rem 1.45rem"
        }}
        onSubmit={e => { e.preventDefault(); /* Integrate bot later */ }}>
          <input
            disabled
            type="text"
            placeholder="Type your money question here…"
            style={{
              flex: 1,
              padding: ".98rem 1.1rem",
              borderRadius: 9,
              border: "none",
              outline: "none",
              background: "#26225e",
              color: "#fff",
              fontWeight: 500,
              fontSize: "1.01rem",
              fontFamily: "inherit",
              opacity: .83
            }}
          />
          <button
            disabled
            style={{
              background: "linear-gradient(90deg,#6ee7b7,#a78bfa 100%)",
              color: "#131223",
              fontWeight: 700,
              fontSize: "1.08rem",
              borderRadius: 9,
              border: "none",
              padding: ".75rem 1.6rem",
              boxShadow: "0 2px 12px #6ee7b737",
              cursor: "not-allowed",
              opacity: .7
            }}>Send</button>
        </form>
        <div style={{
          color: "#a78bfa",
          textAlign: "center",
          fontSize: ".96rem",
          paddingTop: 5,
          paddingBottom: 8
        }}>
          {/* Placeholder/help tip */}
          Coming soon: full AI finance bro chat!
        </div>
      </div>
    </div>
  );
}
