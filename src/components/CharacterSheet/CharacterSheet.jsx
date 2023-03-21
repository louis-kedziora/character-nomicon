import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { AttacksSheet } from "components/AttacksSheet";
import { AttributeSheet } from "components/AttributeSheet";
import { FeaturesSheet } from "components/FeaturesSheet";
import { NotesSheet } from "components/NotesSheet";
import { SkillsSheet } from "components/SkillsSheet";
import { SpellsSheet } from "components/SpellsSheet";
import { LootSheet } from "components/LootSheet";
import { CharacterAppBar } from "components/partials";

export const CharacterSheet = () => {
  // // const [character, setCharacter] = useState({});
  // const [characterID, setCharacterID] = useState("");
  // const [isFetched, setIsFetched] = useState(false);

  // useEffect(() => {
  //   const characterID = JSON.parse(sessionStorage.getItem("currentCharacter"));
  //   setCharacterID(characterID);
  //   // setCharacter(JSON.parse(sessionStorage.getItem(characterID)));
  //   setIsFetched(true);
  // }, [characterID]);

  // return (
  //   <div>
  //     <Routes>
  //       <Route
  //         path="/"
  //         element={<Navigate to="/attributes" replace={true} />}
  //       />
  //       <Route
  //         path="/attacks"
  //         element={<AttacksSheet characterID={characterID} />}
  //       />
  //       <Route
  //         path="/attributes"
  //         element={<AttributeSheet characterID={characterID} />}
  //       />
  //       <Route
  //         path="/features"
  //         element={<FeaturesSheet characterID={characterID} />}
  //       />
  //       <Route path="/loot" element={<LootSheet characterID={characterID} />} />
  //       <Route
  //         path="/notes"
  //         element={<NotesSheet characterID={characterID} />}
  //       />
  //       <Route
  //         path="/skills"
  //         element={<SkillsSheet characterID={characterID} />}
  //       />
  //       <Route
  //         path="/spells"
  //         element={<SpellsSheet characterID={characterID} />}
  //       />
  //     </Routes>
  //     {isFetched && (
  //       <div>
  //         <CharacterAppBar/>
  //         <Navigate to="/attributes" replace={true} />
  //       </div>
  //     )}
  //   </div>
  // );
};
