import React from "react";
import Grid from "@mui/material/Unstable_Grid2";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { styled } from "@mui/material/styles";

export const InputForm = ({ methods, fields }) => {
  const { submitFormHandler, cancelHandler } = methods;

  const newFields = fields.filter(
    (element) =>
      element.field !== "actions" && element.field !== "spellPrepared"
  );

  const StyledTextField = styled(TextField)({
    "& .MuiInputBase-input": {
      color: "#DBE2EF",
      fontFamily: "Montserrat",
    },
    "& label": {
      color: "#464b4c",
      fontFamily: "Montserrat",
    },
    "& label.Mui-focused": {
      color: "#03C988",
      fontFamily: "Montserrat",
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "#03C988",
    },
    "& input:-internal-autofill-selected": {
      backgroundColor: "#0f111a",
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "#03C988",
        fontFamily: "Montserrat",
      },
      "&:hover fieldset": {
        borderColor: "#d97326",
        fontFamily: "Montserrat",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#03C988",
        fontFamily: "Montserrat",
      },
    },
  });
  const StyledFormControlLabel = styled(FormControlLabel)({
    "& .MuiTypography-root": {
      fontFamily: "Montserrat",
      color: "white",
    },
  });

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
