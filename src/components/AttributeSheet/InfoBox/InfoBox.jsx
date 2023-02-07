import React from "react";

export const InfoBox = ({ info }) => {
  const { title, content } = info;

  return (
    <div className="attributeBox">
      <h1>{title}</h1>
      <p>{content}</p>
    </div>
  );
};
