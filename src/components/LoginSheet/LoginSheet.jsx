import React, { useState } from "react";
import { Navigate } from "react-router-dom";

import Avatar from "@mui/material/Avatar";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

import { StyledTextField } from "components/StyledComponents";
import { StyledFab } from "components/StyledComponents";
import { NewUserForm } from "components/LoginSheet/NewUserForm";

export const LoginSheet = ({ loginInfo }) => {
  const { signInHandler, attemptLogin, allUsers, setAllUsers, userDNE } =
    loginInfo;
  const [emailAddress, setEmailAddress] = useState("");
  const [isNewUserFormOpen, setNewUserFormOpen] = useState(false);

  const newUserHandleOpen = () => {
    setNewUserFormOpen(true);
  };
  const cancelNewUserHandler = () => {
    setNewUserFormOpen(false);
  };

  return (
    <Container component="main" maxWidth="xs">
      {attemptLogin && <Navigate to="/characters" replace={true} />}
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          backgroundColor: "#0f111a",
          boxShadow: "0 2px 5px #464b4c",
          borderRadius: "7px",
          padding: "1em 2.5em",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "#5aa0ff" }}>
          <LockOutlinedIcon />
        </Avatar>
        <form onSubmit={signInHandler}>
          <StyledTextField
            margin="normal"
            required
            fullWidth
            value={emailAddress}
            onChange={(e) => setEmailAddress(e.target.value)}
            id="email"
            label="Username"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <Typography
            sx={{
              visibility: userDNE ? "visible" : "hidden",
              color: "red",
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "Montserrat",
              fontWeight: 600,
              textDecoration: "none",
            }}
          >
            User Does Not Exist
          </Typography>
          <StyledTextField
            margin="normal"
            fullWidth
            disabled
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <Typography
            sx={{
              visibility: "hidden",
              color: "red",
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "Montserrat",
              fontWeight: 600,
              textDecoration: "none",
            }}
          >
            Bad Password
          </Typography>
          <Grid justifyContent="center" container>
            <Grid item>
              <StyledFab
                type="submit"
                size="large"
                color="primary"
                variant="extended"
                sx={{ mt: 3, mb: 2 }}
              >
                Login
              </StyledFab>
            </Grid>
          </Grid>

          <Grid justifyContent="center" container>
            <Grid item>
              <StyledFab
                onClick={newUserHandleOpen}
                variant="extended"
                sx={{ color: "#5aa0ff", fontFamily: "Montserrat" }}
              >
                {"Don't have an account? Sign Up"}
              </StyledFab>
            </Grid>
          </Grid>
        </form>
        {isNewUserFormOpen && (
          <NewUserForm
            userData={{
              allUsers: allUsers,
              setAllUsers: setAllUsers,
              openNewUserForm: isNewUserFormOpen,
              cancelNewUserHandler: cancelNewUserHandler,
            }}
          />
        )}
      </Box>
    </Container>
  );
};
