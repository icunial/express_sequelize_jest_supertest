// Validates name property
const validateName = (name) => {
  if (!name) return "Name parameter is missing";
  if (typeof name !== "string") return "Name must be a string!";
  return false;
};

// Validates email
const validateEmail = (email) => {
  if (!email) return "Email parameter is missing";
  if (typeof email !== "string") return "Email must be a string!";
};

// Validates age
const validateAge = (age) => {
  if (!age) return "Age paramete is missing";
  if (typeof age !== "number") return "Age must be a number!";
  if (age < 1 || age > 100) return "Age must be between 1 and 100";
  return false;
};

// Validates phone
const validatesPhone = (phone) => {
  if (!phone) return "Phone parameter is missing!";
  if (typeof phone !== "string") "Phone must be a string!";
  if (phone.length !== 10) "Phone must contain 10 numbers";
};

module.exports = {
  validateName,
  validateAge,
  validateEmail,
  validatesPhone,
};
