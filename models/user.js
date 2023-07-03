const { Schema, model } = require("mongoose");
const Joi = require("joi");

const { handleMongooseError } = require("../helpers");

const emailRegexp = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,4})+$/;
const subscription = ["starter", "pro", "business"];

const userSchema = new Schema(
  {
    email: {
      type: String,
      match: emailRegexp,
      required: [true, "Email is required"],
      unique: true,
    },
    subscription: {
      type: String,
      enum: subscription,
      default: "starter",
    },
    password: {
      type: String,
      minlength: 6,
      required: [true, "Set password for user"],
    },
    avatarUrl: String,
    token: String,
  },
  { versionKey: false, timestamps: true }
);

userSchema.post("save", handleMongooseError);

const registerSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
  subscription: Joi.string().valid(...subscription),
  password: Joi.string().min(6).required(),
});

const loginSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().min(6).required(),
});

const updateSubscriptionSchema = Joi.object({
  subscription: Joi.string()
    .valid(...subscription)
    .required(),
});

const updateAvatarSchema = Joi.object({
  avatarUrl: Joi.string().required(),
});

const authJoiSchemas = {
  loginSchema,
  registerSchema,
  updateSubscriptionSchema,
  updateAvatarSchema,
};

const User = model("user", userSchema);

module.exports = {
  User,
  authJoiSchemas,
};
