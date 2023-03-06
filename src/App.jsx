import React, { useState, useEffect } from "react";
import axios from "./axios";
import { Routes, Route } from "react-router-dom";
import { SelectionSheet } from "./components/SelectionSheet";
import { AttacksSheet } from "./components/AttacksSheet";
import { AttributeSheet } from "./components/AttributeSheet";
import { FeaturesSheet } from "./components/FeaturesSheet";
import { NotesSheet } from "./components/NotesSheet";
import { SkillsSheet } from "./components/SkillsSheet";
import { SpellsSheet } from "./components/SpellsSheet";
import { LootSheet } from "./components/LootSheet";
import { Footer, CharacterAppBar } from "./components/partials";

function App() {
  const [character, setCharacter] = useState({});
  const [isFetched, setIsFetched] = useState(false);
  const characterName = "Sevro";

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
      {isFetched && (
        <div>
          <CharacterAppBar />
          <Routes>
            <Route path="/" element={<SelectionSheet user={character} />} />
            <Route
              path="/attacks"
              element={<AttacksSheet gaston={character} />}
            />
            <Route
              path="/attributes"
              element={<AttributeSheet gaston={character} />}
            />
            <Route
              path="/features"
              element={<FeaturesSheet gaston={character} />}
            />
            <Route path="/loot" element={<LootSheet gaston={character} />} />
            <Route path="/notes" element={<NotesSheet gaston={character} />} />
            <Route
              path="/skills"
              element={<SkillsSheet gaston={character} />}
            />
            <Route
              path="/skills"
              element={<SkillsSheet gaston={character} />}
            />
            <Route
              path="/spells"
              element={<SpellsSheet gaston={character} />}
            />
          </Routes>
          <Footer />
        </div>
      )}
    </div>
  );
}

export default App;
