import { useState } from "react";

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

export default function FinanceBroChatBot() {
  const [messages, setMessages] = useState([
    { from: "bot", text: "Yo bro! Ask me anything about stacking those savings." },
  ]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;
    const userMsg = { from: "user", text: input };
    const botMsg = {
      from: "bot",
      text: broPhrases[Math.floor(Math.random() * broPhrases.length)],
    };
    setMessages([...messages, userMsg, botMsg]);
    setInput("");
  };

  return (
    <div style={{ border: "2px solid purple", padding: 10, borderRadius: 10, maxWidth: 400 }}>
      <div style={{ height: 300, overflowY: "auto", marginBottom: 10, backgroundColor: "#111", color: "white", padding: 10 }}>
        {messages.map((msg, idx) => (
          <div key={idx} style={{ textAlign: msg.from === "bot" ? "left" : "right", margin: "5px 0" }}>
            <b style={{ color: msg.from === "bot" ? "violet" : "orange" }}>{msg.from === "bot" ? "BroBot" : "You"}:</b> {msg.text}
          </div>
        ))}
      </div>
      <input
        value={input}
        onChange={e => setInput(e.target.value)}
        placeholder="Ask me bro stuff..."
        style={{ width: "calc(100% - 60px)", marginRight: 10, padding: 5 }}
        onKeyDown={e => { if (e.key === "Enter") handleSend(); }}
      />
      <button onClick={handleSend} style={{ padding: "5px 10px", backgroundColor: "purple", color: "white", cursor: "pointer" }}>
        Send
      </button>
    </div>
  );
}
