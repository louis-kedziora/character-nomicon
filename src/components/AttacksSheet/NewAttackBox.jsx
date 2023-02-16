import React from "react";
import Grid from "@mui/material/Unstable_Grid2";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

export const NewAttackBox = ({ methods }) => {
  const { closeAddState, cancelHandler } = methods;

  return (
    <form className="newAttackBox" onSubmit={closeAddState}>
      <Grid container spacing={2}>
        <Grid display="flex" justifyContent="left" alignItems="left" xs={12}>
          <TextField label="Name" name="attackName" id="outlined-basic" />
        </Grid>
        <Grid display="flex" justifyContent="left" alignItems="left" xs={12}>
          <TextField label="Range" name="attackRange" id="outlined-basic" />
        </Grid>
        <Grid display="flex" justifyContent="left" alignItems="left" xs={12}>
          <TextField
            label="Type of Damage"
            name="attackType"
            id="outlined-basic"
          />
        </Grid>
        <Grid display="flex" justifyContent="left" alignItems="left" xs={12}>
          <TextField
            label="Modifier"
            name="attackModifier"
            id="outlined-basic"
            type="number"
          />
        </Grid>
        <Grid display="flex" justifyContent="left" alignItems="left" xs={12}>
          <TextField label="Damage" name="attackDamage" id="outlined-basic" />
        </Grid>
        <Grid container spacing={4}>
          <Grid display="flex" justifyContent="left" alignItems="left" xs={12}>
            <Button
              onClick={cancelHandler}
              name="cancelButton"
              variant="contained"
              color="error"
              type="submit"
            >
              Cancel
            </Button>
            <Button variant="contained" color="success" type="submit">
              Add
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </form>
  );
};
