import React from "react";
import Grid from "@mui/material/Unstable_Grid2";
import { MultiInfoBox } from "../MultiInfoBox/MultiInfoBox";

export const LootSheet = ({ gaston }) => {
  const variableToString = (varObj) => Object.keys(varObj)[0];
  const {loot, partyLoot} = gaston;

  return (
    <div>
      <Grid xs={12}>
        <MultiInfoBox
          color="white"
          info={{ title: "Loot", content: loot, infoName: variableToString({loot}) }}
        />
      </Grid>
      <Grid xs={12}>
        <MultiInfoBox
          color="white"
          info={{ title: "Party Loot", content: partyLoot, infoName: variableToString({partyLoot}) }}
        />
      </Grid>
    </div>
  );
};
