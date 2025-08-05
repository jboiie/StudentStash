const express = require('express');
const cors = require('cors');
require('dotenv').config();

const admin = require("firebase-admin");
const serviceAccount = require("./firebase-service-account.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://stashandspark-default-rtdb.asia-southeast1.firebasedatabase.app"
});

const db = admin.database();
const app = express();
app.use(cors());
app.use(express.json());

// Helper: Get data from Firebase (always with defaults)
async function getData() {
  const snapshot = await db.ref('studentstash').once('value');
  const data = snapshot.val() || {};
  return {
    totalSaved: data.totalSaved || 0,
    history: Array.isArray(data.history) ? data.history : []
  };
}

// Helper: Save data to Firebase
async function saveData(data) {
  await db.ref('studentstash').set(data);
}

// Health check
app.get('/api/ping', (req, res) => {
  res.json({ message: 'Backend is working with Firebase!' });
});

// Save money
app.post('/api/save', async (req, res) => {
  let { amount } = req.body;
  amount = Number(amount);

  if (!amount || isNaN(amount) || amount <= 0) {
    return res.status(400).json({ error: 'Invalid amount' });
  }

  const data = await getData();
  data.totalSaved += amount;
  data.history.push({ amount, time: new Date().toISOString() });

  await saveData(data);
  console.log("💾 Saved to Firebase:", data);
  res.json({ total: data.totalSaved });
});

// Get total saved
app.get('/api/total', async (req, res) => {
  const data = await getData();
  res.json({ total: data.totalSaved });
});

// Get history
app.get('/api/history', async (req, res) => {
  const data = await getData();
  res.json({ history: data.history });
});

// Clear all savings
app.post('/api/clear', async (req, res) => {
  await saveData({ totalSaved: 0, history: [] });
  console.log("🧹 Cleared all savings");
  res.json({ message: 'Cleared' });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
