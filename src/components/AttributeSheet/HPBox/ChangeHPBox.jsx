import React from "react";
import Grid from "@mui/material/Unstable_Grid2";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";

export const ChangeHPBox = ({ methods }) => {
  const { closeChangeState, handleRadio } = methods;
  return (
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
          <TextField name="changeValue" id="outlined-number" type="number" />
        </Grid>
        <Grid xs={6}>
          <Button variant="contained" color="error" type="submit" value={false}>
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
  );
};
