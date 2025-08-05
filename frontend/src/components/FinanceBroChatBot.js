import React, { useState, useEffect, useRef } from "react";

const broPhrases = [
  "Bro, if you're not saving, you're missing the bull run!",
  "To the moon, king! 🚀 Try that SIP strategy.",
  "Passive income? More like aggressive wins, bro!",
  "Real Gs don't wait for payday, they make paydays.",
  "Stacks on stacks—compound that interest, legend!",
  "Keep grinding, the market's gonna bless you soon!",
  "Diversify bro, don’t put all eggs in one basket!",
  "HODL tight, this is just a dip, trust me.",
];

export default function FinanceBroChatBot({ mode }) {
  const [messages, setMessages] = useState([
    { from: "bot", text: "Yo bro! Ask me anything about stacking those savings." },
  ]);
  const [input, setInput] = useState("");
  const chatEndRef = useRef(null);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMsg = { from: "user", text: input };
    const botMsg = {
      from: "bot",
      text: broPhrases[Math.floor(Math.random() * broPhrases.length)],
    };

    setMessages((msgs) => [...msgs, userMsg, botMsg]);
    setInput("");
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div
      style={{
        border: `2px solid ${mode === "boomer" ? "#24446e" : "violet"}`,
        padding: 10,
        borderRadius: 10,
        maxWidth: 400,
        backgroundColor: mode === "boomer" ? "#f0f0e6" : "#111",
        color: mode === "boomer" ? "#24446e" : "white",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          height: 300,
          overflowY: "auto",
          marginBottom: 10,
          backgroundColor: mode === "boomer" ? "#e3e6e1" : "#222",
          padding: 10,
          borderRadius: 8,
          flexGrow: 1,
        }}
      >
        {messages.map((msg, idx) => (
          <div
            key={idx}
            style={{
              textAlign: msg.from === "bot" ? "left" : "right",
              margin: "5px 0",
            }}
          >
            <b style={{ color: msg.from === "bot" ? (mode === "boomer" ? "#24446e" : "violet") : (mode === "boomer" ? "#5a7dbb" : "orange") }}>
              {msg.from === "bot" ? "BroBot" : "You"}:
            </b>{" "}
            {msg.text}
          </div>
        ))}
        <div ref={chatEndRef} />
      </div>

      <div style={{ display: "flex" }}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask me bro stuff..."
          style={{
            width: "calc(100% - 70px)",
            marginRight: 10,
            padding: 8,
            fontSize: 14,
            borderRadius: 6,
            border: `1.5px solid ${mode === "boomer" ? "#24446e" : "violet"}`,
            backgroundColor: mode === "boomer" ? "white" : "#222",
            color: mode === "boomer" ? "#24446e" : "white",
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSend();
          }}
        />
        <button
          onClick={handleSend}
          style={{
            padding: "6px 18px",
            backgroundColor: mode === "boomer" ? "#24446e" : "violet",
            color: "white",
            borderRadius: 6,
            border: "none",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          Send
        </button>
      </div>
    </div>
  );
}
