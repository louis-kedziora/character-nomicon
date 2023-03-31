import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Unstable_Grid2";
import Divider from "@mui/material/Divider";

import { AttributeBox } from "components/AttributeSheet/AttributeBox";
import { InfoBox } from "components/AttributeSheet/InfoBox";
import { HPBox } from "components/AttributeSheet/HPBox";
import { ResourceBox } from "components/AttributeSheet/ResourceBox";
import { StyledSheetContainer } from "components/StyledComponents";


const attributes = [
  { title: "Strength", scoreName: "str" },
  { title: "Intelligence", scoreName: "int" },
  { title: "Dexterity", scoreName: "dex" },
  { title: "Wisdom", scoreName: "wis" },
  { title: "Constitution", scoreName: "con" },
  { title: "Charisma", scoreName: "char" },
];
export const AttributeSheet = () => {
  const [character, setCharacter] = useState();
  const [isFetched, setIsFetched] = useState(false);

  useEffect(() => {
    setCharacter(JSON.parse(sessionStorage.getItem("currentCharacter")));
    setIsFetched(true);
  }, []);

  return (
    <StyledSheetContainer maxWidth={false}>

      {isFetched && (
        <Grid container spacing={1}>
          <Grid xs={12}>
            {attributes.map((attribute, index) => {
              return (
                <AttributeBox
                  key={index}
                  attribute={{
                    attributeName: attribute.title,
                    attributeScore: character[attribute.scoreName],
                    level: character.level,
                    savingThrowProficiency: character.savingThrowProficiency[attribute.scoreName],
                  }}
                />
              );
            })}
          </Grid>
          <h1 className="sectionHeader">Statistics</h1>
          <Divider sx={{ width: "100%", border: "1px solid #464b4c" }} />
          <Grid xs={12}>
            <InfoBox
              info={{ title: "AC", infoName: "ac", characterID: character._id }}
            />
            <InfoBox
              info={{
                title: "Proficiency",
                infoName: "level",
                characterID: character._id,
              }}
            />
            <InfoBox
              info={{
                title: "Speed",
                infoName: "speed",
                characterID: character._id,
              }}
            />

            <InfoBox
              info={{
                title: "Initiative",
                infoName: "dex",
                characterID: character._id,
              }}
            />
          </Grid>
          <h1 className="sectionHeader">Resources</h1>
          <Divider sx={{ width: "100%", border: "1px solid #464b4c" }} />
          <Grid xs={12}>
            <HPBox
              characterInfo={{
                title: "HP",
                characterID: character._id,
              }}
            />
            <ResourceBox
              characterInfo={{
                title: "Hit Dice",
                resourceName: "currentHitDice",
                characterID: character._id,
                extraInfo: character.hitDice,
              }}
            />
            <ResourceBox
              characterInfo={{
                title: "1st Level Spells",
                resourceName: "currentOneSpellSlots",
                characterID: character._id,
              }}
            />
            <ResourceBox
              characterInfo={{
                title: "2nd Level Spells",
                resourceName: "currentTwoSpellSlots",
                characterID: character._id,
              }}
            />
            <ResourceBox
              characterInfo={{
                title: "3rd Level Spell",
                resourceName: "currentThreeSpellSlots",
                characterID: character._id,
              }}
            />
            <ResourceBox
              characterInfo={{
                title: "Wild Shapes",
                resourceName: "currentWildShapes",
                characterID: character._id,
              }}
            />
            <ResourceBox
              characterInfo={{
                title: "Guiding Bolts",
                resourceName: "currentGuidingBolts",
                characterID: character._id,
              }}
            />
            {/* May need a specific box for this or a additional Info for this
      ie. Woe / Weal*/}
            <ResourceBox
              characterInfo={{
                title: "Cosmic Omens",
                resourceName: "currentCosmicOmens",
                characterID: character._id,
              }}
            />
          </Grid>
        </Grid>
      )}
      </StyledSheetContainer>
  );
};
