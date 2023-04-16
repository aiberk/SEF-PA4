"use strict";
const express = require("express");
const router = express.Router();
const Transaction = require("../models/Transaction");

isLoggedIn = (req, res, next) => {
  if (res.locals.loggedIn) {
    next();
  } else {
    res.redirect("/login");
  }
};

router.get("/transactions/", isLoggedIn, async (req, res, next) => {
  const show = req.query.show;
  const completed = show == "completed";
  let transactions = [];
  if (show) {
    transactions = await Transaction.find({
      userId: req.user._id,
      approved: !completed,
    }).sort({
      date: -1,
    });
  } else {
    transactions = await Transaction.find({ userId: req.user._id }).sort({
      date: -1,
    });
  }
  res.render("transactions", { transactions, show, completed });
});

router.post("/transactions", isLoggedIn, async (req, res, next) => {
  const transaction = new Transaction({
    userId: req.user._id,
    title: req.body.title,
    amount: req.body.amount,
    date: req.body.date,
    description: req.body.description,
    category: req.body.category,
  });
  await transaction.save();
  res.redirect("/transactions");
});

router.get(
  "/transactions/remove/:transactionId",
  isLoggedIn,
  async (req, res, next) => {
    await Transaction.deleteOne({ _id: req.params.transactionId });
    res.redirect("/transactions");
  }
);

router.get(
  "/transactions/approve/:transactionId",
  isLoggedIn,
  async (req, res, next) => {
    await Transaction.findOneAndUpdate(
      { _id: req.params.transactionId },
      { $set: { approved: true } }
    );
    res.redirect("/transactions");
  }
);

router.get(
  "/transactions/disapprove/:transactionId",
  isLoggedIn,
  async (req, res, next) => {
    await Transaction.findOneAndUpdate(
      { _id: req.params.transactionId },
      { $set: { approved: false } }
    );
    res.redirect("/transactions");
  }
);

router.get(
  "/transactions/edit/:transactionId",
  isLoggedIn,
  async (req, res, next) => {
    const transaction = await Transaction.findById(req.params.transactionId);
    res.render("editTransaction", { transaction });
  }
);

router.post(
  "/transactions/updateTransaction",
  isLoggedIn,
  async (req, res, next) => {
    const { transactionId, title, amount, date, description, category } =
      req.body;
    await Transaction.findOneAndUpdate(
      { _id: transactionId },
      { $set: { title, amount, date, description, category } }
    );
    res.redirect("/transactions");
  }
);

module.exports = router;
