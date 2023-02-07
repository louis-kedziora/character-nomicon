import React from "react";

import { Header, Footer } from "../partials";

import { AttributeBox } from "./AttributeBox";
import { InfoBox } from "./InfoBox";
import { proficiencyBonus } from "./Modifiers";
import { HPBox } from "./HPBox";
import { ResourceBox } from "./ResourceBox";

export const AttributeSheet = ({ gaston }) => {
  const variableToString = (varObj) => Object.keys(varObj)[0];
  const {
    name,
    currentHP,
    hpMax,
    ac,
    level,
    speed,
    hitDice,
    maxHitDice,
    currentHitDice,
    str,
    int,
    dex,
    wis,
    con,
    char,
  } = gaston;

  return (
    <div>
      <Header />
      <HPBox
        characterInfo={{ title: "HP", hpMax: hpMax, currentHP: currentHP }}
      />
      <ResourceBox
        characterInfo={{
          title: "Hit Dice",
          currentValue: currentHitDice,
          maxValue: maxHitDice,
          extraInfo: hitDice,
          resourceName: variableToString({ currentHitDice }),
          characterName: name
        }}
      />
      <InfoBox info={{ title: "AC", content: ac }} />
      <InfoBox
        info={{ title: "Proficiency", content: proficiencyBonus(level) }}
      />
      <InfoBox info={{ title: "Speed", content: speed }} />
      <InfoBox info={{ title: "Initiative", content: dex }} />

      <AttributeBox attribute={{ attributeName: "Str", attributeScore: str }} />
      <AttributeBox attribute={{ attributeName: "Int", attributeScore: int }} />
      <AttributeBox attribute={{ attributeName: "Dex", attributeScore: dex }} />
      <AttributeBox attribute={{ attributeName: "Wis", attributeScore: wis }} />
      <AttributeBox attribute={{ attributeName: "Con", attributeScore: con }} />
      <AttributeBox
        attribute={{ attributeName: "Char", attributeScore: char }}
      />

      <Footer />
    </div>
  );
};
