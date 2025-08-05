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
    setGoalInput('');
    setStatus(`🎯 Goal set to ₹${value}`);
  };

  const formatDate = (iso) => new Date(iso).toLocaleString();
  const percent = Math.min(100, Math.floor((total / goal) * 100));

  return (
    <div style={{ padding: 20, fontFamily: 'sans-serif' }}>
      <h1>StudentStash</h1>
      <p><strong>Total Saved:</strong> ₹{total}</p>

      {/* Goal Tracker */}
      <div style={{ marginBottom: '1rem' }}>
        <p>🎯 Goal: ₹{goal}</p>
        <div style={{ height: 20, background: '#ddd', borderRadius: 5 }}>
          <div style={{
            width: `${percent}%`,
            height: '100%',
            background: percent >= 100 ? '#22c55e' : '#3b82f6',
            borderRadius: 5
          }} />
        </div>
        <p>{percent}% of goal reached</p>
      </div>

      <div style={{ marginBottom: '1rem' }}>
        <input
          type="number"
          placeholder="Set your goal (₹)"
          value={goalInput}
          onChange={(e) => setGoalInput(e.target.value)}
        />
        <button onClick={handleSetGoal} style={{ marginLeft: 10 }}>Set Goal</button>
      </div>

      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Amount"
      />
      <button onClick={handleSave}>Save</button>
      <button onClick={handleClear} style={{ marginLeft: 10 }}>Clear</button>
      <button onClick={handleDownloadCSV} style={{ marginLeft: 10 }}>Download CSV</button>

      <p>{status}</p>

      <h2>History</h2>
      {history.length === 0 ? (
        <p>No history yet.</p>
      ) : (
        <ul>
          {history.map((h, i) => (
            <li key={i}>₹{h.amount} on {formatDate(h.time)}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
