import React from "react";

export const MultiInfoBox = ({ info }) => {
  const { title, content } = info;
  function autoGrow(element) {
    element.style.height = "5px";
    element.style.height = element.scrollHeight + "px";
  }
  return (
    <div className="noteBox">
      <h1>{title}</h1>
      <textarea onInput={autoGrow} id="notes" name="notes" rows={100}>
        {content}
      </textarea>
    </div>
  );
};
