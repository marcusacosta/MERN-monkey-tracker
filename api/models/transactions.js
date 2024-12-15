const { Schema, model } = require("mongoose");

const TransactionsSchema = new Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  datetime: { type: Date, required: true },
});

const TransactionsModel = model('Transaction', TransactionsSchema);

module.exports = TransactionsModel;
