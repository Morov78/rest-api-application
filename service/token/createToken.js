const jwt = require("jsonwebtoken");

const secret = process.env.SECRET;

const createToken = (id) => {
  const payload = { id };

  return jwt.sign(payload, secret, { expiresIn: "1h" });
};

module.exports = createToken;
