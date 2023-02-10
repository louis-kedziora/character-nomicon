import React from "react";
import Grid from "@mui/material/Unstable_Grid2";


import { InfoBox } from "../AttributeSheet/InfoBox";
import { MultiInfoBox } from "../MultiInfoBox/MultiInfoBox";

export const FeaturesSheet = ({ gaston }) => {
  const lorem =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";

  return (
    <div>
      <Grid container spacing={4}>
        <Grid xs={12}>
          <InfoBox info={{ title: "Class", content: "Place_Holder" }} />
          <InfoBox info={{ title: "Race", content: "Place_Holder" }} />
          <InfoBox info={{ title: "Background", content: "Place_Holder" }} />
          <InfoBox info={{ title: "Alignment", content: "Place_Holder" }} />
          <InfoBox
            info={{ title: "Armor Proficiences", content: "Place_Holder" }}
          />
          <InfoBox
            info={{ title: "Languages Known", content: "Place_Holder" }}
          />
          <InfoBox
            info={{ title: "Weapon Proficiences", content: "Place_Holder" }}
          />
          <InfoBox
            info={{ title: "Tool Proficiences", content: "Place_Holder" }}
          />
        </Grid>
        <Grid xs={12}>
          <MultiInfoBox
            color="white"
            info={{ title: "Features", content: lorem }}
          />
        </Grid>
      </Grid>
    </div>
  );
};
