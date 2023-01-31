import React from "react";

import { Header, Footer } from "../partials";

import { AttributeBox } from "./AttributeBox";
import { InfoBox } from "./InfoBox";
import { scoreMod, proficiencyBonus } from "./Modifiers";
import { HPBox } from "./HPBox";

import Gaston from "../../testCharacter";

export const AttributeSheet = () => {
  return (
    <div>
      <Header />
      <HPBox title="HP" info={Gaston.hpMax} />
      <InfoBox title="AC" info={Gaston.ac} />
      <InfoBox title="Proficiency" info={proficiencyBonus(Gaston.level)} />
      <InfoBox title="Speed" info={Gaston.speed} />
      <InfoBox title="Initiative" info={scoreMod(Gaston.dex)} />
      <InfoBox title="Speed" info={Gaston.speed} />
      <InfoBox title="Hit Dice" info={Gaston.level + Gaston.hitDice} />
      <AttributeBox attributeName="Str" attributeScore={Gaston.str} />
      <AttributeBox attributeName="Int" attributeScore={Gaston.int} />
      <AttributeBox attributeName="Dex" attributeScore={Gaston.dex} />
      <AttributeBox attributeName="Wis" attributeScore={Gaston.wis} />
      <AttributeBox attributeName="Con" attributeScore={Gaston.con} />
      <AttributeBox attributeName="Char" attributeScore={Gaston.char} />

      <Footer />
    </div>
  );
};
