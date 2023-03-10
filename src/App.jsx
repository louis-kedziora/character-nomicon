import React, { useState, useEffect } from "react";
import axios from "axios";
import { Routes, Route } from "react-router-dom";
import { AttacksSheet } from "components/AttacksSheet";
import { AttributeSheet } from "components/AttributeSheet";
import { FeaturesSheet } from "components/FeaturesSheet";
import { NotesSheet } from "components/NotesSheet";
import { SkillsSheet } from "components/SkillsSheet";
import { SpellsSheet } from "components/SpellsSheet";
import { LootSheet } from "components/LootSheet";
import { Footer, CharacterAppBar } from "components/partials";

function App() {
  const [character, setCharacter] = useState({});
  const [isFetched, setIsFetched] = useState(false);
  const characterID = "63ee8cedd307d6342d6580bd";

  const serverURL = process.env.REACT_APP_SERVER_URL || "http://localhost:4000";
  const instance = axios.create({
    baseURL: serverURL +"/api/characters/get"
  });
  
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
  // NOTE: If there are dependancies they must be put in this array at the bottom
  return (
    <div>
      {isFetched && (
        <div>
          <CharacterAppBar characterName={character.name} />
          <Routes>
            <Route
              path="/"
              element={<AttributeSheet characterID={characterID} />}
            />
            <Route
              path="/attacks"
              element={<AttacksSheet characterID={characterID} />}
            />
            <Route
              path="/attributes"
              element={<AttributeSheet characterID={characterID} />}
            />
            <Route
              path="/features"
              element={<FeaturesSheet characterID={characterID} />}
            />
            <Route
              path="/loot"
              element={<LootSheet characterID={characterID} />}
            />
            <Route
              path="/notes"
              element={<NotesSheet characterID={characterID} />}
            />
            <Route
              path="/skills"
              element={<SkillsSheet characterID={characterID} />}
            />
            <Route
              path="/spells"
              element={<SpellsSheet characterID={characterID} />}
            />
          </Routes>
          <Footer />
        </div>
      )}
    </div>
  );
}

export default App;
