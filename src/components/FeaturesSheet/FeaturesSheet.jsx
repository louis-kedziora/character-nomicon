import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Unstable_Grid2";

import { InfoBox } from "../AttributeSheet/InfoBox";
import { MultiInfoBox } from "../MultiInfoBox/MultiInfoBox";

export const FeaturesSheet = ({ characterID }) => {
  const [isFetched, setIsFetched] = useState(false);
  const [userClass, setUserClass] = useState();
  const [race, setRace] = useState();
  const [background, setBackground] = useState();
  const [alignment, setAlignment] = useState();
  const [languages, setLanguages] = useState();
  const [armors, setArmors] = useState();
  const [weapons, setWeapons] = useState();
  const [tools, setTools] = useState();

  useEffect(() => {
    const character = JSON.parse(sessionStorage.getItem(characterID));
    setUserClass(character["characterClass"]);
    setRace(character["race"]);
    setBackground(character["background"]);
    setAlignment(character["alignment"]);
    setLanguages(character["languagesKnown"]);
    setArmors(character["armorProficiences"]);
    setWeapons(character["weaponProficiences"]);
    setTools(character["toolProficiences"]);
    setIsFetched(true);
  }, [characterID]);

  return (
    <div>
      {isFetched && (
        <div>
          <Grid container spacing={4}>
            <Grid xs={12}>
              <InfoBox info={{ title: "Class", content: userClass }} />
              <InfoBox info={{ title: "Race", content: race }} />
              <InfoBox info={{ title: "Background", content: background }} />
              <InfoBox info={{ title: "Alignment", content: alignment }} />
              <InfoBox
                info={{ title: "Languages Known", content: languages }}
              />
              <InfoBox
                info={{
                  title: "Armor Proficiences",
                  content: armors,
                }}
              />

              <InfoBox
                info={{
                  title: "Weapon Proficiences",
                  content: weapons,
                }}
              />
              <InfoBox info={{ title: "Tool Proficiences", content: tools }} />
            </Grid>
            <Grid xs={12}>
              <MultiInfoBox
                color="white"
                info={{
                  title: "Features",
                  infoName: "features",
                  characterID: characterID
                }}
              />
            </Grid>
          </Grid>
        </div>
      )}
    </div>
  );
};
