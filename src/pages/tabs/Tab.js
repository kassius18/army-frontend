import React from "react";
import { useNavigate } from "react-router-dom";
import "./tab.scss";

function Tab({ tab }) {
  const navigate = useNavigate();

  const navigateToTab = () => {
    navigate(`/tabs/${tab.id}`, { state: tab });
  };

  return (
    <li onClick={navigateToTab}>
      <p>{tab.name}</p>
    </li>
  );
}

export default Tab;
