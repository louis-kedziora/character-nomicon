import React, { useState, useEffect } from "react";
import { StyledCharacterFab } from "components/StyledComponents";

export const CharacterBox = ({ values }) => {
  const { characterID } = values;
  const [character, setCharacter] = useState({});
  const [isFetched, setIsFetched] = useState(false);

  useEffect(() => {
    const userCharacters = JSON.parse(sessionStorage.getItem("userCharacters"));
    const storedCharacter = userCharacters.find(
      (character) => character._id === characterID
    );
    setCharacter(storedCharacter);
    sessionStorage.setItem(characterID, JSON.stringify(storedCharacter));
    setIsFetched(true);
  }, [characterID]);

  function onClickHandler() {

    sessionStorage.setItem("currentCharacterID", JSON.stringify(characterID));

    sessionStorage.setItem("currentCharacter", JSON.stringify(character));

  }

  return (
    <div>
      {isFetched && (
        <StyledCharacterFab
          variant="extended"
          href="/attributes"
          onClick={onClickHandler}
        >
          <h1>{character.name}</h1>
          <h2>{character.race}</h2>
          <h2>{character.characterClass}</h2>
        </StyledCharacterFab>
      )}
    </div>
  );
};
