import React from "react";
import Grid from "@mui/material/Unstable_Grid2";
import Container from "@mui/material/Container";

import { MultiInfoBox } from "../MultiInfoBox/MultiInfoBox";

export const LootSheet = ({ characterID }) => {
  return (
    <Container width="100%" maxWidth={false} sx={{ ml: 0 }}>
      <Grid xs={12}>
        <MultiInfoBox
          color="white"
          info={{
            title: "Loot",
            infoName: "loot",
            characterID: characterID,
          }}
        />
      </Grid>
      <Grid xs={12}>
        <MultiInfoBox
          color="white"
          info={{
            title: "Party Loot",
            infoName: "partyLoot",
            characterID: characterID,
          }}
        />
      </Grid>
    </Container>
  );
};
