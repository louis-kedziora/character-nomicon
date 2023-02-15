import React from "react";
import Grid from "@mui/material/Unstable_Grid2";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

export const NewAttackBox = ({ methods }) => {
  const { closeAddState, cancelHandler } = methods;

  return (
    <form onSubmit={closeAddState}>
      <Grid container spacing={2}>
        <Grid xs={12}>
          <TextField name="attackName" id="outlined-basic" />
          <TextField name="attackRange" id="outlined-basic" />
          <TextField name="attackType" id="outlined-basic" />
          <TextField name="attackModifier" id="outlined-basic" type="number" />
          <TextField name="attackDamage" id="outlined-basic" />
        </Grid>
        <Grid xs={6}>
          <Button
            onClick={cancelHandler}
            name="cancelButton"
            variant="contained"
            color="error"
            type="submit"
          >
            Cancel
          </Button>
        </Grid>
        <Grid xs={6}>
          <Button variant="contained" color="success" type="submit">
            Ok
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};
