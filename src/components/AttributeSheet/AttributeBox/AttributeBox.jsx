import React from "react";
import Grid from "@mui/material/Unstable_Grid2";
import { scoreMod } from "../Modifiers";

export const AttributeBox = ({ attribute }) => {

  if (attribute === undefined) {
    // console.log("Character attributes are not being defined");
    return <div>Character attributes are not being defined</div>
  }
  const { attributeName, attributeScore } = attribute;

  return (
    <div className="attributeBox">
      <h1>{attributeName}</h1>
      <Grid container spacing={2}>
        <Grid xs={4}>
          <p>Score</p>
        </Grid>
        <Grid xs={4}>
          <p>Mod</p>
        </Grid>
        <Grid xs={4}>
          <p>Save</p>
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid xs={4}>
          <p>{attributeScore}</p>
        </Grid>
        <Grid xs={4}>
          <p>{scoreMod(attributeScore)}</p>
        </Grid>
        <Grid xs={4}>
          <p>{scoreMod(attributeScore)}</p>
        </Grid>
      </Grid>
    </div>
  );
};
