import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Unstable_Grid2";
import Container from "@mui/material/Container";
import Divider from '@mui/material/Divider';

import { AttributeBox } from "./AttributeBox";
import { InfoBox } from "./InfoBox";
import { HPBox } from "./HPBox";
import { ResourceBox } from "./ResourceBox";

export const AttributeSheet = ({ characterID }) => {
  const [character, setCharacter] = useState();
  const [isFetched, setIsFetched] = useState(false);

  useEffect(() => {
    const character = JSON.parse(sessionStorage.getItem(characterID));
    setCharacter(character);
    setIsFetched(true);
  }, [characterID]);

  return (
    <Container width="100%" maxWidth={false} sx={{ ml: 0 }}>
      {isFetched && (
        <Grid container spacing={1}>
          <Grid xs={12}>
            <AttributeBox
              attribute={{
                attributeName: "Strength",
                attributeScore: character.str,
              }}
            />
            <AttributeBox
              attribute={{
                attributeName: "Intelligence",
                attributeScore: character.int,
              }}
            />
            <AttributeBox
              attribute={{
                attributeName: "Dexterity",
                attributeScore: character.dex,
              }}
            />
            <AttributeBox
              attribute={{
                attributeName: "Wisdom",
                attributeScore: character.wis,
              }}
            />
            <AttributeBox
              attribute={{
                attributeName: "Constitution",
                attributeScore: character.con,
              }}
            />
            <AttributeBox
              attribute={{
                attributeName: "Charisma",
                attributeScore: character.char,
              }}
            />
          </Grid>
          <h1 className="sectionHeader">Statistics</h1>
          <Divider sx={{ width:"100%", border: "1px solid #464b4c" }} />
          <Grid xs={12}>
            <InfoBox
              info={{ title: "AC", infoName: "ac", characterID: characterID }}
            />
            <InfoBox
              info={{
                title: "Proficiency",
                infoName: "level",
                characterID: characterID,
              }}
            />
            <InfoBox
              info={{
                title: "Speed",
                infoName: "speed",
                characterID: characterID,
              }}
            />

            <InfoBox
              info={{
                title: "Initiative",
                infoName: "dex",
                characterID: characterID,
              }}
            />
          </Grid>
          <h1 className="sectionHeader">Resources</h1>
          <Divider sx={{ width:"100%", border: "1px solid #464b4c" }} />
          <Grid xs={12}>
            <HPBox
              characterInfo={{
                title: "HP",
                characterID: characterID,
              }}
            />
            <ResourceBox
              characterInfo={{
                title: "Hit Dice",
                resourceName: "currentHitDice",
                characterID: characterID,
                extraInfo: character.hitDice,
              }}
            />
            <ResourceBox
              characterInfo={{
                title: "1st Level Spells",
                resourceName: "currentOneSpellSlots",
                characterID: characterID,
              }}
            />
            <ResourceBox
              characterInfo={{
                title: "2nd Level Spells",
                resourceName: "currentTwoSpellSlots",
                characterID: characterID,
              }}
            />
            <ResourceBox
              characterInfo={{
                title: "3rd Level Spell",
                resourceName: "currentThreeSpellSlots",
                characterID: characterID,
              }}
            />
            <ResourceBox
              characterInfo={{
                title: "Wild Shapes",
                resourceName: "currentWildShapes",
                characterID: characterID,
              }}
            />
            <ResourceBox
              characterInfo={{
                title: "Guiding Bolts",
                resourceName: "currentGuidingBolts",
                characterID: characterID,
              }}
            />
            {/* May need a specific box for this or a additional Info for this
      ie. Woe / Weal*/}
            <ResourceBox
              characterInfo={{
                title: "Cosmic Omens",
                resourceName: "currentCosmicOmens",
                characterID: characterID,
              }}
            />
          </Grid>
        </Grid>
      )}
    </Container>
  );
};
