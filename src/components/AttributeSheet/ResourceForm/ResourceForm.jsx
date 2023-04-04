import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import Grid from "@mui/material/Unstable_Grid2";
import Typography from "@mui/material/Typography";

import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { StyledTextField } from "components/StyledComponents";

export const ResourceForm = ({ info }) => {
  const {
    submitResourceFormHandler,
    openResourceForm,
    cancelResourceFormHandler,
  } = info;

  return (
    <Dialog open={openResourceForm} onClose={cancelResourceFormHandler}>
      <DialogTitle
        sx={{
          backgroundColor: "#010038",
        }}
      >
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
          New Resource
        </Typography>
      </DialogTitle>
      <DialogContent
        sx={{
          backgroundColor: "#0f111a",
        }}
      >
        <form className="inputForm" onSubmit={submitResourceFormHandler}>
          <Grid container spacing={3} sx={{ margin: "20px" }}>
            <Grid xs={12}>
              <StyledTextField
                fullWidth
                label="Resource Title"
                name="resourceName"
                type="text"
                id="outlined-basic"
              />
            </Grid>
            <Grid xs={12}>
              <StyledTextField
                fullWidth
                label="Maximum Value"
                name="maxResourceValue"
                type="number"
                id="outlined-basic"
              />
            </Grid>

            <Grid
              display="flex"
              justifyContent="left"
              alignItems="left"
              xs={12}
            >
              <Button
                onClick={cancelResourceFormHandler}
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
