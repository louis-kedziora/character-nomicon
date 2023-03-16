import React, { useState, useEffect } from "react";
import axios from "axios";
import { Routes, Route } from "react-router-dom";
import { Footer } from "components/partials";
import { SelectionSheet } from "components/SelectionSheet";

const serverURL = process.env.REACT_APP_SERVER_URL || "http://localhost:4000";
const instance = axios.create({
  baseURL: serverURL,
});

function App() {
  const [isFetched, setIsFetched] = useState(false);
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
            <Route
              path="/"
              element={<SelectionSheet userInfo={{ userID: userID }} />}
            />
          </Routes>
          <Footer />
        </div>
      )}
    </div>
  );
}

export default App;
