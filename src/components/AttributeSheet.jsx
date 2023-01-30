import React from "react";

import Header from "./partials/Header";
import Footer from "./partials/Footer";


import AttributeBox from "./AttributeBox";
import InfoBox from "./InfoBox";
import Gaston from "../testCharacter"
import scoreMod, { proficiencyBonus } from "./Modifiers";
import HPBox from "./HPBox";


function AttributeSheet() {

  return (
    <div>
      <Header/>
      <HPBox title="HP" info={Gaston.hpMax}/>
      <InfoBox title="AC" info={Gaston.ac}/>
      <InfoBox title="Proficiency" info={proficiencyBonus(Gaston.level)}/>
      <InfoBox title="Speed" info={Gaston.speed}/>
      <InfoBox title="Initiative" info={scoreMod(Gaston.dex)}/>
      <InfoBox title="Speed" info={Gaston.speed}/>
      <InfoBox title="Hit Dice" info={Gaston.level + Gaston.hitDice}/>
      <AttributeBox attributeName="Str" attributeScore={Gaston.str}/>
      <AttributeBox attributeName="Int" attributeScore={Gaston.int}/>
      <AttributeBox attributeName="Dex" attributeScore={Gaston.dex}/>
      <AttributeBox attributeName="Wis" attributeScore={Gaston.wis}/>
      <AttributeBox attributeName="Con" attributeScore={Gaston.con}/>
      <AttributeBox attributeName="Char" attributeScore={Gaston.char}/>

      <Footer />
    </div>
  );
}

export default AttributeSheet;
