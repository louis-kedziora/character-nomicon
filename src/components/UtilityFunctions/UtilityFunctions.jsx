export const variableToTitle = (str) => {
  const words = str.split(/(?=[A-Z])/); // split the string into words based on capitalization
  const capitalizedWords = words.map(
    (word) => word.charAt(0).toUpperCase() + word.slice(1)
  ); // capitalize the first letter of each word
  return capitalizedWords.join(" "); // join the words back into a string with a space separator
};

export const rollDice = (numberOfSides) => {
  const randomValues = crypto.getRandomValues(new Uint32Array(1));
  const randomNumber = randomValues[0];
  return Math.floor((randomNumber / 4294967296) * numberOfSides) + 1;
};

export const sortSpells = (currentSpells) => {
  currentSpells.sort((a, b) => {
    // Compare by spellLevel first
    let levelComparison = parseInt(a.spellLevel) - parseInt(b.spellLevel);
    
    if (levelComparison !== 0) {
      // If spellLevel is not the same, sort by spellLevel
      return levelComparison;
    } else {
      // If spellLevel is the same, sort by spellName
      return a.spellName.localeCompare(b.spellName);
    }
  });
  return currentSpells;
}



