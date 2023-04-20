import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Unstable_Grid2";

import { MultiInfoBox } from "components/MultiInfoBox";
import { StyledSheetContainer } from "components/StyledComponents";

export const LootSheet = () => {
  const [character, setCharacter] = useState({});
  const [isFetched, setIsFetched] = useState(false);
  const [lootContent, setLootContent] = useState("");
  const [partyLootContent, setPartyLootContent] = useState("");

  useEffect(() => {
    const getCharacter = JSON.parse(sessionStorage.getItem("currentCharacter"));
    setCharacter(getCharacter);
    setLootContent(getCharacter["loot"]);
    setPartyLootContent(getCharacter["partyLoot"]);
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
                content: lootContent
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
                content: partyLootContent
              }}
            />
          </Grid>
        </StyledSheetContainer>
      )}
    </div>
  );
};
