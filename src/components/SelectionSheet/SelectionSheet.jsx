
import React, { useState, useEffect } from "react";
import axios from "axios";
import Grid from "@mui/material/Unstable_Grid2";
import Container from "@mui/material/Container";
import Fab from "@mui/material/Fab";

import { SelectionAppBar } from "components/partials";
import { CharacterBox } from "components/SelectionSheet/CharacterBox";
import { EditSheet } from "components/EditSheet";
import { createNewCharacter, updateUser } from "components/DBHandler";

const mongoose = require('mongoose');

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
  { type: "number", field: "hpMax", headerName: "HP Max" },
  { type: "number", field: "str", headerName: "Strength" },
  {
    type: "checkbox",
    sheetType: "savingThrow",
    field: "str",
    headerName: "Saving Throw Proficiency (STR)",
  },
  { type: "number", field: "int", headerName: "Intelligence" },
  {
    type: "checkbox",
    sheetType: "savingThrow",
    field: "int",
    headerName: "Saving Throw Proficiency (INT)",
  },
  { type: "number", field: "dex", headerName: "Dexterity" },
  {
    type: "checkbox",
    sheetType: "savingThrow",
    field: "dex",
    headerName: "Saving Throw Proficiency (DEX)",
  },
  { type: "number", field: "wis", headerName: "Wisdom" },
  {
    type: "checkbox",
    sheetType: "savingThrow",
    field: "wis",
    headerName: "Saving Throw Proficiency (WIS)",
  },
  { type: "number", field: "con", headerName: "Constitution" },
  {
    type: "checkbox",
    sheetType: "savingThrow",
    field: "con",
    headerName: "Saving Throw Proficiency (CON)",
  },
  { type: "number", field: "char", headerName: "Charisma" },
  {
    type: "checkbox",
    sheetType: "savingThrow",
    field: "char",
    headerName: "Saving Throw Proficiency (CHA)",
  },

  { type: "number", field: "ac", headerName: "AC" },
  { type: "text", field: "speed", headerName: "Speed" },
  { type: "number", field: "level", headerName: "Total Level" },
  { type: "text", field: "hitDice", headerName: "Hit Dice" },
  { type: "number", field: "maxHitDice", headerName: "Max Hit Dice" },
  {
    type: "checkbox",
    sheetType: "skills",
    field: "athletics",
    headerName: "Athletics",
  },
  {
    type: "checkbox",
    sheetType: "skills",
    field: "acrobatics",
    headerName: "Acrobatics",
  },
  {
    type: "checkbox",
    sheetType: "skills",
    field: "sleightOfHand",
    headerName: "Sleight Of Hand",
  },
  {
    type: "checkbox",
    sheetType: "skills",
    field: "stealth",
    headerName: "Stealth",
  },
  {
    type: "checkbox",
    sheetType: "skills",
    field: "arcana",
    headerName: "Arcana",
  },
  {
    type: "checkbox",
    sheetType: "skills",
    field: "history",
    headerName: "History",
  },
  {
    type: "checkbox",
    sheetType: "skills",
    field: "investigation",
    headerName: "Investigation",
  },
  {
    type: "checkbox",
    sheetType: "skills",
    field: "nature",
    headerName: "Nature",
  },
  {
    type: "checkbox",
    sheetType: "skills",
    field: "religion",
    headerName: "Religion",
  },
  {
    type: "checkbox",
    sheetType: "skills",
    field: "animalHandling",
    headerName: "Animal Handling",
  },
  {
    type: "checkbox",
    sheetType: "skills",
    field: "insight",
    headerName: "Insight",
  },
  {
    type: "checkbox",
    sheetType: "skills",
    field: "medicine",
    headerName: "Medicine",
  },
  {
    type: "checkbox",
    sheetType: "skills",
    field: "perception",
    headerName: "Perception",
  },
  {
    type: "checkbox",
    sheetType: "skills",
    field: "survival",
    headerName: "Survival",
  },
  {
    type: "checkbox",
    sheetType: "skills",
    field: "deception",
    headerName: "Deception",
  },
  {
    type: "checkbox",
    sheetType: "skills",
    field: "intimidation",
    headerName: "Intimidation",
  },
  {
    type: "checkbox",
    sheetType: "skills",
    field: "performance",
    headerName: "Performance",
  },
  {
    type: "checkbox",
    sheetType: "skills",
    field: "persuasion",
    headerName: "Persuasion",
  },
];

export const SelectionSheet = ({ userInfo }) => {
  const { userID } = userInfo;
  const [characterIDs, setCharacterIDs] = useState({});
  const [currentUserID, setCurrentUserID] = useState("");
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

  useEffect(() => {
    const localUser = JSON.parse(sessionStorage.getItem(userID));
    sessionStorage.setItem("currentUser", JSON.stringify(userID));
    setCurrentUserID(userID);
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
      
      delete newCharacter[''];
      delete newCharacter.cancelButton;
      const mongooseID = mongoose.Types.ObjectId();
      createNewCharacter(newCharacter, mongooseID);

      // Update local storage with new character
      sessionStorage.setItem("userCharacters", JSON.stringify([...characterIDs,mongooseID.toString()]));
      // Update User by adding the new character ID
      updateUser("userCharacters",[...characterIDs,mongooseID.toString()], currentUserID);
      // Update currentCharacter with new character and navigate to new page


    } else {
      console.log("cancelClick was set to True");
    }
    setOpen(false);
  };



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
