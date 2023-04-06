import React, { useState, useEffect } from "react";
import BloodtypeIcon from "@mui/icons-material/Bloodtype";
import Fab from "@mui/material/Fab";
import Grid from "@mui/material/Unstable_Grid2";
import { ChangeHPBox } from "components/AttributeSheet/HPBox/ChangeHPBox";
import { updateHP, updateInfo } from "components/DBHandler";

export const HPBox = ({ characterInfo }) => {
  const { title, characterID } = characterInfo;
  const [hp, setHP] = useState();
  const [hpMax, setMaxHP] = useState();
  const [tempHP, setTempHP] = useState();
  const [changeHP, setChangeHP] = useState(false);
  const [changeType, setChangeType] = useState("damage");
  const [cancelClicked, setCancelClicked] = useState(false);
  const [isFetched, setIsFetched] = useState(false);

  useEffect(() => {
    const character = JSON.parse(sessionStorage.getItem("currentCharacter"));
    setHP(character["currentHP"]);
    setMaxHP(character["hpMax"]);
    setTempHP(character["tempHP"]);
    setIsFetched(true);
  }, [characterID]);

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

    let changeValue = parseInt(event.target.elements.changeValue.value);
    if (!cancelClicked) {
      // This is to set 0 for the changeValue as np value is given when that is clicked
      if (changeType === "stabilize") changeValue = 0;

      // Cases where the resulting change would make the updateHP call where
      //  newHP === currentHP
      // 0. Until character data is pulled from the db on startup we will run into this issue aswell
      // 1. Healing an already full character
      // 2. stabilizing and alreading stable character
      if (
        !(changeType === "heal" && hp === hpMax) &&
        !(changeType === "heal" && changeValue === 0) &&
        !(changeType === "stabilize" && hp === 0) &&
        !(changeType === "damage" && changeValue === 0) &&
        !(changeType === "tempHP" && changeValue === 0) &&
        !(changeType === "tempHP" && hp <= 0)
      ) {
        let character = JSON.parse(sessionStorage.getItem("currentCharacter"));
        let newHP = hp;
        if (changeType === "tempHP") {
          const newTempHP = parseInt(changeValue);
          updateInfo("tempHP", newTempHP, characterID);
          setTempHP(newTempHP);
          character["tempHP"] = newTempHP;
        } else {
          if(changeType === "damage" && tempHP > 0 && tempHP - changeValue > 0) {
            const newTemps = tempHP - changeValue;
            updateInfo("tempHP", newTemps, characterID);
            setTempHP(newTemps);
          } else if (changeType === "damage" && tempHP > 0 && tempHP - changeValue <= 0) {
            changeValue = Math.abs(changeValue - tempHP);
            updateInfo("tempHP", 0, characterID);
            setTempHP(0);
            newHP = updateHP(
              changeType,
              parseInt(changeValue),
              hp,
              hpMax,
              tempHP,
              characterID
            );
          } else {
            newHP = updateHP(
              changeType,
              parseInt(changeValue),
              hp,
              hpMax,
              tempHP,
              characterID
            );
          }

          setHP(newHP);
          character["currentHP"] = newHP;
        }
        sessionStorage.setItem("currentCharacter", JSON.stringify(character));
      }
    }
    setChangeHP(false);
    setCancelClicked(false);
  }

  function handleRadio(event) {
    setChangeType(event.target.value);
  }

  return (
    <div>
      {isFetched && (
        <div className="basicBox resourceBox">
          <h1>{title}</h1>
          <div className="resourceCount">
            <h2>{tempHP > 0 ? parseInt(hp + tempHP) + " (+tmp)" : hp}</h2>
          </div>
          {!changeHP && (
            <Grid container spacing={2}>
              <Grid xs={12}>
                <Fab size="small" color="error" onClick={openChangeState}>
                  <BloodtypeIcon fontSize="medium" />
                </Fab>
              </Grid>
            </Grid>
          )}
          {changeHP && (
            <ChangeHPBox
              values={{ changeType: changeType, initialValue: 0 }}
              methods={{
                closeChangeState: closeChangeState,
                handleRadio: handleRadio,
                cancelHandler: cancelHandler,
              }}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default HPBox;
