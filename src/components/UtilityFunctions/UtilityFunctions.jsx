export const variableToTitle = (str) => {
  const words = str.split(/(?=[A-Z])/); // split the string into words based on capitalization
  const capitalizedWords = words.map(
    (word) => word.charAt(0).toUpperCase() + word.slice(1)
  ); // capitalize the first letter of each word
  return capitalizedWords.join(" "); // join the words back into a string with a space separator
};
