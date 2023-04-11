import React, { useState } from "react";
import Grid from "@mui/material/Unstable_Grid2";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Alert from "@mui/material/Alert";

import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { StyledTextField } from "components/StyledComponents";

export const NewUserForm = ({ userData }) => {
  const {
    allUsers,
    openNewUserForm,
    submitNewUserHandler,
    cancelNewUserHandler,
  } = userData;
  const [email, setEmail] = useState("");
  const [isCancelClicked, setCancelClicked] = useState(false);
  const [alertUserExists, setAlertUserExists] = useState(false);

  const validateFormHandler = (event) => {
    console.log(allUsers);
    event.preventDefault();
    if (!isCancelClicked) {
      let userInput = {};
      const formData = event.target.elements;
      for (let index = 0; index < formData.length; index++) {
        const element = formData[index];
        userInput[element.name] = element.value;
      }
      delete userInput[""];
      delete userInput.cancelButton;

      // For now no passwords
      delete userInput.password;
      let userAlreadyExists = false;
      allUsers.forEach((element) => {
        if (element.email === userInput.email) {
          userAlreadyExists = true;
        }
      });
      console.log(userAlreadyExists);
      if (userAlreadyExists) {
        setAlertUserExists(true);
      }
    }
  };

  const cancelHandler = () => {
    setCancelClicked(true);
    cancelNewUserHandler();
  };

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
              Create An Account
            </Typography>
          </Stack>
        </DialogTitle>
        <DialogContent
          sx={{
            backgroundColor: "#0f111a",
          }}
        >
          <form onSubmit={validateFormHandler}>
            <Grid container spacing={3} sx={{ margin: "20px" }}>
              <Grid xs={12}>
                <StyledTextField
                  fullWidth
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  label="Username"
                  name="email"
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
      {alertUserExists && (
        <Alert severity="error">This is an error alert — check it out!</Alert>
      )}
    </div>
  );
};
