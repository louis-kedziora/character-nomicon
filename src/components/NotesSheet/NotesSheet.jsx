import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Unstable_Grid2";

import { MultiInfoBox } from "components/MultiInfoBox";
import { StyledSheetContainer } from "components/StyledComponents";

export const NotesSheet = () => {
  const [character, setCharacter] = useState({});
  const [isFetched, setIsFetched] = useState(false);
  const [content, setContent] = useState("");

  useEffect(() => {
    const getCharacter = JSON.parse(sessionStorage.getItem("currentCharacter"))
    setCharacter(getCharacter);
    setContent(getCharacter["notes"]);
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
                title: "Notes",
                infoName: "notes",
                characterID: character._id,
                content: content,
              }}
            />
          </Grid>
        </StyledSheetContainer>
      )}
    </div>
  );
};
