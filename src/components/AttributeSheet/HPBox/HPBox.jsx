import React, { useState } from "react";
import TuneIcon from "@mui/icons-material/Tune";
import Fab from "@mui/material/Fab";
import Grid from "@mui/material/Unstable_Grid2";
import { ChangeHPBox } from "./ChangeHPBox";
import { updateHP } from "../../DBHandler/DBHandler";

export const HPBox = ({ characterInfo }) => {
  const { title, hpMax } = characterInfo;
  const [hp, setHP] = useState(hpMax);
  const [changeHP, setChangeHP] = useState(false);
  const [changeType, setChangeType] = useState("");
  const [cancelClicked, setCancelClicked] = useState(false);


  function openChangeState(event) {
    // Open the form
    setChangeHP(true);
  }
  function cancelHandler() {
    setCancelClicked(true);
  }

  function closeChangeState(event) {
    // Change the value based on what the user input on the form
    // Then hide the form
    // If the user cancels the action do nothing
    event.preventDefault();
    let changeValue = event.target.elements.changeValue.value;
    if (!cancelClicked) {
      if (changeType === "stabilize" && hp !== 0) {
        changeValue = 0;
      }
      const newHP = updateHP(changeType, parseInt(changeValue), hp, hpMax);
      setHP(newHP);
      
    }
    setChangeHP(false);
    setCancelClicked(false);
  }

  function handleRadio(event) {
    setChangeType(event.target.value);
  }

  return (
    <div className="attributeBox">
      <h1>{title}</h1>
      <p>{hp}</p>
      {!changeHP && (
        <Grid container spacing={2}>
          <Grid xs={12}>
            <Fab onClick={openChangeState}>
              <TuneIcon />
            </Fab>
          </Grid>
        </Grid>
      )}
      {changeHP && (
        <ChangeHPBox
          methods={{
            closeChangeState: closeChangeState,
            handleRadio: handleRadio,
            cancelHandler: cancelHandler
          }}
        />
      )}
    </div>
  );
};

export default HPBox;
