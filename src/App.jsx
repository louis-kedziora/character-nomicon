import React, { useState, useEffect } from "react";
import axios from "axios";
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
import { Protected } from "components/Protected";

const serverURL = process.env.REACT_APP_SERVER_URL || "http://localhost:4000";
const instance = axios.create({
  baseURL: serverURL,
});

function App() {
  const [isFetched, setIsFetched] = useState(false);
  const [isSignedIn, setIsSignedIn] = useState(false);

  // const signIn = (event) => {
  //   event.preventDefault();
  //   setIsSignedIn(true);
  //   console.log("Sign in Value:");
  //   console.log(isSignedIn);
  // };
  // const signOut = () => {
  //   setIsSignedIn(false);
  // };

  const userID = "64120226601e330164d590af";

  useEffect(() => {
    async function fetchUserData() {
      // Get User and put in session storage
      const request = await instance.post("/api/users/get", { userID: userID });
      sessionStorage.setItem(userID, JSON.stringify(request.data));
      setIsFetched(true);
      return request;
    }
    fetchUserData();
  }, [userID]);

  return (
    <div>
      {isFetched && (
        <div>
          <Routes>
            <Route path="/" element={<Navigate to="/login" replace={true} />} />
            <Route
              path="/login"
              element={<LoginSheet loginInfo={{ setSignIn: setIsSignedIn }} />}
            />
            <Route element={<Protected protectedInfo={{isSignedIn}} />}>
              <Route element={<SelectionLayout />}>
                <Route
                  path="/characters"
                  element={<SelectionSheet userInfo={{ userID: userID }} />}
                />
              </Route>
            </Route>

            <Route
              element={
                <Protected protectedInfo={{isSignedIn}}>
                  <CharacterLayout />
                </Protected>
              }
            >
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
      )}
    </div>
  );
}

export default App;
