import React from "react";
import Grid from "@mui/material/Unstable_Grid2";
import Button from "@mui/material/Button";
import { StyledTextField } from "components/StyledComponents";

export const InputForm = ({ methods, fields }) => {
  const { submitFormHandler, cancelHandler } = methods;

  const newFields = fields.filter(
    (element) =>
      element.field !== "actions" && element.field !== "spellPrepared"
  );

  return (
    <form className="inputForm" onSubmit={submitFormHandler}>
      <Grid container spacing={3} sx={{ margin: "20px", padding: "40px 0px" }}>
        {newFields.map((field, index) => {
          return (
            <Grid
              key={index}
              display="flex"
              justifyContent="left"
              alignItems="left"
              xs={6}
            >
              <StyledTextField
                fullWidth
                label={field.headerName}
                name={field.field}
                id="outlined-basic"
                // required
              />
            </Grid>
          );
        })}

        <Grid display="flex" justifyContent="left" alignItems="left" xs={12}>
          <Button
            onClick={cancelHandler}
            name="cancelButton"
            variant="contained"
            color="error"
            type="submit"
            sx={{ fontFamily: "Montserrat" }}
          >
            Cancel
          </Button>
          <Button
            sx={{ fontFamily: "Montserrat" }}
            variant="contained"
            color="success"
            type="submit"
          >
            Save
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};
