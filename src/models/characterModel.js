
const characterSchema = {
  name: String,
  hpMax: Number,
  currentHP: Number,
  str: Number,
  int: Number,
  dex: Number,
  wis: Number,
  con: Number,
  char: Number,
  ac: Number,
  speed: Number,
  level: Number,
  hitDice: String,
  maxHitDice: Number,
  currentHitDice: Number,
  trainedSkills: {
      perception: Boolean,
      investigation: Boolean
  }
};

module.exports = (mongoose) => {
  const Character = mongoose.model("Character", characterSchema);
  return Character;
};
