
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
  maxOneSpellSlots: Number,
  currentOneSpellSlots: Number,
  maxTwoSpellSlots: Number,
  currentTwoSpellSlots: Number,
  maxThreeSpellSlots: Number,
  currentThreeSpellSlots: Number,
  trainedSkills: {
      perception: Boolean,
      investigation: Boolean
  },
  maxWildShapes: Number,
  currentWildShapes: Number,
  maxGuidingBolts: Number,
  currentGuidingBolts: Number,
  maxCosmicOmens: Number,
  currentCosmicOmens: Number
};

module.exports = (mongoose) => {
  const Character = mongoose.model("Character", characterSchema);
  return Character;
};
