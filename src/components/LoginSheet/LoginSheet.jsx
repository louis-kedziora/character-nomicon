import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";
import { serverURL } from "config/server.config";

import Avatar from "@mui/material/Avatar";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

import { StyledTextField } from "components/StyledComponents";
import { StyledFab } from "components/StyledComponents";
import { NewUserForm } from "components/LoginSheet/NewUserForm";

const instance = axios.create({
  baseURL: serverURL,
});

export const LoginSheet = ({ loginInfo }) => {
  const [isFetched, setIsFetched] = useState(false);

  const [attemptLogin, setAttemptLogin] = useState(false);
  const [allUsers, setAllUsers] = useState([]);
  const [userDNE, setUserDNE] = useState(false);
  const [emailAddress, setEmailAddress] = useState("louie.test@test.com");
  const [isNewUserFormOpen, setNewUserFormOpen] = useState(false);

  useEffect(() => {
    async function fetchUserData() {
      // Get User and put in session storage
      const request = await instance.post("/api/users/getAll");
      const fetchedAllUsers = request.data;

      setAllUsers(fetchedAllUsers);

      sessionStorage.setItem("allUsers", JSON.stringify(fetchedAllUsers));
      sessionStorage.setItem("authenticated", JSON.stringify(false));

      setIsFetched(true);
      return request;
    }
    fetchUserData();
  }, []);

  const signInHandler = (event) => {
    event.preventDefault();
    let userInput = {};
    const formData = event.target.elements;
    for (let index = 0; index < formData.length; index++) {
      const element = formData[index];
      userInput[element.name] = element.value;
    }
    let userFound = undefined;
    allUsers.forEach((element) => {
      if (element.email === userInput.email) {
        userFound = element;
      }
    });
    if (userFound !== undefined) {
      sessionStorage.setItem("currentUser", JSON.stringify(userFound));
      sessionStorage.setItem("authenticated", JSON.stringify(true));
      setAttemptLogin(true);
    } else {
      setUserDNE(true);
    }
  };

  const newUserHandleOpen = () => {
    setNewUserFormOpen(true);
  };
  const cancelNewUserHandler = () => {
    setNewUserFormOpen(false);
  };


  /* Background - #0f111a
Text/Foreground - #5aa0ff
Secondary Text - #c789c3
Third Text - #d97326
Comment Color - #464b4c 
Nice Green - #03C988 */
  return (
    <div>
      {isFetched && (
        <Container component="main" maxWidth="xs">
          {attemptLogin && <Navigate to="/characters" replace={true} />}
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              backgroundColor: "#0f111a",
              boxShadow: "0 2px 5px #03C988",
              borderRadius: "7px",
              padding: "1em 2.5em",
            }}
          >
            <Typography
              sx={{
                color: "#5aa0ff",
                display: { xs: "none", md: "flex" },
                fontFamily: "Montserrat",
                fontWeight: 700,
                fontSize: "2em",
                textDecoration: "none",
              }}
            >
              Hello!
            </Typography>
            <Typography
              sx={{
                color: "#DBE2EF",
                display: { xs: "none", md: "flex" },
                fontFamily: "Montserrat",
                fontWeight: 300,
                fontSize: "1.2em",
                textDecoration: "none",
              }}
            >
              This site is currently under development.
              <br />
              <br />
              Passwords are disabled for the time being so you only need your username to login.
              <br />
              <br />
              The user 'louie.test@test.com' is provided with prefilled
              characters if you do not wish to create your own.
            </Typography>
          </Box>
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              backgroundColor: "#0f111a",
              boxShadow: "0 2px 5px black",
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
                  <Typography
                    sx={{
                      padding: "1em 0",
                      color: "#5aa0ff",
                      display: { xs: "none", md: "flex" },
                      fontFamily: "Montserrat",
                      textDecoration: "none",
                    }}
                  >
                    Don't have an account?
                  </Typography>
                </Grid>
              </Grid>
              <Grid justifyContent="center" container>
                <Grid item>
                  <StyledFab
                    onClick={newUserHandleOpen}
                    variant="extended"
                    sx={{ color: "#5aa0ff", fontFamily: "Montserrat" }}
                  >
                    {"Sign Up"}
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
      )}
    </div>
  );
};
