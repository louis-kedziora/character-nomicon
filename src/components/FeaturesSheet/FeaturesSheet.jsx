import React from "react";
import Grid from "@mui/material/Unstable_Grid2";

import { InfoBox } from "../AttributeSheet/InfoBox";
import { MultiInfoBox } from "../MultiInfoBox/MultiInfoBox";

export const FeaturesSheet = ({ characterID }) => {
  return (
    <div>
      <Grid container spacing={4}>
        <Grid xs={12}>
          <InfoBox
            info={{
              title: "Class",
              infoName: "characterClass",
              characterID: characterID,
            }}
          />
          <InfoBox
            info={{ title: "Race", infoName: "race", characterID: characterID }}
          />
          <InfoBox
            info={{
              title: "Background",
              infoName: "background",
              characterID: characterID,
            }}
          />
          <InfoBox
            info={{
              title: "Alignment",
              infoName: "alignment",
              characterID: characterID,
            }}
          />
          <InfoBox
            info={{
              title: "Languages Known",
              infoName: "languagesKnown",
              characterID: characterID,
            }}
          />
          <InfoBox
            info={{
              title: "Armor Proficiences",
              infoName: "armorProficiences",
              characterID: characterID,
            }}
          />

          <InfoBox
            info={{
              title: "Weapon Proficiences",
              infoName: "weaponProficiences",
              characterID: characterID,
            }}
          />
          <InfoBox
            info={{
              title: "Tool Proficiences",
              infoName: "toolProficiences",
              characterID: characterID,
            }}
          />
        </Grid>
        <Grid xs={12}>
          <MultiInfoBox
            color="white"
            info={{
              title: "Features",
              infoName: "features",
              characterID: characterID,
            }}
          />
        </Grid>
        Proficiences
      </Grid>
    </div>
  );
};
