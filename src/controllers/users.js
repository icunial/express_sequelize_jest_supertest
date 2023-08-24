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

// Get user by id
const findUserByID = async (id) => {
  try {
    const dbResult = await User.findByPk(id);
    const result = [
      {
        id: dbResult.id,
        name: dbResult.name,
        email: dbResult.email,
        age: dbResult.age,
        phone: dbResult.phone,
      },
    ];
    return result;
  } catch (error) {
    throw new Error("Error trying to get a user by id");
  }
};

module.exports = {
  getAllDb,
  findUserByID,
};
