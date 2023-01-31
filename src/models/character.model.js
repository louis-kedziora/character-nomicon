const mongoose = require("mongoose");
const characterSchema = {
    name: String,
    hpMax: Number
  };
const Character = mongoose.model("Character", characterSchema);
export default Character;
