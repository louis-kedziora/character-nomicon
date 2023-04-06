import React from "react";
import Grid from "@mui/material/Unstable_Grid2";
import { scoreMod, modifierAndProficency } from "components/AttributeSheet/Modifiers";

export const AttributeBox = ({ attribute }) => {
  const { attributeName, attributeScore, level, savingThrowProficiency } =
    attribute;

  return (
    <div className="basicBox statBox">
      <h1>{attributeName}</h1>
      <Grid container spacing={2}>
        <Grid xs={4}>
          <p>Score</p>
          <h2>{attributeScore}</h2>
        </Grid>
        <Grid xs={4}>
          <p>Mod</p>
          <h2>{scoreMod(attributeScore)}</h2>
        </Grid>
        <Grid xs={4}>
          <p>Save</p>
          <h2>
            {savingThrowProficiency
              ? modifierAndProficency(level, attributeScore)
              : scoreMod(attributeScore)}
          </h2>
        </Grid>
      </Grid>
    </div>
  );
};
