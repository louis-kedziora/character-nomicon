import React, { useState, useEffect } from "react";
import { StyledFab } from "components/StyledComponents";

export const CharacterBox = ({ values }) => {
  const { characterID } = values;
  const [character, setCharacter] = useState({});
  const [isFetched, setIsFetched] = useState(false);

  useEffect(() => {
    const userCharacters = JSON.parse(sessionStorage.getItem("userCharacters"));
    console.log("CharacterBox:");
    const storedCharacter = userCharacters.find(
      (character) => character._id === characterID
    );
    setCharacter(storedCharacter);
    sessionStorage.setItem(characterID, JSON.stringify(storedCharacter));
    setIsFetched(true);
  }, [characterID]);

  function onClickHandler() {
    sessionStorage.setItem("currentCharacter", JSON.stringify(characterID));
  }

  return (
    <div>
      {isFetched && (
        <StyledFab className="selectionBox"
          variant="extended"
          href="/attributes"
          onClick={onClickHandler}
          sx={{
            height: "25%",
            width: "100%",
            margin: "25px",
            padding: "20px",
            display: "block",
            backgroundColor: "#0f111a",
          }}
        >
          <h1>{character.name}</h1>
          <h2>{character.race}</h2>
          <h2>{character.characterClass}</h2>
        </StyledFab>
      )}
    </div>
  );
};
