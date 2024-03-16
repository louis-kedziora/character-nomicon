import React from "react";
import {
  Grid,
  Divider,
} from "@mui/material";

import {
  scoreMod,
  modifierAndProficency,
} from "components/AttributeSheet/Modifiers";

export const AttributeBox = ({ attribute }) => {
  const { attributeName, attributeScore, level, savingThrowProficiency } =
    attribute;

  return (
    <div className="attributeBox">
      <Grid container>
        <Grid item xs={8}>
          <h1 className="redColor">{attributeName}</h1>
        </Grid>
        <Grid item xs={4}>
          <h3>{attributeScore}</h3>
        </Grid>
      </Grid>
      <Divider sx={{ width: "100%", border: "1px solid #464b4c", marginBottom: "4px" }} />
      <Grid container>
        <Grid item xs={6}>
          <h2>{scoreMod(attributeScore)}</h2>
        </Grid>

        <Grid item xs={6}>
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
