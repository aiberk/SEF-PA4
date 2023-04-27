"use strict";
const express = require("express");
const router = express.Router();
const Transaction = require("../models/Transaction");
// const TransactionCategories = require("../models/TransactionCategories");
// const TransactionCategory = require("../models/TransactionCategories");
const TransactionCategory = require("../models/TransactionCategories");

/**
 * Middleware function to check if user is authenticated.
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 * @param {function} next - Express next function.
 */
isLoggedIn = (req, res, next) => {
  if (res.locals.loggedIn) {
    next();
  } else {
    res.redirect("/login");
  }
};

/**
 * Route to retrieve and render user's transactions.
 * @name GET/transactions/
 * @function
 * @memberof module:routes
 * @inner
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 * @param {function} next - Express next function.
 */
router.get("/transactions/", isLoggedIn, async (req, res, next) => {
  const show = req.query.show;
  const completed = show == "completed";
  let transactions = [];
  if (show) {
    transactions = await Transaction.find({
      userId: req.user._id,
      approved: !completed,
    })
      .populate("category") // Populate the category data
      .sort({
        date: -1,
      })
      .lean(); // Convert the Mongoose document to a plain JS object
  } else {
    transactions = await Transaction.find({ userId: req.user._id })
      .populate("category") // Populate the category data
      .sort({
        date: -1,
      })
      .lean(); // Convert the Mongoose document to a plain JS object
  }

  // Extract the value of the 'category' key
  transactions = transactions.map((transaction) => {
    transaction.category = transaction.category.category;
    return transaction;
  });

  res.render("transactions", { transactions, show, completed });
});

/**
 * Route to create a new transaction.
 * @name POST/transactions/
 * @function
 * @memberof module:routes
 * @inner
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 * @param {function} next - Express next function.
 */
router.post("/transactions", isLoggedIn, async (req, res, next) => {
  const categoryName = req.body.category;
  let category = await TransactionCategory.findOne({
    category: categoryName,
  });

  if (!category) {
    category = await TransactionCategory.create({ category: categoryName });
  }

  const transaction = new Transaction({
    userId: req.user._id,
    title: req.body.title,
    amount: req.body.amount,
    priority: req.body.priority,
    date: req.body.date,
    description: req.body.description,
    category: category._id,
  });

  await transaction.save();
  res.redirect("/transactions");
});

router.get("/transactions/byCategory", isLoggedIn, async (req, res, next) => {
  try {
    const transactions = await Transaction.find().populate("category");
    const categories = await TransactionCategory.aggregate([
      {
        $lookup: {
          from: "transactions",
          localField: "_id",
          foreignField: "category",
          as: "transactions",
        },
      },
      {
        $unwind: {
          path: "$transactions",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $group: {
          _id: { _id: "$_id", name: "$name" },
          totalAmount: { $sum: "$transactions.amount" },
        },
      },
      {
        $project: {
          _id: "$_id._id",
          name: "$_id.name",
          totalAmount: 1,
        },
      },
    ]);

    console.log(categories);
    console.log(transactions);
    // add category name to each object in categories array
    for (let i = 0; i < categories.length; i++) {
      const categoryObj = await TransactionCategory.findById(categories[i]._id);
      categories[i].name = categoryObj.category;
    }

    res.render("transactionsbyCategory", { categories });
  } catch (err) {
    next(err);
  }
});

/**
 * Route to delete a transaction with the given ID.
 * @name GET/transactions/remove/:transactionId
 * @function
 * @memberof module:routes
 * @inner
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 * @param {function} next - Express next function.
 */
router.get(
  "/transactions/remove/:transactionId",
  isLoggedIn,
  async (req, res, next) => {
    await Transaction.deleteOne({ _id: req.params.transactionId });
    res.redirect("/transactions");
  }
);

/**
 * Route to approve a transaction with the given ID.
 * @name GET/transactions/approve/:transactionId
 * @function
 * @memberof module:routes
 * @inner
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 * @param {function} next - Express next function.
 */
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

/**
 * Route to disapprove a transaction with the given ID.
 * @name GET/transactions/disapprove/:transactionId
 * @function
 * @memberof module:routes
 * @inner
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 * @param {function} next - Express next function.
 */
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

/**
 * Route to retrieve and render the edit transaction page.
 * @name GET/transactions/edit/:transactionId
 * @function
 * @memberof module:routes
 * @inner
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 * @param {function} next - Express next function.
 */
router.get(
  "/transactions/edit/:transactionId",
  isLoggedIn,
  async (req, res, next) => {
    const transaction = await Transaction.findById(req.params.transactionId);
    res.render("editTransaction", { transaction });
  }
);

/**
 * Route to update a transaction with the given ID.
 * @name POST/transactions/updateTransaction
 * @function
 * @memberof module:routes
 * @inner
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 * @param {function} next - Express next function.
 */
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
