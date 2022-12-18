const gravatar = require("gravatar");

const User = require("./schemas/user");

const getUser = async (email) => {
  return await User.findOne({ email });
};

const addUser = async (email, password) => {
  const avatarURL = await gravatar.url(email);

  const newUser = new User({ email, avatarURL });
  console.log("test3");
  newUser.setPassword(password);
  console.log("test4");
  return await newUser.save();
};

const updateToken = async (id, token = null) => {
  return await User.findByIdAndUpdate(
    id,
    { token },
    { returnDocument: "after" }
  );
};

const updateStatusSubscription = async (id, subscription) => {
  return await User.findByIdAndUpdate(
    id,
    { subscription },
    { returnDocument: "after", runValidators: true }
  );
};

const updateAvatarURL = async (id, avatarURL) => {
  return await User.findByIdAndUpdate(id, { avatarURL });
};

module.exports = {
  getUser,
  addUser,
  updateToken,
  updateStatusSubscription,
  updateAvatarURL,
};
