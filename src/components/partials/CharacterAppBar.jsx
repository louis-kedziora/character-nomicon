import React, { useState, useEffect } from "react";
import { NavLink, Link, Navigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import ShieldSharpIcon from "@mui/icons-material/ShieldSharp";

const sheetLabels = [
  "Attributes",
  "Combat",
  "Features",
  "Notes",
  "Loot",
];
const sheetLinks = {
  Attributes: "/attributes",
  Combat: "/combat",
  Features: "/features",
  Notes: "/notes",
  Loot: "/loot",
};

export const CharacterAppBar = () => {
  const [authenticated, setauthenticated] = useState(undefined);
  const [character, setCharacter] = useState({});
  const [isFetched, setIsFetched] = useState(false);

  useEffect(() => {

  }, []);

  useEffect(() => {
    const loggedInUser = JSON.parse(sessionStorage.getItem("authenticated"));
    if (loggedInUser) {
      setauthenticated(loggedInUser);
      setCharacter(JSON.parse(sessionStorage.getItem("currentCharacter")));
      setIsFetched(true);
    }
  }, [authenticated]);

  const logoutHandler = () => {
    sessionStorage.setItem("currentUser", JSON.stringify(""));
    sessionStorage.setItem("authenticated", JSON.stringify(false));
    setauthenticated(false);
  };

  if (authenticated === false) {
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
        {isFetched && (
          <Container width="100%" maxWidth={false} sx={{ ml: 0 }}>
            <Toolbar disableGutters>
              <Link color="white" to="/characters">
                <ShieldSharpIcon
                  sx={{
                    display: { color: "white", xs: "none", md: "flex" },
                    mr: 1,
                  }}
                />
              </Link>

              <Typography
                variant="h6"
                noWrap
                component={Link}
                to="/attributes"
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
                {character.name}
              </Typography>
              <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
                {sheetLabels.map((sheet, index) => (
                  <NavLink
                    key={index}
                    to={sheetLinks[sheet]}
                    style={({ isActive, isPending }) => {
                      return {
                        fontWeight: isActive ? "bolder" : "lighter",
                        color: isActive ? "white" : "#464b4c",
                        fontFamily: "Montserrat",
                        textDecoration: isActive ? "underline #FFF" : "none",
                        margin: "10px",
                      };
                    }}
                  >
                    {sheet}
                  </NavLink>
                ))}
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
              </Box>
            </Toolbar>
          </Container>
        )}
      </AppBar>
    );
  }
};
