import React, { useState, useEffect } from "react";
import axios from "axios";
import Grid from "@mui/material/Unstable_Grid2";
import Container from "@mui/material/Container";

import { SelectionAppBar } from "components/partials";
import { CharacterBox } from "components/SelectionSheet/CharacterBox";

const serverURL = process.env.REACT_APP_SERVER_URL || "http://localhost:4000";
const instance = axios.create({
  baseURL: serverURL,
});

export const SelectionSheet = ({ userInfo }) => {
  const { userID } = userInfo;
  const [characterIDs, setCharacterIDs] = useState({});
  const [isFetched, setIsFetched] = useState(false);

  useEffect(() => {
    const localUser = JSON.parse(sessionStorage.getItem(userID));
    const characterIDs = [...localUser.userCharacters];
    setCharacterIDs(characterIDs);

    async function fetchCharacterData() {
      const request = await instance.post("/api/characters/getmany", {
        characterIDs: characterIDs,
      });
      sessionStorage.setItem("userCharacters", JSON.stringify(request.data));
      setIsFetched(true);
      return request;
    }
    fetchCharacterData();
  }, [userID]);

  return (
    <Container width="100%" disableGutters maxWidth={false}>
      <SelectionAppBar />
      {isFetched && (
        <Grid container spacing={1}>
          {characterIDs.map((characterID, index) => (
            <Grid
              item
              key={index}
              xs={6}
              sx={{
                justifyContent: "right",
              }}
            >
              <CharacterBox
                values={{ characterID: characterID }}
              />
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};
