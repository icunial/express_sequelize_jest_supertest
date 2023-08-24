const express = require("express");
const router = express.Router();

const User = require("../models/User");

// Get user by ID
router.get("/:id", async (req, res, next) => {
  const { id } = req.params;
  let result = [];

  try {
    result = await usersController.findUserByID(id);
    if (!result.length) {
      return res.status(404).json({
        statusCode: 404,
        msg: `User with ID: ${id} not found!`,
      });
    }
    res.status(200).json({
      statusCode: 200,
      data: result,
    });
  } catch (error) {
    return next(error);
  }
});

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
