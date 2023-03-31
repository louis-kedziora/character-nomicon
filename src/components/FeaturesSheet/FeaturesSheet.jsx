import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Unstable_Grid2";

import { MultiInfoBox } from "components/MultiInfoBox";
import { FeatureBox } from "components/FeaturesSheet/FeatureBox";
import { StyledSheetContainer } from "components/StyledComponents";

const featureLabels = [
  "Class",
  "Race",
  "Background",
  "Alignment",
  "Languages Known",
  "Armor Proficiences",
  "Weapon Proficiences",
  "Tool Proficiences",
];
const featureNames = {
  Class: "characterClass",
  Race: "race",
  Background: "background",
  Alignment: "alignment",
  LanguagesKnown: "languagesKnown",
  ArmorProficiences: "armorProficiences",
  WeaponProficiences: "weaponProficiences",
  ToolProficiences: "toolProficiences",
};

export const FeaturesSheet = () => {
  const [character, setCharacter] = useState({});
  const [isFetched, setIsFetched] = useState(false);

  useEffect(() => {
    setCharacter(JSON.parse(sessionStorage.getItem("currentCharacter")));
    setIsFetched(true);
  }, []);
  return (
    <div>
      {isFetched && (
        <StyledSheetContainer maxWidth={false}>

          <Grid container spacing={4}>
            <Grid xs={12}>
              {featureLabels.map((feature, index) => (
                <FeatureBox
                  key={index}
                  info={{
                    title: feature,
                    infoName: featureNames[feature.replace(" ", "")],
                    characterID: character._id,
                  }}
                />
              ))}
            </Grid>
            <Grid xs={12}>
              <MultiInfoBox
                color="white"
                info={{
                  title: "Features",
                  infoName: "features",
                  characterID: character._id,
                }}
              />
            </Grid>
          </Grid>
          </StyledSheetContainer>
      )}
    </div>
  );
};
