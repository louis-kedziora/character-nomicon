import React from "react";
import Grid from "@mui/material/Unstable_Grid2";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

export const InputForm = ({ methods, fields }) => {
  const { closeAddState, cancelHandler } = methods;
  const newFields = fields.filter(
    (element) =>
      element.field !== "actions" && element.field !== "spellPrepared"
  );
  return (
    <form className="inputForm" onSubmit={closeAddState}>
      <Grid container spacing={2}>
        {newFields.map((field, index) => {
          return (
            <Grid
              key={index}
              display="flex"
              justifyContent="left"
              alignItems="left"
              xs={12}
            >
              <TextField
                label={field.headerName}
                name={field.field}
                id="outlined-basic"
              />
            </Grid>
          );
        })}

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
