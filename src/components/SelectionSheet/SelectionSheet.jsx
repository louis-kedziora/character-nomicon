import React, { useState, useEffect } from "react";
import axios from "axios";
import Grid from "@mui/material/Unstable_Grid2";

import { SelectionAppBar } from "components/partials";
import { CharacterBox } from "components/SelectionSheet/CharacterBox";
import { EditSheet } from "components/EditSheet";
import { createNewCharacter, updateUser } from "components/DBHandler";
import { StyledFab, StyledSheetContainer } from "components/StyledComponents";

const mongoose = require("mongoose");

const serverURL = process.env.REACT_APP_SERVER_URL || "http://localhost:4000";
const instance = axios.create({
  baseURL: serverURL,
});

// maybe put this in its own file
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
    } else {
      console.log("cancelClick was set to True");
    }
    setNoCharacters(false);
    setOpen(false);
  };

  return (
    <div>
      <SelectionAppBar />
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
                      characterInfo: characterInfo,
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
