import React, { useState, useEffect} from "react";
import Container from "@mui/material/Container";
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
    <Container width="100%" disableGutters maxWidth={false}>
      {isFetched && (
        <Fab
          variant="extended"
          href="/attributes"
          sx={{
            height: "25%",
            width: "50%",
            left: "25%",
            float: "center",
            display: "block",
            marginTop: "25px",
            marginLeft: "25px",
            textAlign: "left",
          }}
          onClick={onClickHandler}
        >
          <h1>{character.name}</h1>
          <h2>{character.race}</h2>
          <h2>{character.characterClass}</h2>
        </Fab>
      )}
    </Container>
  );
};
