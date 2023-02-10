import React from "react";
import Grid from "@mui/material/Unstable_Grid2";

import { InfoBox } from "../AttributeSheet/InfoBox";
import { MultiInfoBox } from "../MultiInfoBox/MultiInfoBox";

export const FeaturesSheet = ({ gaston }) => {
  const variableToString = (varObj) => Object.keys(varObj)[0];

  const {
    characterClass,
    race,
    background,
    alignment,
    languagesKnown,
    armorProficiences,
    weaponProficiences,
    toolProficiences,
    features
  } = gaston;
  return (
    <div>
      <Grid container spacing={4}>
        <Grid xs={12}>
          <InfoBox info={{ title: "Class", content: characterClass }} />
          <InfoBox info={{ title: "Race", content: race }} />
          <InfoBox info={{ title: "Background", content: background }} />
          <InfoBox info={{ title: "Alignment", content: alignment }} />
          <InfoBox
            info={{ title: "Languages Known", content: languagesKnown }}
          />
          <InfoBox
            info={{ title: "Armor Proficiences", content: armorProficiences }}
          />

          <InfoBox
            info={{ title: "Weapon Proficiences", content: weaponProficiences }}
          />
          <InfoBox
            info={{ title: "Tool Proficiences", content: toolProficiences }}
          />
        </Grid>
        <Grid xs={12}>
          <MultiInfoBox
            color="white"
            info={{ title: "Features", content: features, infoName: variableToString({features}) }}
          />
        </Grid>
      </Grid>
    </div>
  );
};
