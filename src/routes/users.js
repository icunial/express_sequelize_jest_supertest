const express = require("express");
const router = express.Router();

const User = require("../models/User");
const usersController = require("../controllers/users");

const validations = require("../utils/validations");

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

// Create User
router.post("/", async (req, res, next) => {
  const user = req.body;

  if (validations.validateName(user.name)) {
    return res.status(400).json({
      statusCode: 400,
      msg: validations.validateName(user.name),
    });
  }

  if (validations.validateEmail(user.email)) {
    return res.status(400).json({
      statusCode: 400,
      msg: validations.validateEmail(user.email),
    });
  }

  if (validations.validateAge(user.age)) {
    return res.status(400).json({
      statusCode: 400,
      msg: validations.validateAge(user.age),
    });
  }

  if (validations.validatesPhone(user.phone)) {
    return res.status(400).json({
      statusCode: 400,
      msg: validations.validatesPhone(user.phone),
    });
  }

  try {
    const userCreated = await User.create({
      ...user,
    });
    return res.status(201).json({
      statusCode: 201,
      data: userCreated,
    });
  } catch (error) {
    console.log(error.message);
    return next(new Error("Error trying to create a new user!"));
  }
});

// Delete User
router.delete("/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    const result = await usersController.deleteUserFromDbById(id);
    res.status(200).json({
      statusCode: 200,
      data: result,
    });
  } catch (error) {
    return next(error);
  }
});

// Update a user
router.put("/:id", async (req, res, next) => {
  const { id } = req.params;
  const body = req.body;

  try {
    const result = await User.updateUserFromDb(id, body);
    res.status(200).json({
      statusCode: 200,
      data: result,
    });
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
