import React, { useState, useEffect } from "react";
import axios from "axios";
import Grid from "@mui/material/Unstable_Grid2";
import Container from "@mui/material/Container";
import Fab from "@mui/material/Fab";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import ListItemText from "@mui/material/ListItemText";
import ListItem from "@mui/material/ListItem";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";

import { SelectionAppBar } from "components/partials";
import { CharacterBox } from "components/SelectionSheet/CharacterBox";

const serverURL = process.env.REACT_APP_SERVER_URL || "http://localhost:4000";
const instance = axios.create({
  baseURL: serverURL,
});

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export const SelectionSheet = ({ userInfo }) => {
  const { userID } = userInfo;
  const [characterIDs, setCharacterIDs] = useState({});
  const [isFetched, setIsFetched] = useState(false);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    const localUser = JSON.parse(sessionStorage.getItem(userID));
    const characterIDs = [...localUser.userCharacters];
    setCharacterIDs(characterIDs);

    async function fetchCharacterData() {
      const request = await instance.post("/api/characters/getmany", {
        characterIDs: characterIDs,
      });
      sessionStorage.setItem("userCharacters", JSON.stringify(request.data));
      setIsFetched(true);
      return request;
    }
    fetchCharacterData();
  }, [userID]);

  return (
    <Container width="100%" disableGutters maxWidth={false}>
      <SelectionAppBar />
      {isFetched && (
        <Grid container spacing={1}>
          {characterIDs.map((characterID, index) => (
            <Grid
              item
              key={index}
              display="flex"
              justifyContent="center"
              alignItems="center"
              xs={6}
            >
              <CharacterBox values={{ characterID: characterID }} />
            </Grid>
          ))}
          <Grid item xs={12}>
            <Grid
              display="flex"
              justifyContent="center"
              alignItems="center"
              xs={12}
              sx={{
                height: "25%",
                width: "100%",
                margin: "25px",
                padding: "20px",
              }}
            >
              <Fab
                size="large"
                color="primary"
                variant="extended"
                onClick={handleOpen}
              >
                <h1>New Character</h1>
              </Fab>
              <Dialog
                fullScreen
                open={open}
                onClose={handleClose}
                TransitionComponent={Transition}
              >
                <AppBar sx={{ position: "relative" }}>
                  <Toolbar>
                    <IconButton
                      edge="start"
                      color="inherit"
                      onClick={handleClose}
                      aria-label="close"
                    >
                      <CloseIcon />
                    </IconButton>
                    <Typography
                      sx={{ ml: 2, flex: 1 }}
                      variant="h6"
                      component="div"
                    >
                      Sound
                    </Typography>
                    <Button autoFocus color="inherit" onClick={handleClose}>
                      save
                    </Button>
                  </Toolbar>
                </AppBar>
                <List>
                  <ListItem listitembutton>
                    <ListItemText
                      primary="Phone ringtone"
                      secondary="Titania"
                    />
                  </ListItem>
                  <Divider />
                  <ListItem listitembutton>
                    <ListItemText
                      primary="Default notification ringtone"
                      secondary="Tethys"
                    />
                  </ListItem>
                </List>
              </Dialog>
            </Grid>
          </Grid>
        </Grid>
      )}
    </Container>
  );
};
