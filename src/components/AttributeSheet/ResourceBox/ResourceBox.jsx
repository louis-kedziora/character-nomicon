import React, { useState, useEffect } from "react";
import Fab from "@mui/material/Fab";
import Grid from "@mui/material/Unstable_Grid2";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import EditIcon from "@mui/icons-material/Edit";
import { updateResource, updateInfo } from "components/DBHandler";
import { StyledFab } from "components/StyledComponents";
import { ResourceForm } from "../ResourceForm";

export const ResourceBox = ({ resourceInfo }) => {
  const { resourceID, allResources, setAllResources } = resourceInfo;
  const [characterID, setCharacterID] = useState();
  const [resourceValue, setResourceValue] = useState();
  const [resourceName, setResourceName] = useState();
  const [oldResourceName, setOldResourceName] = useState("");
  const [maxValue, setMaxValue] = useState();
  const [oldMaxValue, setOldMaxValue] = useState("");
  const [cancelEditResource, setCancelEditResource] = useState(false);
  const [openEditResource, setOpenEditResource] = useState(false);
  // const [isDeleteResourceClicked, setDeleteResourceClicked] = useState(false);
  const [isFetched, setIsFetched] = useState(false);

  useEffect(() => {
    const character = JSON.parse(sessionStorage.getItem("currentCharacter"));
    const customResources = character.customResources;
    const foundResource = customResources.find(
      (item) => item.resourceID === resourceID.toString()
    );
    setCharacterID(character._id);
    setResourceValue(foundResource.currentResourceValue);
    setMaxValue(foundResource.maxResourceValue);
    setResourceName(foundResource.resourceName);
    setIsFetched(true);
  }, [resourceID]);

  const openEditResourceHandler = () => {
    setOldResourceName(resourceName);
    setOldMaxValue(maxValue);
    const currentResource = {
      resourceName: resourceName,
      maxResourceValue: maxValue,
    };
    sessionStorage.setItem("currentResource", JSON.stringify(currentResource));
    setOpenEditResource(true);
  };

  const cancelEditResourceHandler = () => {
    setCancelEditResource(true);
    setOpenEditResource(false);
    setCancelEditResource(false);
  };

  const deleteResourceHandler = () => {
    let newResources = [...allResources].filter(
      (resource) => resource.resourceID.toString() !== resourceID
    );

    // Update Character in DB with new resource
    updateInfo("customResources", newResources, characterID);

    // //Update local Storage
    sessionStorage.setItem(
      "currentResource",
      JSON.stringify("")
    );
    let currentCharacter = JSON.parse(
      sessionStorage.getItem("currentCharacter")
    );
    currentCharacter.customResources = newResources;
    sessionStorage.setItem(
      "currentCharacter",
      JSON.stringify(currentCharacter)
    );

    // Update react components
    setAllResources(newResources);
    setOpenEditResource(false);
    setCancelEditResource(false);
  };

  const submitEditResourceHandler = (event) => {
    event.preventDefault();
    if (!cancelEditResource) {
      let updatedResource = {};
      const formData = event.target.elements;
      for (let index = 0; index < formData.length; index++) {
        const element = formData[index];
        if (element.name === "maxResourceValue") {
          updatedResource[element.name] = parseInt(element.value);
        } else {
          updatedResource[element.name] = element.value;
        }
      }
      delete updatedResource[""];
      delete updatedResource.cancelButton;
      if (updatedResource.maxResourceValue < resourceValue) {
        updatedResource["currentResourceValue"] =
          updatedResource.maxResourceValue;
      } else {
        updatedResource["currentResourceValue"] = resourceValue;
      }

      updatedResource["resourceID"] = resourceID;
      if (
        !(
          oldResourceName === updatedResource.resourceName &&
          oldMaxValue === updatedResource.maxResourceValue
        )
      ) {
        let allNewResources = [...allResources];
        let foundResourceIndex = allNewResources.findIndex(
          (item) => item.resourceID === resourceID
        );
        allNewResources[foundResourceIndex] = updatedResource;

        // Update Character in DB with new resource
        updateInfo("customResources", allNewResources, characterID);

        //Update local Storage
        sessionStorage.setItem(
          "currentResource",
          JSON.stringify(updatedResource)
        );
        let currentCharacter = JSON.parse(
          sessionStorage.getItem("currentCharacter")
        );
        currentCharacter.customResources = allNewResources;
        sessionStorage.setItem(
          "currentCharacter",
          JSON.stringify(currentCharacter)
        );

        // //Update react components
        setResourceName(updatedResource.resourceName);
        setMaxValue(updatedResource.maxResourceValue);
        setResourceValue(updatedResource.currentResourceValue);
        setAllResources(allNewResources);
      }
    }
    setOpenEditResource(false);
    setCancelEditResource(false);
  };

  function onClickHandler(event) {
    const changeType = event.currentTarget.name;
    let newValue = -1;
    if (changeType === "Remove") {
      if (resourceValue > 0) {
        setResourceValue(resourceValue - 1);
        newValue = resourceValue - 1;
      }
    } else if (changeType === "Add") {
      if (resourceValue < maxValue) {
        setResourceValue(resourceValue + 1);
        newValue = resourceValue + 1;
      }
    }
    if (newValue > -1) {
      updateResource(resourceID, characterID, newValue);
      let character = JSON.parse(sessionStorage.getItem("currentCharacter"));
      let customResources = character.customResources;
      let foundResource = customResources.find(
        (item) => item.resourceID === resourceID
      );
      foundResource.currentResourceValue = newValue;
      sessionStorage.setItem("currentCharacter", JSON.stringify(character));
    }
  }
  return (
    <div>
      {isFetched && (
        <div>
          {/* If the maxValue <= 0 do not render or in other words
          if the Character does not have the resource do not render the box */}
          {maxValue > 0 && (
            <div className="basicBox resourceBox">
              <h1>{resourceName}</h1>

              <div className="resourceCount">
                <h2>{resourceValue + " / " + maxValue}</h2>
              </div>
              <Grid container spacing={2}>
                <Grid xs={4}>
                  <Fab
                    size="small"
                    name="Remove"
                    color="error"
                    onClick={onClickHandler}
                  >
                    <RemoveIcon fontSize="large" name="Remove" />
                  </Fab>
                </Grid>
                <Grid xs={4}>
                  <StyledFab size="small" onClick={openEditResourceHandler}>
                    <EditIcon />
                  </StyledFab>
                  {openEditResource && (
                    <ResourceForm
                      info={{
                        newResource: false,
                        submitResourceFormHandler: submitEditResourceHandler,
                        openResourceForm: openEditResource,
                        cancelResourceFormHandler: cancelEditResourceHandler,
                        deleteResourceHandler: deleteResourceHandler,
                      }}
                    ></ResourceForm>
                  )}
                </Grid>
                <Grid xs={4}>
                  <Fab
                    size="small"
                    name="Add"
                    color="success"
                    onClick={onClickHandler}
                  >
                    <AddIcon fontSize="large" name="Add" />
                  </Fab>
                </Grid>
              </Grid>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ResourceBox;
