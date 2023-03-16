import React, { useState, useEffect } from "react";
import axios from "axios";
import Grid from "@mui/material/Unstable_Grid2";
import Container from "@mui/material/Container";

import { CharacterBox } from "components/SelectionSheet/CharacterBox";

const serverURL = process.env.REACT_APP_SERVER_URL || "http://localhost:4000";
const instance = axios.create({
  baseURL: serverURL + "/api/users/get",
});

export const SelectionSheet = ({ userInfo }) => {
  const { userID } = userInfo;
  const [user, setUser] = useState({});
  const [isFetched, setIsFetched] = useState(false);

  useEffect(() => {
    const localUser = JSON.parse(sessionStorage.getItem(userID));
    setUser(localUser);
    const characterIDs = localUser.userCharacters;
    let userCharacters = [];
    async function fetchCharacterData() {
      let request = {};
      await characterIDs.forEach((currentID) => {
        request = instance.post("/", { userID: currentID });
        console.log("request.data");
        console.log(request.data);
        userCharacters[currentID] = request.data;
      });
      return request;
    }
    sessionStorage.setItem("userCharacters", JSON.stringify(userCharacters));
    setIsFetched(true);
    fetchCharacterData();
  }, [userID]);
  return (
    <Container width="100%" maxWidth={false} sx={{ ml: 0 }}>
      <h1>Selection Sheet</h1>
      {isFetched && (
        <Grid container spacing={1}>
          {user.userCharacters.map((characterID, index) => (
            <Grid key={index} xs={12}>
              <CharacterBox characterID={characterID}></CharacterBox>
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};
