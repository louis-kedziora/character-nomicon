import React from "react";
import Grid from "@mui/material/Unstable_Grid2";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";

export const InputForm = ({ methods, fields }) => {
  const { closeAddState, cancelHandler } = methods;
  const newFields = fields.filter(
    (element) =>
      element.field !== "actions" && element.field !== "spellPrepared"
  );

  const StyledTextField = styled(TextField)({
    "& .MuiInputBase-input": {
      color: "#DBE2EF",
    },
    "& label": {
      color: "#464b4c",
    },
    "& label.Mui-focused": {
      color: "#03C988",
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "#03C988",
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "#03C988",
      },
      "&:hover fieldset": {
        borderColor: "#d97326",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#03C988",
      },
    },
  });

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
              <StyledTextField
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
