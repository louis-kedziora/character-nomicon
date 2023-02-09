import React from "react";
import Grid from "@mui/material/Unstable_Grid2";
import { scoreMod, modifierAndProficency } from "../Modifiers";

export const AttributeBox = ({ attribute }) => {

  if (attribute === undefined) {
    // console.log("Character attributes are not being defined");
    return <div>Character attributes are not being defined</div>
  }
  
  const { attributeName, attributeScore, level } = attribute;
  let save = scoreMod(attributeScore);
  if (attributeName === "Dexterity" || attributeName === "Constitution") {
    save = modifierAndProficency(level, attributeScore)
  }

  return (
    <div className="attributeBox statBox">
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
          <h2>{save}</h2>

        </Grid>
      </Grid>
    </div>
  );
};
