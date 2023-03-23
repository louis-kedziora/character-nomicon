import React, { useState, useEffect } from "react";
import axios from "axios";
import Grid from "@mui/material/Unstable_Grid2";
import Container from "@mui/material/Container";
import Fab from "@mui/material/Fab";

import { SelectionAppBar } from "components/partials";
import { CharacterBox } from "components/SelectionSheet/CharacterBox";
import { EditSheet } from "components/EditSheet";

const serverURL = process.env.REACT_APP_SERVER_URL || "http://localhost:4000";
const instance = axios.create({
  baseURL: serverURL,
});

export const SelectionSheet = ({ userInfo }) => {
  const { userID } = userInfo;
  const [characterIDs, setCharacterIDs] = useState({});
  const [isFetched, setIsFetched] = useState(false);
  const [open, setOpen] = useState(false);
  const openHandler = () => setOpen(true);
  const closeHandler = () => setOpen(false);

  const submitFormHandler = (event) => {
    if (event.currentTarget.value === "Saved") {
    }
    setOpen(false);
  };

  useEffect(() => {
    const localUser = JSON.parse(sessionStorage.getItem(userID));
    sessionStorage.setItem("currentUser", JSON.stringify(userID));

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
              display="flex"
              justifyContent="center"
              alignItems="center"
              xs={6}
            >
              <CharacterBox values={{ characterID: characterID }} />
            </Grid>
          ))}
          <Grid item xs={12}>
            <Grid
              display="flex"
              justifyContent="center"
              alignItems="center"
              xs={12}
              sx={{
                height: "25%",
                width: "100%",
                margin: "25px",
                padding: "20px",
              }}
            >
              <Fab
                size="large"
                color="primary"
                variant="extended"
                onClick={openHandler}
              >
                <h1>New Character</h1>
              </Fab>
              {open && (
                <EditSheet
                  info={{
                    submitFormHandler: submitFormHandler,
                    open: open,
                    closeHandler: closeHandler
                  }}
                ></EditSheet>
              )}
            </Grid>
          </Grid>
        </Grid>
      )}
    </Container>
  );
};
