import React, { useEffect, useState } from "react";
import { updateInfo } from "../DBHandler";

export const MultiInfoBox = ({ info }) => {
  const { title, infoName, characterID } = info;
  const [content, setContent] = useState()
  const [isFetched, setIsFetched] = useState(false);

  useEffect(() => {
    const character = JSON.parse(sessionStorage.getItem(characterID));
    setContent(character[infoName]);
    setIsFetched(true);
  }, [characterID, infoName]);

  function handleChange(event) {
    const { value } = event.target;
    setContent(value);
  }

  function handleFocusLoss(event) {
    updateInfo(infoName, content);
    let character = JSON.parse(sessionStorage.getItem(characterID));
    character[infoName] = content;
    sessionStorage.setItem(characterID, JSON.stringify(character));
  }

  return (
    <div>
    {isFetched &&
    <div className="noteBox">
      <h1>{title}</h1>
      <textarea
        onBlur={handleFocusLoss}
        onChange={handleChange}
        value={content}
        id="notes"
        name="notes"
        rows={100}
      ></textarea>
    </div>
    }
    </div>
  );
};
