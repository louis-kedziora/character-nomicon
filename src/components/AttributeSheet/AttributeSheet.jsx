import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Unstable_Grid2";
import Divider from "@mui/material/Divider";

import { AttributeBox } from "components/AttributeSheet/AttributeBox";
import { InfoBox } from "components/AttributeSheet/InfoBox";
import { HPBox } from "components/AttributeSheet/HPBox";
import { ResourceBox } from "components/AttributeSheet/ResourceBox";
import { ResourceForm } from "components/AttributeSheet/ResourceForm";
import { StyledFab, StyledSheetContainer } from "components/StyledComponents";
import { createNewResource } from "components/DBHandler";

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
  const [cancelResourceForm, setCancelResourceForm] = useState(false);
  const [openResourceForm, setOpenResourceForm] = useState(false);

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

  const openResourceFormHandler = () => {
    setCancelResourceForm(false);
    setOpenResourceForm(true);
  };
  const cancelResourceFormHandler = () => {
    setCancelResourceForm(true);
    setOpenResourceForm(false);
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
      console.log(newResource);
      const mongooseID = mongoose.Types.ObjectId();
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

      //Update react components
      setResources([...resources, newResource]);
      setOpenResourceForm(false);
    }
  };

  return (
    <StyledSheetContainer maxWidth={false}>
      {isFetched && (
        <Grid container spacing={1}>
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
              info={{ title: "AC", infoName: "ac", characterID: character._id }}
            />
            <InfoBox
              info={{
                title: "Proficiency",
                infoName: "level",
                characterID: character._id,
              }}
            />
            <InfoBox
              info={{
                title: "Speed",
                infoName: "speed",
                characterID: character._id,
              }}
            />

            <InfoBox
              info={{
                title: "Initiative",
                infoName: "dex",
                characterID: character._id,
              }}
            />
          </Grid>
          <h1 className="sectionHeader">Resources</h1>
          <Divider sx={{ width: "100%", border: "1px solid #464b4c" }} />
          <Grid xs={12}>
            <HPBox
              characterInfo={{
                title: "HP",
                characterID: character._id,
              }}
            />
            {resources.map((resource, index) => {
              return (
                <ResourceBox
                  key={index}
                  resourceInfo={{
                    resourceID: resource.resourceID,
                  }}
                />
              );
            })}
          </Grid>
          <Grid item xs={12}>
            <Grid
              display="flex"
              justifyContent="center"
              alignItems="center"
              xs="auto"
              sx={{
                height: "25%",
                width: "100%",
                margin: "25px",
                padding: "20px",
              }}
            >
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
                    submitResourceFormHandler: submitResourceFormHandler,
                    openResourceForm: openResourceForm,
                    cancelResourceFormHandler: cancelResourceFormHandler,
                  }}
                ></ResourceForm>
              )}
            </Grid>
          </Grid>
        </Grid>
      )}
    </StyledSheetContainer>
  );
};
