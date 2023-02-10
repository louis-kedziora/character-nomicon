import React from "react";
import Grid from "@mui/material/Unstable_Grid2";
import { MultiInfoBox } from "../MultiInfoBox/MultiInfoBox";

export const NotesSheet = ({ gaston }) => {
  const variableToString = (varObj) => Object.keys(varObj)[0];
  const {notes} = gaston;

  return (
    <div>
      <Grid xs={12}>
        <MultiInfoBox
          color="white"
          info={{ title: "Notes", content: notes, infoName: variableToString({notes}) }}
        />
      </Grid>
    </div>
  );
};
