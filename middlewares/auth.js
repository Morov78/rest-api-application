const jwt = require("jsonwebtoken");

const secret = process.env.SECRET;

const User = require("../service/schemas/user");

const auth = async (req, res, next) => {
  try {
    const [typeToken, token] = req.headers.authorization?.split(" ") || "";

    if (token && typeToken === "Bearer") {
      const decoded = jwt.decode(token, secret);

      if (decoded) {
        const user = await User.findOne({ _id: decoded.id });

        if (token === user.token) {
          req.user = user;

          return next();
        }
      }
    }

    res.status(401).json({ message: "Not authorized" });
  } catch (error) {
    next(error);
  }
};

module.exports = auth;
