import React, { useState, useEffect } from "react";
import { NavLink, Link } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import ShieldSharpIcon from "@mui/icons-material/ShieldSharp";

const sheetLabels = [
  "Attacks",
  "Attributes",
  "Features",
  "Skills",
  "Spells",
  "Notes",
  "Loot",
];
const sheetLinks = {
  Attacks: "/attacks",
  Attributes: "/attributes",
  Features: "/features",
  Skills: "/skills",
  Spells: "/spells",
  Notes: "/notes",
  Loot: "/loot",
};

export const CharacterAppBar = () => {
  const [character, setCharacter] = useState({});
  const [isFetched, setIsFetched] = useState(false);

  useEffect(() => {
    setCharacter(JSON.parse(sessionStorage.getItem("currentCharacter")));
    setIsFetched(true);
  }, []);

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
            </Box>
          </Toolbar>
        </Container>
      )}
    </AppBar>
  );
};
