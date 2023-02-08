import React from "react";
import { modifierAndProficency, scoreMod } from "../../AttributeSheet/Modifiers";

export const SkillBox = ({ info }) => {
  const { skill, isTrained, score, level } = info;

  return (
    <div className="attributeBox resourceBox">
      <h1>{skill}</h1>
      <h2>{isTrained ? modifierAndProficency(level, score) : scoreMod(score)}</h2>
    </div>
  );
};
