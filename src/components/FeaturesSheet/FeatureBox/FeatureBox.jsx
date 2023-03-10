import React, { useState, useEffect } from "react";
import Box from '@mui/material/Box';

export const FeatureBox = ({ info }) => {
  const { title, infoName, characterID } = info;
  const [content, setContent] = useState();
  const [isFetched, setIsFetched] = useState(false);

  useEffect(() => {
    const character = JSON.parse(sessionStorage.getItem(characterID));
    setContent(character[infoName]);
    setIsFetched(true);
  }, [characterID, infoName, title]);

  return (
    <div>
      {isFetched && (
        <Box className="basicBox statBox featureBox" sx={{}}>
          <h1>{title}</h1>
          <h2>{content}</h2>
        </Box>
      )}
    </div>
  );
};
