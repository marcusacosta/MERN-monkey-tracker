require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const Transaction = require('./models/Transaction.js');

const app = express();

app.use(cors());
app.use(express.json());

// Connect to MongoDB once at startup
async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log('Connected to MongoDB');
  } catch (err) {
    console.error('DB Connection Error:', err);
    process.exit(1); // Exit process with failure
  }
}

connectDB();

// Test Route
app.get('/api/test', (req, res) => {
  res.json('test ok');
});

// POST Route to Create a Transaction
app.post('/api/transaction', async (req, res) => {
  try {
    const { name, description, datetime, price } = req.body;
    const transaction = await Transaction.create({ name, description, datetime, price });
    res.json(transaction);
  } catch (error) {
    console.error('Error creating transaction:', error);
    res.status(500).json({ error: 'Failed to create transaction' });
  }
});

// GET Route to Fetch All Transactions
app.get('/api/transactions', async (req, res) => {
  try {
    const transactions = await Transaction.find({}).sort({ datetime: -1 });
    res.json(transactions);
  } catch (error) {
    console.error('Error fetching transactions:', error);
    res.status(500).json({ error: 'Failed to fetch transactions' });
  }
});

// Start the Server
const PORT = process.env.PORT || 4040;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
