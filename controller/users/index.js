const createToken = require("../../service/token/createToken");
const service = require("../../service/user");

const registration = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await service.getUser(email);

    if (user) {
      return res.status(409).json({
        message: "Email in use",
      });
    }

    const { subscription } = await service.addUser(email, password);

    res.status(201).json({ user: { email, subscription } });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await service.getUser(email);

    if (!user || !user.validPassword(password)) {
      return res.status(401).json({
        message: "Email or password is wrong",
      });
    }

    const { id, subscription } = user;

    const token = createToken(id);

    await service.updateToken(id, token);

    res.status(200).json({ token, user: { email, subscription } });
  } catch (error) {
    next(error);
  }
};

const logout = async (req, res, next) => {
  try {
    await service.updateToken(req.user.id);

    res.status(204).json();
  } catch (error) {
    next(error);
  }
};

const current = async (req, res, next) => {
  const { email, subscription } = req.user;

  try {
    res.status(200).json({ email, subscription });
  } catch (error) {
    next(error);
  }
};

const updateStatusSubscription = async (req, res, next) => {
  const { subscription } = req.body;
  const userId = req.user._id;

  try {
    const user = await service.updateStatusSubscription(userId, subscription);

    res
      .status(200)
      .json({ email: user.email, subscription: user.subscription });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  registration,
  login,
  logout,
  current,
  updateStatusSubscription,
};
