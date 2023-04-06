import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import ShieldSharpIcon from "@mui/icons-material/ShieldSharp";


export const SelectionAppBar = ({ characterName }) => {

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
        </Toolbar>
      </Container>
    </AppBar>
  );
};
