import React, { useState } from "react";
import TuneIcon from "@mui/icons-material/Tune";
import Fab from "@mui/material/Fab";
import Grid from "@mui/material/Unstable_Grid2";
import axios from "axios";
import { ChangeHPBox } from "./ChangeHPBox";

export const HPBox = ({ characterInfo }) => {
  const { title, hpMax } = characterInfo;
  const [hp, setHP] = useState(hpMax);
  const [changeHP, setChangeHP] = useState(false);
  const [changeType, setChangeType] = useState("");

  function openChangeState(event) {
    // Open the form
    setChangeHP(true);
  }

  function closeChangeState(event) {
    // Change the value based on what the user input on the form
    // Then hide the form
    // If the user cancels the action do nothing
    event.preventDefault();
    const changeValue = event.target.elements.changeValue.value;
    if (changeType === "heal") {
      if (hp + changeValue >= hpMax) {
        setHP(hpMax);
      } else if (hp < 0) {
        setHP(changeValue);
      } else {
        setHP(hp + changeValue);
      }
    } else if (changeType === "damage") {
      if (hp - changeValue <= 0) {
        //Unconcious
        setHP(hp - changeValue);
      } else {
        setHP(hp - changeValue);
      }
    } else if (changeType === "stabilize") {
      setHP(0);
    }

    // make this a function call
    axios({
      method: "patch",
      url: "http://localhost:4000/",
      data: {
        name: "Gaston",
        newHP: hp + 10,
      },
    })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
    setChangeHP(false);
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
          }}
        />
      )}
    </div>
  );
};

export default HPBox;
