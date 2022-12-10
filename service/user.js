const User = require("./schemas/user");

const getUser = async (email) => {
  return await User.findOne({ email });
};

const addUser = async (email, password) => {
  const newUser = new User({ email });

  newUser.setPassword(password);

  return await newUser.save();
};

const updateToken = async (id, token = null) => {
  return User.findByIdAndUpdate(id, { token }, { returnDocument: "after" });
};

const updateStatusSubscription = async (id, subscription) => {
  return await User.findByIdAndUpdate(
    id,
    { subscription },
    { returnDocument: "after", runValidators: true }
  );
};

module.exports = {
  getUser,
  addUser,
  updateToken,
  updateStatusSubscription,
};
