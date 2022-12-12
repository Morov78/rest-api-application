const path = require("path");
const fs = require("fs/promises");
const Jimp = require("jimp");

const avatarDir = path.join(process.cwd(), "public", "avatars");

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
    console.log("test1");
    const { subscription, avatarURL } = await service.addUser(email, password);

    console.log("test2");

    res.status(201).json({ user: { email, subscription, avatarURL } });
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

const updateAvatar = async (req, res, next) => {
  try {
    const { filename, path: tempUpload } = req.file;

    const id = req.user._id;

    const [extention] = filename.split(".").reverse();

    const avatarName = `${id}.${extention}`;
    const avatarUpload = path.join(avatarDir, avatarName);

    // await fs.rename(tempUpload, avatarUpload);
    Jimp.read(tempUpload, (error, workfile) => {
      if (error) {
        throw error;
      }

      workfile.resize(250, 250).write(avatarUpload);
    });

    const avatarURL = path.join("avatars", avatarName);

    await service.updateAvatarURL(id, avatarURL);

    res.status(200).json({ avatarURL });
  } catch (error) {
    next(error);
  } finally {
    await fs.unlink(req.file.path);
  }
};

module.exports = {
  registration,
  login,
  logout,
  current,
  updateStatusSubscription,
  updateAvatar,
};
