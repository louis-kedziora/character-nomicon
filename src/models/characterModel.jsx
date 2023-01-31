const mongoose = require("mongoose");

const characterSchema = {
    name: String,
    hpMax: Number
  };
export const Character = mongoose.model("Character", characterSchema);
