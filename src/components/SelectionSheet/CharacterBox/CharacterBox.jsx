import React, { useState, useEffect } from "react";
import Fab from "@mui/material/Fab";

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
    sessionStorage.setItem("currentCharacter", JSON.stringify(characterID));
  }

  return (
    <div>
      {isFetched && (
        <Fab
          variant="extended"
          href="/attributes"
          onClick={onClickHandler}
          sx={{
            height: "25%",
            width: "100%",
            margin: "25px",
            padding: "20px",
            display: "block",
          }}
        >
          <h1>{character.name}</h1>
          <h2>{character.race}</h2>
          <h2>{character.characterClass}</h2>
        </Fab>
      )}
    </div>
  );
};
