const express = require("express");
const router = express.Router();

const User = require("../models/User");

// Get All Users
router.get("/", async (req, res, next) => {
  try {
    const dbResults = await usersController.getAllDb();
    if (!dbResults.length) {
      return res.status(404).json({
        statusCode: 404,
        msg: `There are not users saved in the DB!`,
      });
    }
    res.status(200).json({
      statusCode: 200,
      data: dbResults,
    });
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
