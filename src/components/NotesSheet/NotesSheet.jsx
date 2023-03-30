import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Unstable_Grid2";
import Container from "@mui/material/Container";

import { MultiInfoBox } from "components/MultiInfoBox";

export const NotesSheet = () => {
  const [character, setCharacter] = useState({});
  const [isFetched, setIsFetched] = useState(false);

  useEffect(() => {
    setCharacter(JSON.parse(sessionStorage.getItem("currentCharacter")));
    setIsFetched(true);
  }, []);
  return (
    <div>
      {isFetched && (
        <Container width="100%" maxWidth={false} sx={{ ml: 0 }}>
          <Grid xs={12}>
            <MultiInfoBox
              color="white"
              info={{
                title: "Notes",
                infoName: "notes",
                characterID: character._id,
              }}
            />
          </Grid>
        </Container>
      )}
    </div>
  );
};
