import React, { useEffect, useState, useReducer } from "react";
import Grid from "@mui/material/Unstable_Grid2";
import Divider from "@mui/material/Divider";

import { AttributeBox } from "components/AttributeSheet/AttributeBox";
import { characterFormData } from "components/SelectionSheet/CharacterFormData";
import { EditSheet } from "components/EditSheet";

import { InfoBox } from "components/AttributeSheet/InfoBox";
import { HPBox } from "components/AttributeSheet/HPBox";
import { ResourceBox } from "components/AttributeSheet/ResourceBox";
import { ResourceForm } from "components/AttributeSheet/ResourceForm";
import { SkillBox } from "components/SkillsSheet/SkillBox";
import { skillsData } from "components/SkillsSheet/SkillsData";
import { StyledFab, StyledSheetContainer } from "components/StyledComponents";
import { createNewResource, updateCharacter } from "components/DBHandler";

const mongoose = require("mongoose");

const attributes = [
  { title: "Strength", scoreName: "str" },
  { title: "Intelligence", scoreName: "int" },
  { title: "Dexterity", scoreName: "dex" },
  { title: "Wisdom", scoreName: "wis" },
  { title: "Constitution", scoreName: "con" },
  { title: "Charisma", scoreName: "char" },
];
export const AttributeSheet = () => {
  const [character, setCharacter] = useState();
  const [resources, setResources] = useState();
  const [isFetched, setIsFetched] = useState(false);
  const [updateComponent, forceUpdate] = useReducer((x) => x + 1, 0);
  const [cancelResourceForm, setCancelResourceForm] = useState(false);
  const [openResourceForm, setOpenResourceForm] = useState(false);
  const [cancelCharacterForm, setCancelCharacterForm] = useState(false);
  const [openCharacterForm, setOpenCharacterForm] = useState(false);

  useEffect(() => {
    const getCharacter = JSON.parse(sessionStorage.getItem("currentCharacter"));
    setCharacter(getCharacter);
    setResources(getCharacter.customResources);
    sessionStorage.setItem(
      "customResources",
      JSON.stringify(getCharacter.customResources)
    );
    setIsFetched(true);
  }, []);

  const openCharacterFormHandler = () => {
    setCancelCharacterForm(false);
    setOpenCharacterForm(true);
  };
  const cancelCharacterFormHandler = () => {
    setCancelCharacterForm(true);
    setOpenCharacterForm(false);
  };

  const submitCharacterFormHandler = (event) => {
    event.preventDefault();
    if (!cancelCharacterForm) {
      let characterUpdateData = {
        trainedSkills: {},
        savingThrowProficiency: {},
      };
      const formData = event.target.elements;
      for (let index = 0; index < formData.length; index++) {
        const element = formData[index];
        if (element.type === "checkbox") {
          if (element.value === "skills") {
            characterUpdateData["trainedSkills"][element.name] =
              element.checked;
          } else if (element.value === "savingThrow") {
            characterUpdateData["savingThrowProficiency"][element.name] =
              element.checked;
          }
        } else {
          characterUpdateData[element.name] = element.value;
        }
      }
      delete characterUpdateData[""];
      delete characterUpdateData.cancelButton;
      let newCharacter = character;
      Object.keys(characterUpdateData).forEach((key) => {
        newCharacter[key] = characterUpdateData[key];
      });

      if (newCharacter.hpMax < newCharacter.currentHP) {
        newCharacter.currentHP = newCharacter.hpMax;
      }

      // Update DB
      updateCharacter(newCharacter);

      // Update Local storage
      sessionStorage.setItem("currentCharacter", JSON.stringify(newCharacter));

      // Update currently rendered react components
      setCharacter(newCharacter);
      setResources(newCharacter.customResources);
    }
    forceUpdate();
    setOpenCharacterForm(false);
  };

  const openResourceFormHandler = () => {
    setCancelResourceForm(false);
    setOpenResourceForm(true);
  };
  const cancelResourceFormHandler = () => {
    setCancelResourceForm(true);
    setOpenResourceForm(false);
    setCancelResourceForm(true);
  };

  const submitResourceFormHandler = (event) => {
    event.preventDefault();
    if (!cancelResourceForm) {
      let newResource = {};
      const formData = event.target.elements;
      for (let index = 0; index < formData.length; index++) {
        const element = formData[index];
        newResource[element.name] = element.value;
      }
      delete newResource[""];
      delete newResource.cancelButton;
      newResource["currentResourceValue"] = newResource.maxResourceValue;
      const mongooseID = new mongoose.Types.ObjectId();
      newResource["resourceID"] = mongooseID;

      //Update Character in DB with new resource
      createNewResource(newResource, character._id);

      //Update local Storage
      let currentCharacter = JSON.parse(
        sessionStorage.getItem("currentCharacter")
      );
      currentCharacter.customResources = [...resources, newResource];
      sessionStorage.setItem(
        "currentCharacter",
        JSON.stringify(currentCharacter)
      );

      // // Update react components
      setResources([...resources, newResource]);
      setOpenResourceForm(false);
    }
  };

  return (
    <StyledSheetContainer maxWidth={false}>
      {isFetched && (
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <Grid
              display="flex"
              justifyContent="left"
              alignItems="left"
              xs="auto"
            >
              <h1 className="sectionHeader">Attributes</h1>
              <StyledFab
                size="large"
                color="primary"
                variant="extended"
                onClick={openCharacterFormHandler}
              >
                Edit {character.name}
              </StyledFab>
              {openCharacterForm && (
                <EditSheet
                  info={{
                    submitFormHandler: submitCharacterFormHandler,
                    open: openCharacterForm,
                    cancelHandler: cancelCharacterFormHandler,
                    characterInfo: characterFormData,
                  }}
                ></EditSheet>
              )}
            </Grid>
          </Grid>
          <Divider sx={{ width: "100%", border: "1px solid #464b4c" }} />
          <Grid xs={12}>
            {attributes.map((attribute, index) => {
              return (
                <AttributeBox
                  key={index}
                  attribute={{
                    attributeName: attribute.title,
                    attributeScore: character[attribute.scoreName],
                    level: character.level,
                    savingThrowProficiency:
                      character.savingThrowProficiency[attribute.scoreName],
                  }}
                />
              );
            })}
          </Grid>

          <h1 className="sectionHeader">Statistics</h1>
          <Divider sx={{ width: "100%", border: "1px solid #464b4c" }} />
          <Grid xs={12}>
            <InfoBox
              info={{
                title: "AC",
                infoName: "ac",
                characterID: character._id,
                updateComponent: updateComponent,
              }}
            />
            <InfoBox
              info={{
                title: "Proficiency",
                infoName: "level",
                characterID: character._id,
                updateComponent: updateComponent,
              }}
            />
            <InfoBox
              info={{
                title: "Speed",
                infoName: "speed",
                characterID: character._id,
                updateComponent: updateComponent,
              }}
            />

            <InfoBox
              info={{
                title: "Initiative",
                infoName: "dex",
                characterID: character._id,
                updateComponent: updateComponent,
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <Grid
              display="flex"
              justifyContent="left"
              alignItems="left"
              xs="auto"
              sx={{
                height: "25%",
                width: "100%",
              }}
            >
              <h1 className="sectionHeader">Resources</h1>
              <StyledFab
                size="large"
                color="primary"
                variant="extended"
                onClick={openResourceFormHandler}
              >
                New Resource
              </StyledFab>

              {openResourceForm && (
                <ResourceForm
                  info={{
                    newResource: true,
                    submitResourceFormHandler: submitResourceFormHandler,
                    openResourceForm: openResourceForm,
                    cancelResourceFormHandler: cancelResourceFormHandler,
                  }}
                ></ResourceForm>
              )}
            </Grid>
          </Grid>
          <Divider sx={{ width: "100%", border: "1px solid #464b4c" }} />
          <Grid xs={12}>
            <HPBox
              characterInfo={{
                title: "HP",
                characterID: character._id,
                updateComponent: updateComponent,
              }}
            />
            {resources.map((resource, index) => {
              return (
                <ResourceBox
                  key={index}
                  resourceInfo={{
                    resourceID: resource.resourceID,
                    allResources: resources,
                    setAllResources: setResources,
                    updateComponent: updateComponent,
                  }}
                />
              );
            })}
          </Grid>

          <h1 className="sectionHeader">Skills</h1>
          <Divider sx={{ width: "100%", border: "1px solid #464b4c" }} />
          <Grid xs={12}>
            <Grid container spacing={1}>
              {skillsData.map((skill, index) => {
                return (
                  <SkillBox
                    key={index}
                    info={{
                      title: skill.title,
                      skill: skill.skillName,
                      updateComponent: updateComponent,
                    }}
                  />
                );
              })}
            </Grid>
          </Grid>
        </Grid>
      )}
    </StyledSheetContainer>
  );
};
