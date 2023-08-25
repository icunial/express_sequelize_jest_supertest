const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const db = require("./src/db");

const router = require("./src/routes/index");

// Body-Parser Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Router middleware
app.use("/", router);

// Error catching endware
app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || err;
  res.status(status).json({
    statusCode: status,
    msg: message,
  });
});

// Initialized Express Server

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

module.exports = app;
