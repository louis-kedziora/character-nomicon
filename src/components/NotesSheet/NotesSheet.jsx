import React from "react";
import Grid from "@mui/material/Unstable_Grid2";
import Container from "@mui/material/Container";

import { MultiInfoBox } from "components/MultiInfoBox";

export const NotesSheet = ({ characterID }) => {

  return (
    <Container width="100%" maxWidth={false} sx={{ ml: 0 }}>
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
      </Container>
  );
};
