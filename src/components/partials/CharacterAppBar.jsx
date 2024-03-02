import React, { useState, useEffect } from "react";
import { NavLink, Link, Navigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import ShieldSharpIcon from "@mui/icons-material/ShieldSharp";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";

const sheetLabels = ["Attributes", "Combat", "Features", "Notes", "Loot"];
const sheetLinks = {
  Attributes: "/attributes",
  Combat: "/combat",
  Features: "/features",
  Notes: "/notes",
  Loot: "/loot",
};
const drawerWidth = 240;

export const CharacterAppBar = () => {
  const [authenticated, setauthenticated] = useState(undefined);
  const [character, setCharacter] = useState({});
  const [isFetched, setIsFetched] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

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
    sessionStorage.setItem("currentCharacter", JSON.stringify(""));
    sessionStorage.setItem("authenticated", JSON.stringify(false));
    setauthenticated(false);
  };

  const container =
    window !== undefined ? () => window.document.body : undefined;

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
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
      <Divider />
      <List>
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
      </List>
    </Box>
  );

  if (authenticated === false) {
    return <Navigate to="/login" replace={true} />;
  } else {
    return (
      <Box sx={{ display: "flex" }}>
        <AppBar
          sx={{
            backgroundColor: "#010038",
            boxShadow: "none",
          }}
          position="static"
          component="nav"
        >
          {isFetched && (
            <Container width="100%" maxWidth={false} sx={{ ml: 0 }}>
              <Toolbar disableGutters>
                <IconButton
                  color="inherit"
                  aria-label="open drawer"
                  edge="start"
                  onClick={handleDrawerToggle}
                  sx={{ mr: 2, display: { sm: "none" } }}
                >
                  <MenuIcon />
                </IconButton>
                <Link color="white" to="/characters">
                  <ArrowBackIcon
                    sx={{
                      display: { color: "white", xs: "none", md: "flex" },
                      mr: 1,
                    }}
                  />
                </Link>
                <ShieldSharpIcon
                  sx={{
                    display: { color: "white", xs: "none", md: "flex" },
                    mr: 1,
                  }}
                />

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
                      boxShadow: "none",
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
        <nav>
          <Drawer
            container={container}
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
            sx={{
              display: { xs: "block", sm: "none" },
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: drawerWidth,
              },
            }}
          >
            {drawer}
          </Drawer>
        </nav>
      </Box>
    );
  }
};
