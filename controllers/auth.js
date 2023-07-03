const bcrypt = require("bcrypt");
const jimp = require("jimp");
const jwt = require("jsonwebtoken");
const gravatar = require("gravatar");
const path = require("path");
const fs = require("fs/promises");
const { User } = require("../models");
const { HttpError, ctrlWrapper } = require("../helpers");

const { SECRET_KEY } = process.env;

const register = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw HttpError(409, "Email already in use");
  }

  const hashPassword = await bcrypt.hash(password, 10);

  const avatarUrl = gravatar.url(email);

  const newUser = await User.create({
    ...req.body,
    password: hashPassword,
    avatarUrl,
  });
  res.status(201).json({
    email: newUser.email,
    subscription: newUser.subscription,
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    throw HttpError(401, "Email or password is wrong");
  }

  const passwordCompare = await bcrypt.compare(password, user.password);
  if (!passwordCompare) {
    throw HttpError(401, "Email or password is wrong");
  }

  const { subscription } = user;
  const payload = {
    id: user._id,
  };
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "24h" });
  await User.findByIdAndUpdate(user._id, { token });
  res.json({ token, user: { email, subscription } });
};

const logout = async (req, res) => {
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { token: "" });
  res.status(204).json();
};

const getUser = async (req, res) => {
  const { email, subscription } = req.user;
  res.json({
    email,
    subscription,
  });
};

const updateUserSubscription = async (req, res) => {
  const { _id } = req.user;
  const result = await User.findByIdAndUpdate(_id, req.body, {
    new: true,
  });
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json(result);
};

const updateUserAvatar = async (req, res) => {
  const { _id } = req.user;
  const { path: tempUpload, originalname } = req.file;

  await jimp
    .read(tempUpload)
    .then((image) => {
      return image.resize(250, 250).write(tempUpload);
    })
    .catch((err) => err);

  const uniqFileName = `${_id}_${originalname}`;
  const avatarDir = path.join(__dirname, "../", "public", "avatars");
  const resultUpload = path.join(avatarDir, uniqFileName);
  await fs.rename(tempUpload, resultUpload);
  const avatarUrl = path.join("avatars", uniqFileName);

  const result = await User.findByIdAndUpdate(_id, { avatarUrl });
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json({ avatarUrl });
};

module.exports = {
  register: ctrlWrapper(register),
  login: ctrlWrapper(login),
  logout: ctrlWrapper(logout),
  getUser: ctrlWrapper(getUser),
  updateUserSubscription: ctrlWrapper(updateUserSubscription),
  updateUserAvatar: ctrlWrapper(updateUserAvatar),
};
