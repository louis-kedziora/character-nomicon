import React, { useState, useEffect } from "react";
import axios from "axios";
const serverURL = process.env.REACT_APP_SERVER_URL || "http://localhost:4000";
const instance = axios.create({
  baseURL: serverURL + "/api/characters/get",
});

export const CharacterSheet = (characterID) => {
  const [character, setCharacter] = useState({});
  const [isFetched, setIsFetched] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const request = await instance.post("/", { _id: characterID });
      setCharacter(request.data);
      sessionStorage.setItem(request.data._id, JSON.stringify(request.data));
      setIsFetched(true);
      return request;
    }
    fetchData();
  }, [characterID]);
  return (
    <div>
      {isFetched && (
        <div>
          <h1>Character Sheet</h1>
        </div>
      )}
    </div>
  );
};
