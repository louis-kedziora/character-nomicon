import Grid from "@mui/material/Unstable_Grid2";

import { SkillBox } from "components/SkillsSheet/SkillBox";
import { StyledSheetContainer } from "components/StyledComponents";

const skills = [
  { title: "Acrobatics", skillName: "acrobatics" },
  { title: "Animal Handling", skillName: "animalHandling" },
  { title: "Arcana", skillName: "arcana" },
  { title: "Athletics", skillName: "athletics" },
  { title: "Deception", skillName: "deception" },
  { title: "History", skillName: "history" },
  { title: "Insight", skillName: "insight" },
  { title: "Intimidation", skillName: "intimidation" },
  { title: "Investigation", skillName: "investigation" },
  { title: "Medicine", skillName: "medicine" },
  { title: "Nature", skillName: "nature" },
  { title: "Perception", skillName: "perception" },
  { title: "Performance", skillName: "performance" },
  { title: "Persuasion", skillName: "persuasion" },
  { title: "Religion", skillName: "religion" },
  { title: "Sleight of Hand", skillName: "sleightOfHand" },
  { title: "Stealth", skillName: "stealth" },
  { title: "Survival", skillName: "survival" },
];

export const SkillsSheet = () => {
  // This all relies on everything being present and in order
  //    Prehaps make this safer somehow
  return (
    <StyledSheetContainer maxWidth={false}>
      <div className="skillSheet attackBox">
        <Grid container spacing={1}>
          {skills.map((skill, index) => {
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
      </div>
    </StyledSheetContainer>
  );
};
