import React, { useState, useEffect } from "react";
import axios from "axios";
import Grid from "@mui/material/Unstable_Grid2";

import { CharacterBox } from "components/SelectionSheet/CharacterBox";
import { EditSheet } from "components/EditSheet";
import { createNewCharacter, updateUser } from "components/DBHandler";
import { StyledFab, StyledSheetContainer } from "components/StyledComponents";
import { characterFormData } from "components/SelectionSheet/CharacterFormData";

const mongoose = require("mongoose");
const serverURL = process.env.REACT_APP_SERVER_URL || "http://localhost:4000";
const instance = axios.create({
  baseURL: serverURL,
});

export const SelectionSheet = ({ userInfo }) => {
  const { userID } = userInfo;
  const [characterIDs, setCharacterIDs] = useState({});
  const [noCharacters, setNoCharacters] = useState(false);
  const [currentUserID, setCurrentUserID] = useState("");
  const [isFetched, setIsFetched] = useState(false);
  const [cancelClicked, setCancelClicked] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const localUser = JSON.parse(sessionStorage.getItem(userID));
    sessionStorage.setItem("currentUser", JSON.stringify(userID));
    setCurrentUserID(userID);
    const characterIDs = [...localUser.userCharacters];
    setCharacterIDs(characterIDs);
    if (characterIDs.length < 1) setNoCharacters(true);
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

  const openHandler = () => {
    setCancelClicked(false);
    setOpen(true);
  };
  const cancelHandler = () => {
    setCancelClicked(true);
    setOpen(false);
  };

  const submitFormHandler = (event) => {
    event.preventDefault();
    if (!cancelClicked) {
      let newCharacter = { trainedSkills: {}, savingThrowProficiency: {} };
      const formData = event.target.elements;
      for (let index = 0; index < formData.length; index++) {
        const element = formData[index];
        if (element.type === "checkbox") {
          if (element.value === "skills") {
            newCharacter["trainedSkills"][element.name] = element.checked;
          } else if (element.value === "savingThrow") {
            newCharacter["savingThrowProficiency"][element.name] =
              element.checked;
          }
        } else {
          newCharacter[element.name] = element.value;
        }
      }

      delete newCharacter[""];
      delete newCharacter.cancelButton;
      newCharacter["currentHP"] = newCharacter.hpMax;
      newCharacter["notes"] = "";
      newCharacter["features"] = "";
      newCharacter["loot"] = "";
      newCharacter["partyLoot"] = "";
      newCharacter["customResources"] = [];
      newCharacter["attacks"] = [];
      newCharacter["spells"] = [];
      newCharacter["tempHP"] = 0;
      newCharacter["deathSaveSuccesses"] = 0;
      newCharacter["deathSaveFailures"] = 0;

      const mongooseID = mongoose.Types.ObjectId();
      createNewCharacter(newCharacter, mongooseID);
      const newCharacterIDs = [...characterIDs, mongooseID.toString()];
      updateUser("userCharacters", newCharacterIDs, currentUserID);
      const userCharacters = JSON.parse(
        sessionStorage.getItem("userCharacters")
      );
      sessionStorage.setItem(
        "userCharacters",
        JSON.stringify([...userCharacters, newCharacter])
      );
      setCharacterIDs(newCharacterIDs);
    }
    setNoCharacters(false);
    setOpen(false);
  };

  return (
    <div>
      <StyledSheetContainer maxWidth={false}>
        {isFetched && (
          <div>
            {!noCharacters && (
              <Grid container>
                {characterIDs.map((characterID, index) => (
                  <Grid
                    item
                    key={index}
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    xs={12}
                    md={6}
                    xl={4}
                    spacing={1}
                  >
                    <CharacterBox values={{ characterID: characterID }} />
                  </Grid>
                ))}
              </Grid>
            )}
            <Grid item xs={12}>
              <Grid
                display="flex"
                justifyContent="center"
                alignItems="center"
                xs="auto"
                sx={{
                  height: "25%",
                  width: "100%",
                  margin: "25px",
                  padding: "20px",
                }}
              >
                <StyledFab
                  size="large"
                  color="primary"
                  variant="extended"
                  onClick={openHandler}
                >
                  New Character
                </StyledFab>
                {open && (
                  <EditSheet
                    info={{
                      submitFormHandler: submitFormHandler,
                      open: open,
                      cancelHandler: cancelHandler,
                      characterInfo: characterFormData,
                    }}
                  ></EditSheet>
                )}
              </Grid>
            </Grid>
          </div>
        )}
      </StyledSheetContainer>
    </div>
  );
};
