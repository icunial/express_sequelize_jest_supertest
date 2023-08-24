const express = require("express");
const router = express.Router();

const usersRouter = require("./users");

// Specify router root route
router.use("/users", usersRouter);

module.exports = router;
