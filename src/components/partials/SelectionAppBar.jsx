import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";

import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import ShieldSharpIcon from "@mui/icons-material/ShieldSharp";

export const SelectionAppBar = () => {
  const [authenticated, setauthenticated] = useState(undefined);

  useEffect(() => {
    const loggedInUser = JSON.parse(sessionStorage.getItem("authenticated"));
    if (loggedInUser) {
      setauthenticated(loggedInUser);
    }
  }, [authenticated]);

  const logoutHandler = () => {
    sessionStorage.setItem("currentUser", JSON.stringify(""));
    sessionStorage.setItem("authenticated", JSON.stringify(false));
    setauthenticated(false);
  };

  if (authenticated === false ) {
    return <Navigate to="/login" replace={true} />;
  } else {
    return (
      <AppBar
        sx={{
          backgroundColor: "#010038",
          boxShadow: "none",
        }}
        position="static"
      >
        <Container width="100%" maxWidth={false} sx={{ ml: 0 }}>
          <Toolbar disableGutters>

            <ShieldSharpIcon
              sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}
            ></ShieldSharpIcon>
            <Typography
              variant="h6"
              noWrap
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "Montserrat",
                fontWeight: 700,
                letterSpacing: ".15rem",
                color: "inherit",
                textDecoration: "none",
                textAlign: "center",
              }}
            >
              Characters
            </Typography>
            <Button
              onClick={logoutHandler}
              sx={{
                fontFamily: "Montserrat",
                backgroundColor: "#010038",
                marginLeft: "auto",
              }}
              name="logout"
              variant="contained"
              type="submit"
            >
              Logout
            </Button>
          </Toolbar>
        </Container>
      </AppBar>
    );
  }
};
