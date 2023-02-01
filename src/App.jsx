import React from "react";
// import { AttributeSheet } from "./components/AttributeSheet";
import { getCharacter } from "./components/DBHandler";

function App() {
  console.log("******** Before Get ********");
  // const gaston = getCharacter("Gaston");
  console.log("******** After Get ********");
  // console.log(gaston);
  
  return (
    <div>
    <h1>Hello</h1>
      {/* <AttributeSheet gaston={gaston}/> */}
    </div>
  );
}

export default App;
