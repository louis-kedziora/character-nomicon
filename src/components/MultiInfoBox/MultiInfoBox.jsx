import React, { useEffect, useState } from "react";
import Container from "@mui/material/Container";

import { updateInfo } from "components/DBHandler";

export const MultiInfoBox = ({ info }) => {
  const { title, infoName, characterID } = info;
  const [content, setContent] = useState();
  const [isFetched, setIsFetched] = useState(false);

  useEffect(() => {
    const character = JSON.parse(sessionStorage.getItem("currentCharacter"));
    setContent(character[infoName]);
    setIsFetched(true);
  }, [characterID, infoName]);

  function handleChange(event) {
    const { value } = event.target;
    setContent(value);
  }

  function handleFocusLoss(event) {
    updateInfo(infoName, content, characterID);
    let character = JSON.parse(sessionStorage.getItem("currentCharacter"));
    character[infoName] = content;
    sessionStorage.setItem("currentCharacter", JSON.stringify(character));
  }

  return (
    <div>
      {isFetched && (
        <Container
          className="noteBox"
          width="100%"
          maxWidth={false}
          sx={{ ml: 0 }}
        >
          <h1>{title}</h1>
          <textarea
            onBlur={handleFocusLoss}
            onChange={handleChange}
            value={content}
            id="notes"
            name="notes"
            rows={100}
          ></textarea>
        </Container>
      )}
    </div>
  );
};
