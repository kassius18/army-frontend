import React from "react";
import uuid from "react-uuid";

function Dropdown({ children, isOpen }) {
  if (!isOpen) {
    return null;
  }

  return (
    <ul>
      {children.map((child) => {
        return <li key={uuid()}>{child}</li>;
      })}
    </ul>
  );
}

export default Dropdown;
