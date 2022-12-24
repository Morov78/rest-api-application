const gravatar = require("gravatar");

const User = require("./schemas/user");

const getUser = async (email) => {
  return await User.findOne({ email });
};

const addUser = async (email, password, verificationToken) => {
  const avatarURL = await gravatar.url(email);

  const newUser = new User({ email, avatarURL, verificationToken });

  newUser.setPassword(password);

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

const getUserByVerificationToken = async (verificationToken) => {
  return await User.findOne({ verificationToken });
};

const updateStatusVerify = async (id) => {
  return await User.findByIdAndUpdate(id, {
    verify: true,
    verificationToken: null,
  });
};

module.exports = {
  getUser,
  addUser,
  updateToken,
  updateStatusSubscription,
  updateAvatarURL,
  getUserByVerificationToken,
  updateStatusVerify,
};
