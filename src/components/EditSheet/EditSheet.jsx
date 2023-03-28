import React from "react";

import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Slide from "@mui/material/Slide";

import { CharacterForm } from "components/CharacterForm";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export const EditSheet = ({ info }) => {
  const { submitFormHandler, open, cancelHandler, characterInfo } = info;

  return (
    <Dialog
      fullScreen
      open={open}
      onClose={cancelHandler}
      TransitionComponent={Transition}
    >
      <AppBar
        sx={{
          position: "relative",
          backgroundColor: "#010038",
          boxShadow: "none",
        }}
      >
        <Toolbar>
          <Typography
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "Montserrat",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
              textAlign: "center",
            }}
            variant="h6"
            component="div"
          >
            New Character
          </Typography>
        </Toolbar>
      </AppBar>
      <DialogContent
        sx={{
          backgroundColor: "#0f111a",
          backgroundImage: `url(${"https://www.transparenttextures.com/patterns/buried.png"})`,
        }}
      >
        <CharacterForm
          methods={{
            submitFormHandler: submitFormHandler,
            cancelHandler: cancelHandler,
          }}
          fields={characterInfo}
        />
      </DialogContent>
    </Dialog>
  );
};
