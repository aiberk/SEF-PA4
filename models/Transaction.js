"use strict";
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;
const TransactionCategories = require("../models/TransactionCategories");

var transactionSchema = Schema({
  userId: ObjectId,
  title: String,
  amount: Number,
  priority: Number,
  date: Date,
  description: String,
  category: { type: ObjectId, ref: "TransactionCategories" },
});

module.exports = mongoose.model("Transaction", transactionSchema);
