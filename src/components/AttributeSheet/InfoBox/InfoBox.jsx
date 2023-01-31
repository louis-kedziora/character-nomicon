import React from "react";


export const InfoBox = (props) => {
  const {title, info} = props;

  return (
    <div className="attributeBox">
        <h1>{title}</h1>
        <p>{info}</p>
    </div>
  );
}

