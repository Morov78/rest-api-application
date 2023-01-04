const User = require("../service/schemas/user");

const validateEmail = async (req, res, next) => {
  try {
    const { email } = req.body;

    await User.validate({ email });
  } catch (error) {
    if (error.errors.email) {
      res.status(400).json({ message: "missing required field email" });
    }
  }
  next();
};
const validateUser = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    await User.validate({
      email,
      password,
      verificationToken: 0,
      avatarURL: 0,
    });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }

  next();
};

const ValidateSubscription = async (req, res, next) => {
  const { subscription } = req.body;

  if (!subscription) {
    return res.status(400).json({ message: "Missing field subscription" });
  }

  const subscriptionEnumOptions = User.schema.path("subscription").options.enum;

  if (!subscriptionEnumOptions.includes(subscription)) {
    return res
      .status(400)
      .json({ message: `Subscription can be ${[...subscriptionEnumOptions]}` });
  }

  next();
};

module.exports = { validateUser, ValidateSubscription, validateEmail };
