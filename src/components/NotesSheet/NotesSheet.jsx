import React from "react";
import Grid from "@mui/material/Unstable_Grid2";
import { MultiInfoBox } from "../MultiInfoBox/MultiInfoBox";

export const NotesSheet = ({ characterID }) => {

  return (
    <div>
      <Grid xs={12}>
        <MultiInfoBox
          color="white"
          info={{
            title: "Notes",
            infoName: "notes",
            characterID: characterID,
          }}
        />
      </Grid>
    </div>
  );
};
