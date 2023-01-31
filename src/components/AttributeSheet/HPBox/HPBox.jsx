import React, { useState } from "react";
import TuneIcon from "@mui/icons-material/Tune";
import Fab from "@mui/material/Fab";
import Grid from "@mui/material/Unstable_Grid2";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";

export const HPBox = (characterInfo) => {
  const {title, hpMax} = characterInfo;
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
        setHP(hp + changeValue)
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

      {/* Should be own compoenent */}
      {changeHP && (
        <form onSubmit={closeChangeState}>
          <Grid container spacing={2}>
            <RadioGroup name="typeHPChange">
              <Grid container spacing={2}>
                <Grid xs={6}>
                  <FormControlLabel
                    value="damage"
                    control={<Radio onChange={handleRadio} />}
                    label="Damage"
                  />
                </Grid>
                <Grid xs={6}>
                  <FormControlLabel
                    value="heal"
                    control={<Radio onChange={handleRadio} />}
                    label="Heal"
                  />
                </Grid>
                <Grid xs={12}>
                  <FormControlLabel
                    value="stabilize"
                    control={<Radio onChange={handleRadio} />}
                    label="Stabilize"
                  />
                </Grid>
              </Grid>
            </RadioGroup>

            <Grid xs={12}>
              <TextField
                name="changeValue"
                id="outlined-number"
                type="number"
              />
            </Grid>
            <Grid xs={6}>
              <Button
                variant="contained"
                color="error"
                type="submit"
                value={false}
              >
                Cancel
              </Button>
            </Grid>
            <Grid xs={6}>
              <Button
                variant="contained"
                color="success"
                type="submit"
                value={true}
              >
                Ok
              </Button>
            </Grid>
          </Grid>
        </form>
      )}
    </div>
  );
}

export default HPBox;
