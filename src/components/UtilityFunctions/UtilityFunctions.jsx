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


