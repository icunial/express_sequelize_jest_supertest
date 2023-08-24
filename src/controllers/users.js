const User = require("../models/User");

// Get all users from DB
const getAllDb = async () => {
  const results = [];
  try {
    const dbResults = await User.findAll();
    dbResults.forEach((r) => {
      results.push({
        id: r.id,
        name: r.name,
        email: r.email,
        age: r.age,
        phone: r.phone,
      });
    });
    return results;
  } catch (error) {
    throw new Error("Error trying to get all users from DB!");
  }
};

module.exports = {
  getAllDb,
};
