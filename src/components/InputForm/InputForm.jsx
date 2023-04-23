import React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import Grid from "@mui/material/Unstable_Grid2";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";

import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { StyledTextField } from "components/StyledComponents";

export const InputForm = ({ methods, fields }) => {
  const { submitFormHandler, cancelHandler, newTitle, openForm } = methods;

  const newFields = fields.filter(
    (element) =>
      element.field !== "actions" && element.field !== "spellPrepared"
  );

  return (
    <Dialog open={openForm} onClose={cancelHandler}>
      <DialogTitle
        sx={{
          backgroundColor: "#010038",
        }}
      >
        <Stack direction="row">
          <Typography
            sx={{
              color: "white",
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "Montserrat",
              fontWeight: 600,
              letterSpacing: ".15rem",
              textDecoration: "none",
            }}
            variant="h6"
            component="div"
          >
            {newTitle}
          </Typography>
        </Stack>
      </DialogTitle>
      <DialogContent
        sx={{
          backgroundColor: "#0f111a",
        }}
      >
        <form className="inputForm" onSubmit={submitFormHandler}>
          <Grid
            container
            spacing={3}
            sx={{ margin: "20px", padding: "40px 0px" }}
          >
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
                  />
                </Grid>
              );
            })}

            <Grid
              display="flex"
              justifyContent="left"
              alignItems="left"
              xs={12}
            >
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
      </DialogContent>
    </Dialog>
  );
};
