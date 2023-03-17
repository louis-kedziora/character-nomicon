import React, { useState, useEffect } from "react";
import Container from "@mui/material/Container";

export const CharacterBox = ({ characterID }) => {
  const [character, setCharacter] = useState({});
  const [isFetched, setIsFetched] = useState(false);
  useEffect(() => {
    const userCharacters = JSON.parse(sessionStorage.getItem("userCharacters"));
    setCharacter(userCharacters.find(character => character._id === characterID));
    setIsFetched(true);
  }, [characterID]);
  return (
    <Container>
      {isFetched && (
        <Container>
          <h1>{character.name}</h1>
        </Container>
      )}
    </Container>
  );
};
