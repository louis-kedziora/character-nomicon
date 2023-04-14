import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Footer } from "components/partials";
import { SelectionSheet } from "components/SelectionSheet";
import { AttacksSheet } from "components/AttacksSheet";
import { AttributeSheet } from "components/AttributeSheet";
import { FeaturesSheet } from "components/FeaturesSheet";
import { NotesSheet } from "components/NotesSheet";
import { SkillsSheet } from "components/SkillsSheet";
import { SpellsSheet } from "components/SpellsSheet";
import { LootSheet } from "components/LootSheet";

import { CharacterLayout } from "components/CharacterLayout";
import { SelectionLayout } from "components/SelectionSheet/SelectionLayout";
import { LoginSheet } from "components/LoginSheet";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace={true} />} />
        <Route path="/login" element={<LoginSheet />} />
        <Route element={<SelectionLayout />}>
          <Route path="/characters" element={<SelectionSheet />} />
        </Route>

        <Route element={<CharacterLayout />}>
          <Route path="/attacks" element={<AttacksSheet />} />
          <Route path="/attributes" element={<AttributeSheet />} />
          <Route path="/features" element={<FeaturesSheet />} />
          <Route path="/loot" element={<LootSheet />} />
          <Route path="/notes" element={<NotesSheet />} />
          <Route path="/skills" element={<SkillsSheet />} />
          <Route path="/spells" element={<SpellsSheet />} />
        </Route>
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
