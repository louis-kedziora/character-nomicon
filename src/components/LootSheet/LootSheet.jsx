import React from "react";
import Grid from "@mui/material/Unstable_Grid2";
import { MultiInfoBox } from "../MultiInfoBox/MultiInfoBox";

export const LootSheet = ({ characterID }) => {

  return (
    
        <div>
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
        </div>
     
  );
};
