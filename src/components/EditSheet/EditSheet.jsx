import React from "react";
import Fab from "@mui/material/Fab";

import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";

import { InputForm } from "components/InputForm";

const characterColumns = [
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

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export const EditSheet = ({ info }) => {
  const { submitFormHandler, open, closeHandler } = info;

  return (
    <Dialog
      fullScreen
      open={open}
      onClose={closeHandler}
      TransitionComponent={Transition}
    >
      <AppBar sx={{ position: "relative" }}>
        <Toolbar>
          <Fab value="Cancelled" onClick={closeHandler} aria-label="close">
            <CloseIcon />
          </Fab>
          <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
            New Character
          </Typography>
          <Fab value="Saved" autoFocus onClick={submitFormHandler}>
            Save
          </Fab>
        </Toolbar>
      </AppBar>
      <DialogContent>
        <InputForm
          methods={{
            submitFormHandler: submitFormHandler,
            cancelHandler: closeHandler,
          }}
          fields={characterColumns}
        />
      </DialogContent>
    </Dialog>
  );
};
