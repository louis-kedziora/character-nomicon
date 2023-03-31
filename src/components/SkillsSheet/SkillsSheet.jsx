import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Unstable_Grid2";

import { scoreMod } from "components/AttributeSheet/Modifiers";
import { SkillBox } from "components/SkillsSheet/SkillBox";
import { StyledSheetContainer } from "components/StyledComponents";

const strengthSkills = [{ title: "Athletics", skillName: "athletics" }];
const dexteritySkills = [
  { title: "Acrobatics", skillName: "acrobatics" },
  { title: "Sleight of Hand", skillName: "sleightOfHand" },
  { title: "Stealth", skillName: "stealth" },
];
const intelligenceSkills = [
  { title: "Arcana", skillName: "arcana" },
  { title: "History", skillName: "history" },
  { title: "Investigation", skillName: "investigation" },
  { title: "Nature", skillName: "nature" },
  { title: "Religion", skillName: "religion" },
];
const wisdomSkills = [
  { title: "Animal Handling", skillName: "animalHandling" },
  { title: "Insight", skillName: "insight" },
  { title: "Medicine", skillName: "medicine" },
  { title: "Perception", skillName: "perception" },
  { title: "Survival", skillName: "survival" },
];
const charismaSkills = [
  { title: "Deception", skillName: "deception" },
  { title: "Intimidation", skillName: "intimidation" },
  { title: "Performance", skillName: "performance" },
  { title: "Persuasion", skillName: "persuasion" },
];

export const SkillsSheet = () => {
  const [isFetched, setIsFetched] = useState(false);
  const [str, setStr] = useState();
  const [dex, setDex] = useState();
  const [wis, setWis] = useState();
  const [char, setChar] = useState();
  const [int, setInt] = useState();

  useEffect(() => {
    const getCharacter = JSON.parse(sessionStorage.getItem("currentCharacter"));
    setStr(getCharacter["str"]);
    setDex(getCharacter["dex"]);
    setWis(getCharacter["wis"]);
    setChar(getCharacter["char"]);
    setInt(getCharacter["int"]);
    setIsFetched(true);
  }, []);
  // This all relies on everything being present and in order
  //    Prehaps make this safer somehow
  return (
    <StyledSheetContainer maxWidth={false}>
      {isFetched && (
        <div className="skillSheet attackBox">
          <Grid container spacing={1}>
            <Grid xs={4}>
              <h1>Strength {scoreMod(str)}</h1>
              {strengthSkills.map((skill, index) => {
                return (
                    <SkillBox
                      key={index}
                      info={{
                        title: skill.title,
                        skill: skill.skillName,
                      }}
                    />
                );
              })}
            </Grid>

            <Grid xs={4}>
              <h1>Dexterity {scoreMod(dex)}</h1>
              {dexteritySkills.map((skill, index) => {
                return (
                    <SkillBox
                      key={index}
                      info={{
                        title: skill.title,
                        skill: skill.skillName,
                      }}
                    />
                );
              })}
            </Grid>

            <Grid xs={4}>
              <h1>Intelligence {scoreMod(int)}</h1>

              {intelligenceSkills.map((skill, index) => {
                return (
                  <SkillBox
                    key={index}
                    info={{
                      title: skill.title,
                      skill: skill.skillName,
                    }}
                  />
                );
              })}
            </Grid>

            <Grid xs={4}>
              <h1>Wisdom {scoreMod(wis)}</h1>

              {wisdomSkills.map((skill, index) => {
                return (
                  <SkillBox
                    key={index}
                    info={{
                      title: skill.title,
                      skill: skill.skillName,
                    }}
                  />
                );
              })}
            </Grid>

            <Grid xs={4}>
              <h1>Charisma {scoreMod(char)}</h1>
              {charismaSkills.map((skill, index) => {
                return (
                  <SkillBox
                    key={index}
                    info={{
                      title: skill.title,
                      skill: skill.skillName,
                    }}
                  />
                );
              })}
            </Grid>
          </Grid>
        </div>
      )}
    </StyledSheetContainer>
  );
};
