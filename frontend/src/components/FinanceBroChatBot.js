// src/components/FinanceBroChatBot.js
import React, { useState, useRef, useEffect } from "react";

export default function FinanceBroChatBot() {
  const [messages, setMessages] = useState([
    { from: "bot", text: "Yo bro! Ask me anything about stacking those savings." },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef(null);

  // Scroll to bottom on new message
  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  // Function to send the user message to backend API and get BroBot reply
  async function sendMessageToApi(text) {
    try {
      const response = await fetch("http://localhost:8000/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text }),
      });
      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }
      const data = await response.json();
      return data.reply;
    } catch (error) {
      console.error("Backend call failed:", error);
      return "Bro, I’m having a server issue. Hit it up in a bit!";
    }
  }

  // Handle sending a message when user clicks send or presses enter
  const handleSend = async () => {
    if (!input.trim() || loading) return; // Prevent sending empty or multiple requests

    const userInput = input.trim();
    setMessages((msgs) => [...msgs, { from: "user", text: userInput }]);
    setInput("");
    setLoading(true);

    const botReply = await sendMessageToApi(userInput);
    setMessages((msgs) => [...msgs, { from: "bot", text: botReply }]);
    setLoading(false);
  };

  // Send on Enter key press
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div
      style={{
        maxWidth: 700,
        minWidth: 340,
        width: "94vw",
        height: "70vh",
        margin: "0 auto",
        padding: 24,
        background: "#242046",
        borderRadius: 22,
        color: "#fafafd",
        boxShadow: "0 6px 32px 0 #1a172f1a",
        display: "flex",
        flexDirection: "column",
      }}
      aria-label="Finance Bro Chatbot"
    >
      <div
        style={{
          textAlign: "center",
          fontWeight: 700,
          fontSize: 24,
          marginBottom: 9,
          userSelect: "none",
        }}
      >
        Finance Bro Chat
      </div>
      <div
        style={{
          textAlign: "center",
          color: "#aab0fa",
          fontSize: 14,
          marginBottom: 15,
          userSelect: "none",
        }}
      >
        Friendly financial advice, Gen-Z style.
      </div>

      {/* Chat messages container */}
      <div
        style={{
          flex: 1,
          overflowY: "auto",
          padding: "2px 12px 0 12px",
          marginBottom: 10,
          background: "#161534",
          borderRadius: 13,
          border: "1.5px solid #31305a",
        }}
        aria-live="polite"
      >
        {messages.map((msg, idx) => (
          <div
            key={idx}
            style={{
              display: "flex",
              justifyContent: msg.from === "user" ? "flex-end" : "flex-start",
              margin: "8px 0",
            }}
          >
            <div
              style={{
                background: msg.from === "user" ? "#4338ca" : "#31305a",
                color: msg.from === "user" ? "white" : "#aab0fa",
                padding: "11px 16px",
                borderRadius: 16,
                maxWidth: "78%",
                fontWeight: 500,
                fontSize: 16,
                whiteSpace: "pre-wrap",
                boxShadow:
                  msg.from === "user"
                    ? "0 3px 14px 0 #4338ca77"
                    : "0 2px 8px 0 #222244aa",
                lineHeight: 1.5,
              }}
              role={msg.from === "bot" ? "textbox" : undefined}
              aria-label={
                msg.from === "bot" ? "BroBot response" : "User message"
              }
            >
              {msg.from === "bot" && <span style={{ marginRight: 7 }}>🕶️ </span>}
              {msg.text}
            </div>
          </div>
        ))}
        <div ref={chatEndRef}></div>
      </div>

      {/* Input box and send button */}
      <div style={{ display: "flex", gap: 10 }}>
        <textarea
          aria-label="Type your message here"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={loading}
          rows={1}
          placeholder="Ask me bro stuff..."
          style={{
            flex: 1,
            padding: "13px 15px",
            borderRadius: 12,
            border: "none",
            fontSize: 16,
            outline: "none",
            background: "#31305a",
            color: "#fafafd",
            resize: "none",
          }}
        />
        <button
          onClick={handleSend}
          disabled={loading || !input.trim()}
          style={{
            backgroundColor: loading ? "#7269c6" : "#4338ca",
            color: "white",
            border: "none",
            borderRadius: 12,
            padding: "0 24px",
            fontSize: 16,
            cursor: loading || !input.trim() ? "not-allowed" : "pointer",
            fontWeight: "bold",
            userSelect: "none",
          }}
          aria-label="Send message"
        >
          {loading ? "..." : "Send"}
        </button>
      </div>

      {/* Loading indicator */}
      <div
        style={{
          minHeight: 18,
          color: "#aab0fa",
          fontSize: 13,
          marginTop: 8,
          textAlign: "center",
          userSelect: "none",
        }}
        aria-live="polite"
      >
        {loading ? "BroBot is thinking..." : ""}
      </div>
    </div>
  );
}
