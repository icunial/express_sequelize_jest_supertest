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
  const result = [];
  try {
    const dbResult = await User.findByPk(id);
    if (dbResult) {
      result.push({
        id: dbResult.id,
        name: dbResult.name,
        email: dbResult.email,
        age: dbResult.age,
        phone: dbResult.phone,
      });
    }

    return result;
  } catch (error) {
    throw new Error("Error trying to get a user by id");
  }
};

// Delete user by id
const deleteUserFromDbById = async (id) => {
  let result = [];
  try {
    result = await findUserByID(id);
    if (result.length === 1) {
      const userDeleted = await User.destroy({
        where: {
          id,
        },
      });
    }

    return result;
  } catch (error) {
    throw new Error("Error trying to delete user from DB!");
  }
};

// Update a user by id
const updateUserFromDb = async (id, body) => {
  try {
    const userUpdated = await User.update(
      {
        ...body,
      },
      {
        where: {
          id,
        },
      }
    );
    if (userUpdated) {
      const userFound = await findUserByID(id);
      return userFound;
    }
  } catch (error) {
    throw new Error("Error updating a user!");
  }
};

module.exports = {
  getAllDb,
  findUserByID,
  deleteUserFromDbById,
  updateUserFromDb,
};
