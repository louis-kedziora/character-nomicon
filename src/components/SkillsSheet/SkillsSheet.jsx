import Grid from "@mui/material/Unstable_Grid2";

import { SkillBox } from "components/SkillsSheet/SkillBox";
import { StyledSheetContainer } from "components/StyledComponents";
import { skillsData } from "components/SkillsSheet/SkillsData";

export const SkillsSheet = () => {
  return (
      <div className="skillSheet attackBox">
        <Grid container spacing={1}>
          {skillsData.map((skill, index) => {
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
  );
};
