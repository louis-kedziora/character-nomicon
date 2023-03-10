import React, { useState, useEffect } from "react";
import { proficiencyBonus, scoreMod } from "components/AttributeSheet/Modifiers";

export const InfoBox = ({ info }) => {
  const { title, infoName, characterID } = info;
  const [content, setContent] = useState();
  const [isFetched, setIsFetched] = useState(false);

  useEffect(() => {
    const character = JSON.parse(sessionStorage.getItem(characterID));
    if (title === "Proficiency") {
      setContent(proficiencyBonus(character[infoName]));
    } else if (title === "Initiative") {
      setContent(scoreMod(character[infoName]));
    } else {
      setContent(character[infoName]);
    }
    setIsFetched(true);
  }, [characterID, infoName, title]);

  return (
    <div>
      {isFetched && (
        <div className="basicBox statBox">
          <h1>{title}</h1>
          <h2>{content}</h2>
        </div>
      )}
    </div>
  );
};
