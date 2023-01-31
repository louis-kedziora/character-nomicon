import React from "react";
import { AttributeSheet } from "./components/AttributeSheet";
import Gaston from "./testCharacter"

function App() {
  return (
    <div>
      <AttributeSheet gaston={Gaston}/>
    </div>
  );
}

export default App;
