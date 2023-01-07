const { Schema, model } = require("mongoose");
const bCrypt = require("bcryptjs");

const user = new Schema(
  {
    password: {
      type: String,
      required: [true, "Set password for user"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    subscription: {
      type: String,
      enum: ["starter", "pro", "business"],
      default: "starter",
    },
    avatarURL: { type: String, required: true },
    token: {
      type: String,
      default: null,
    },
  },
  { versionKey: false }
);

user.pre("save", async function () {
  console.log(this.isNew);
});

user.methods.setPassword = function (password) {
  this.password = bCrypt.hashSync(password, bCrypt.genSaltSync(6));
};

user.methods.validPassword = function (password) {
  return bCrypt.compareSync(password, this.password);
};

const User = model("user", user);

module.exports = User;
