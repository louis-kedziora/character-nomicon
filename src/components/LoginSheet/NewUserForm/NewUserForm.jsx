import React, { useState } from "react";
import Grid from "@mui/material/Unstable_Grid2";
import Button from "@mui/material/Button";

import Dialog from "@mui/material/Dialog";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";

import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { StyledTextField } from "components/StyledComponents";

export const NewUserForm = ({ userData }) => {
  const { allUsers, openNewUserForm } = userData;
  const [email, setEmail] = useState("");

  const submitFormHandler = () => {};

  const cancelHandler = () => {};

  return (
    <div>
      <Dialog open={openNewUserForm} onClose={cancelHandler}>
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
              New User
            </Typography>
          </Stack>
        </DialogTitle>
        <DialogContent
          sx={{
            backgroundColor: "#0f111a",
          }}
        >
          <form className="inputForm" onSubmit={submitFormHandler}>
            <Grid container spacing={3} sx={{ margin: "20px" }}>
              <Grid xs={12}>
                <StyledTextField
                  fullWidth
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  label="Username"
                  name="resourceName"
                  type="text"
                  id="outlined-basic"
                />
              </Grid>
              <Grid xs={12}>
                <StyledTextField
                  disabled
                  fullWidth
                  value={undefined}
                  label="Password"
                  name="password"
                  type="text"
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
                  Sign Up
                </Button>
              </Grid>
            </Grid>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};
