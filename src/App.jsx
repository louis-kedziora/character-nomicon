import React, { useState, useEffect } from "react";
import { AttributeSheet } from "./components/AttributeSheet";
import axios from "./axios";
import { Routes, Route } from "react-router-dom";
import { SkillsSheet } from "./components/SkillsSheet/SkillsSheet";
import { Footer, Header } from "./components/partials";

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
  return (
    <div>
      <Header />
      <Routes>
        <Route
          path="/"
          element={isFetched && <AttributeSheet gaston={character} />}
        />
        <Route
          path="/skills-sheet"
          element={isFetched && <SkillsSheet gaston={character} />}
        />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
