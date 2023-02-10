import React, { useState } from "react";
import { updateInfo } from "../DBHandler";

export const MultiInfoBox = ({ info }) => {
  const { title, content, infoName } = info;
  const [infoString, setInfo] = useState(content);
  function handleChange(event) {
    const { value } = event.target;
    setInfo(value);
  }

  function handleFocusLoss() {
    updateInfo(infoName, infoString);
  }

  return (
    <div className="noteBox">
      <h1>{title}</h1>
      <textarea
        onBlur={handleFocusLoss}
        onChange={handleChange}
        value={infoString}
        id="notes"
        name="notes"
        rows={100}
      ></textarea>
    </div>
  );
};
