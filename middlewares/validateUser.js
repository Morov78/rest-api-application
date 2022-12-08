const User = require("../service/schemas/user");

const validateUser = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    await User.validate({ email, password });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }

  next();
};

module.exports = validateUser;
