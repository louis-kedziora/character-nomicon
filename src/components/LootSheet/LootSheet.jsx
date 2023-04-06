import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Unstable_Grid2";

import { MultiInfoBox } from "components/MultiInfoBox";
import { StyledSheetContainer } from "components/StyledComponents";

export const LootSheet = () => {
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
          <Grid xs={12}>
            <MultiInfoBox
              color="white"
              info={{
                title: "Loot",
                infoName: "loot",
                characterID: character._id,
              }}
            />
          </Grid>
          <Grid xs={12}>
            <MultiInfoBox
              color="white"
              info={{
                title: "Party Loot",
                infoName: "partyLoot",
                characterID: character._id,
              }}
            />
          </Grid>
        </StyledSheetContainer>
      )}
    </div>
  );
};
