import React, { useEffect, useState } from "react";
import Container from "@mui/material/Container";
import TextareaAutosize from "@mui/base/TextareaAutosize";

import { updateInfo } from "components/DBHandler";

export const MultiInfoBox = ({ info }) => {
  const { title, characterID, infoName, content } = info;
  const [isFetched, setIsFetched] = useState(false);
  const [contentState, setContentState] = useState("");

  useEffect(() => {
    setContentState(content);
    setIsFetched(true);
  }, [content]);

  const handleChange = (event) => {
    const { value } = event.target;
    setContentState(value);
  };

  function handleFocusLoss(event) {
    updateInfo(infoName, contentState, characterID);
    let character = JSON.parse(sessionStorage.getItem("currentCharacter"));
    character[infoName] = contentState;
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
          <TextareaAutosize
            onBlur={handleFocusLoss}
            onChange={handleChange}
            value={contentState}
            id="notes"
            name="notes"
          />
        </Container>
      )}
    </div>
  );
};
