const mongoose = require("mongoose");
const { getSchema } = require("./characterModel.js");

const userSchema = {
  fname: String,
  lname: String,
  email: String,
  userCharacters: [getSchema()],
};

exports.getUserModel = () => {
  const User = mongoose.model("User", userSchema);
  return User;
};
