import { useEffect, useState } from 'react';

function App() {
  const [total, setTotal] = useState(0);
  const [amount, setAmount] = useState('');
  const [status, setStatus] = useState('');
  const [history, setHistory] = useState([]);
  const [goal, setGoal] = useState(1000);
  const [goalInput, setGoalInput] = useState('');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const totalRes = await fetch('http://localhost:3001/api/total');
    const totalData = await totalRes.json();
    setTotal(totalData.total);

    const historyRes = await fetch('http://localhost:3001/api/history');
    const historyData = await historyRes.json();
    setHistory(historyData.history || []);

    const savedGoal = localStorage.getItem('goal');
    if (savedGoal) setGoal(parseFloat(savedGoal));
  };

  const handleSave = async () => {
    const value = parseFloat(amount);
    if (isNaN(value) || value <= 0) {
      setStatus('❌ Invalid amount');
      return;
    }

    await fetch('http://localhost:3001/api/save', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ amount: value }),
    });

    setAmount('');
    setStatus(`✅ Saved ₹${value}`);
    loadData();
  };

  const handleClear = async () => {
    if (!window.confirm('Clear all data?')) return;

    await fetch('http://localhost:3001/api/clear', { method: 'POST' });
    setStatus('🧹 Cleared');
    loadData();
  };

  const handleDownloadCSV = () => {
    if (history.length === 0) {
      alert('Nothing to download');
      return;
    }
    let csv = 'Amount,Date\n';
    history.forEach(entry => {
      csv += `${entry.amount},${entry.time}\n`;
    });
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'studentstash_history.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const handleSetGoal = () => {
    const value = parseFloat(goalInput);
    if (isNaN(value) || value <= 0) {
      setStatus('❌ Enter a valid goal');
      return;
    }
    setGoal(value);
    localStorage.setItem('goal', value);
    setGoalInput('');
    setStatus(`🎯 Goal set to ₹${value}`);
  };

  const formatDate = (iso) => new Date(iso).toLocaleString();
  const percent = Math.min(100, Math.floor((total / goal) * 100));

  const buttonStyle = {
    padding: '0.5rem 1rem',
    border: 'none',
    borderRadius: 8,
    cursor: 'pointer',
    transition: 'all 0.3s ease'
  };

  const hoverEffect = {
    boxShadow: '0px 0px 12px rgba(255,255,255,0.5)',
    transform: 'scale(1.05)'
  };

  return (
    <div style={{
      padding: 20,
      fontFamily: 'sans-serif',
      background: 'linear-gradient(135deg, #1e1b4b, #0f172a)',
      color: 'white',
      minHeight: '100vh'
    }}>
      <h1 style={{ color: '#a78bfa', textAlign: 'center', fontSize: '2.5rem' }}>💰 StudentStash</h1>
      <p style={{ textAlign: 'center', fontSize: '1.2rem' }}>
        <strong>Total Saved:</strong> ₹{total}
      </p>

      {/* Goal Tracker */}
      <div style={{ margin: '2rem 0', background: '#312e81', padding: '1rem', borderRadius: '10px' }}>
        <p style={{ fontSize: '1.1rem' }}>🎯 Goal: ₹{goal}</p>
        <div style={{ height: 20, background: '#1e293b', borderRadius: 5 }}>
          <div style={{
            width: `${percent}%`,
            height: '100%',
            background: percent >= 100 ? '#22c55e' : '#3b82f6',
            borderRadius: 5,
            transition: 'width 0.5s ease'
          }} />
        </div>
        <p>{percent}% of goal reached</p>
      </div>

      {/* Goal Input */}
      <div style={{ marginBottom: '1rem', textAlign: 'center' }}>
        <input
          type="number"
          placeholder="Set your goal (₹)"
          value={goalInput}
          onChange={(e) => setGoalInput(e.target.value)}
          style={{
            padding: '0.5rem',
            borderRadius: 8,
            border: 'none',
            outline: 'none',
            width: '200px'
          }}
        />
        <button
          onMouseOver={(e) => Object.assign(e.target.style, hoverEffect)}
          onMouseOut={(e) => Object.assign(e.target.style, { boxShadow: 'none', transform: 'scale(1)' })}
          onClick={handleSetGoal}
          style={{
            ...buttonStyle,
            marginLeft: 10,
            background: '#6366f1',
            color: 'white'
          }}
        >
          Set Goal
        </button>
      </div>

      {/* Saving Actions */}
      <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Amount"
          style={{
            padding: '0.5rem',
            borderRadius: 8,
            border: 'none',
            outline: 'none',
            width: '200px'
          }}
        />
        <button
          onMouseOver={(e) => Object.assign(e.target.style, hoverEffect)}
          onMouseOut={(e) => Object.assign(e.target.style, { boxShadow: 'none', transform: 'scale(1)' })}
          onClick={handleSave}
          style={{
            ...buttonStyle,
            marginLeft: 10,
            background: '#10b981',
            color: 'white'
          }}
        >
          Save
        </button>
        <button
          onMouseOver={(e) => Object.assign(e.target.style, hoverEffect)}
          onMouseOut={(e) => Object.assign(e.target.style, { boxShadow: 'none', transform: 'scale(1)' })}
          onClick={handleClear}
          style={{
            ...buttonStyle,
            marginLeft: 10,
            background: '#ef4444',
            color: 'white'
          }}
        >
          Clear
        </button>
        <button
          onMouseOver={(e) => Object.assign(e.target.style, hoverEffect)}
          onMouseOut={(e) => Object.assign(e.target.style, { boxShadow: 'none', transform: 'scale(1)' })}
          onClick={handleDownloadCSV}
          style={{
            ...buttonStyle,
            marginLeft: 10,
            background: '#3b82f6',
            color: 'white'
          }}
        >
          Download CSV
        </button>
      </div>

      <p style={{ textAlign: 'center', color: '#94a3b8' }}>{status}</p>

      {/* History */}
      <h2 style={{ color: '#a78bfa', marginTop: '2rem' }}>📜 History</h2>
      {history.length === 0 ? (
        <p>No history yet.</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {history.map((h, i) => (
            <li key={i} style={{
              background: '#312e81',
              padding: '0.5rem',
              borderRadius: 6,
              marginBottom: '0.5rem'
            }}>
              ₹{h.amount} on {formatDate(h.time)}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
