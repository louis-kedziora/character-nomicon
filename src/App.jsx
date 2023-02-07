import React, { useState, useEffect } from "react";
import { AttributeSheet } from "./components/AttributeSheet";
import axios from "./axios";

function App() {
  const [character, setCharacter] = useState({});
  const [isFetched, setIsFetched] = useState(false);
  const characterName = "Gaston";

  useEffect(() => {
    async function fetchData() {
      const request = await axios.post("/", { name: characterName });
      setCharacter(request.data);
      setIsFetched(true);
      return request;
    }
    fetchData();
  }, [characterName]);
  // NOTE: If there are dependancies they must be put in this array at the bottom

  return <div>{isFetched && <AttributeSheet gaston={character} />}</div>;
}

export default App;
