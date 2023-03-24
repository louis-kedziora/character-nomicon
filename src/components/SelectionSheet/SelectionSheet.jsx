import React, { useState, useEffect } from "react";
import axios from "axios";
import Grid from "@mui/material/Unstable_Grid2";
import Container from "@mui/material/Container";
import Fab from "@mui/material/Fab";

import { SelectionAppBar } from "components/partials";
import { CharacterBox } from "components/SelectionSheet/CharacterBox";
import { EditSheet } from "components/EditSheet";
import { createNewCharacter } from "components/DBHandler";

const serverURL = process.env.REACT_APP_SERVER_URL || "http://localhost:4000";
const instance = axios.create({
  baseURL: serverURL,
});

const characterInfo = [
  { type: "text", field: "name", headerName: "Name" },
  { type: "text", field: "characterClass", headerName: "Character Class" },
  { type: "text", field: "race", headerName: "Race" },
  { type: "text", field: "background", headerName: "Background" },
  { type: "text", field: "alignment", headerName: "Alignment" },
  { type: "text", field: "languagesKnown", headerName: "Languages Known" },
  {
    type: "text",
    field: "armorProficiences",
    headerName: "Armor Proficiencies",
  },
  {
    type: "text",
    field: "weaponProficiences",
    headerName: "Weapon Proficiencies",
  },
  { type: "text", field: "toolProficiences", headerName: "Tool Proficiencies" },
  { field: "hpMax", headerName: "HP Max", type: "number" },
  { type: "text", field: "str", headerName: "STR" },
  { type: "text", field: "int", headerName: "INT" },
  { type: "text", field: "dex", headerName: "DEX" },
  { type: "text", field: "wis", headerName: "WIS" },
  { type: "text", field: "con", headerName: "CON" },
  { type: "text", field: "char", headerName: "CHA" },
  { type: "text", field: "ac", headerName: "AC" },
  { type: "text", field: "speed", headerName: "Speed" },
  { type: "text", field: "level", headerName: "Level" },
  { type: "text", field: "hitDice", headerName: "Hit Dice" },
  { field: "maxHitDice", headerName: "Max Hit Dice", type: "number" },
  {
    field: "maxOneSpellSlots",
    headerName: "Max 1st Spell Slots",
    type: "number",
  },
  {
    field: "maxTwoSpellSlots",
    headerName: "Max 2nd Spell Slots",
    type: "number",
  },
  {
    field: "maxThreeSpellSlots",
    headerName: "Max 3rd Spell Slots",
    type: "number",
  },
  { type: "checkbox", field: "athletics", headerName: "Athletics" },
  { type: "checkbox", field: "acrobatics", headerName: "Acrobatics" },
  { type: "checkbox", field: "sleightOfHand", headerName: "Sleight Of Hand" },
  { type: "checkbox", field: "stealth", headerName: "Stealth" },
  { type: "checkbox", field: "arcana", headerName: "Arcana" },
  { type: "checkbox", field: "history", headerName: "History" },
  { type: "checkbox", field: "investigation", headerName: "Investigation" },
  { type: "checkbox", field: "nature", headerName: "Nature" },
  { type: "checkbox", field: "religion", headerName: "Religion" },
  { type: "checkbox", field: "animalHandling", headerName: "Animal Handling" },
  { type: "checkbox", field: "insight", headerName: "Insight" },
  { type: "checkbox", field: "medicine", headerName: "Medicine" },
  { type: "checkbox", field: "perception", headerName: "Perception" },
  { type: "checkbox", field: "survival", headerName: "Survival" },
  { type: "checkbox", field: "deception", headerName: "Deception" },
  { type: "checkbox", field: "intimidation", headerName: "Intimidation" },
  { type: "checkbox", field: "performance", headerName: "Performance" },
  { type: "checkbox", field: "persuasion", headerName: "Persuasion" },
];

export const SelectionSheet = ({ userInfo }) => {
  const { userID } = userInfo;
  const [characterIDs, setCharacterIDs] = useState({});
  const [isFetched, setIsFetched] = useState(false);
  const [cancelClicked, setCancelClicked] = useState(false);
  const [open, setOpen] = useState(false);
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
      console.log("save was clicked");
      let newCharacter = {};
      const formData = event.target.elements;
      for (let index = 0; index < formData.length; index++) {
        const element = formData[index];
        if (element.type === "checkbox") {
          newCharacter[element.name] = element.checked;
        } else {
          newCharacter[element.name] = element.value;
        }
      }
      console.log(newCharacter);
      createNewCharacter(newCharacter, userID);

    } else {
      console.log("cancelClick was set to True");
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
                    cancelHandler: cancelHandler,
                    characterInfo: characterInfo,
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
