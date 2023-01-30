import React from "react";


function InfoBox(props) {
  

  return (
    <div className="attributeBox">
        <h1>{props.title}</h1>
        <p>{props.info}</p>
    </div>
  );
}

export default InfoBox;
