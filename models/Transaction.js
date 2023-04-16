"use strict";
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

var transactionSchema = Schema({
  userId: ObjectId,
  title: String,
  amount: Number,
  date: Date,
  description: String,
  category: String,
});

module.exports = mongoose.model("Transaction", transactionSchema);
// Compare this snippet from Groups/SEF-PA04/models/Transaction.js:
