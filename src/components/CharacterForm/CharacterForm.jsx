import React from "react";
import Grid from "@mui/material/Unstable_Grid2";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import { StyledTextField, StyledFormControlLabel } from "components/StyledComponents";

export const CharacterForm = ({ methods, fields }) => {
  const { submitFormHandler, cancelHandler } = methods;

  return (
    <form className="inputForm" onSubmit={submitFormHandler}>
      <Grid container spacing={3} sx={{ margin: "20px", padding: "40px 0px" }}>
        {fields.map((field, index) => {
          return (
            <Grid
              key={index}
              display="flex"
              justifyContent="left"
              alignItems="left"
              xs={6}
            >
              {field.type === "checkbox" ? (
                <StyledFormControlLabel
                  control={
                    <Checkbox value={field.sheetType} name={field.field} sx={{ color: "#d97326" }} />
                  }
                  label={field.headerName}
                />
              ) : (
                <StyledTextField
                  fullWidth
                  label={field.headerName}
                  name={field.field}
                  type={field.type}
                  id="outlined-basic"
                  // required
                />
              )}
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