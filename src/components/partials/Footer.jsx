import React from "react";

export const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <footer>
      <p>Player Sheet ® {year}</p>
    </footer>
  );
}
