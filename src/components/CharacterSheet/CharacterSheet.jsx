import React, {useEffect, useState} from "react";
import { Routes, Route} from "react-router-dom";
import { AttacksSheet } from "components/AttacksSheet";
import { AttributeSheet } from "components/AttributeSheet";
import { FeaturesSheet } from "components/FeaturesSheet";
import { NotesSheet } from "components/NotesSheet";
import { SkillsSheet } from "components/SkillsSheet";
import { SpellsSheet } from "components/SpellsSheet";
import { LootSheet } from "components/LootSheet";
import { Footer, CharacterAppBar } from "components/partials";

export const CharacterSheet = (characterID) => {
  const [character, setCharacter] = useState({});
  const [isFetched, setIsFetched] = useState(false);

  useEffect(() => {
    const character = JSON.parse(sessionStorage.getItem(characterID));
    setCharacter(character);
    setIsFetched(true);
  }, [characterID]);
  return (
    <div>
      {isFetched && (
        <div>
        <CharacterAppBar characterName={character.name} />
          <Routes>
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
};
