import React from "react";
import { useNavigate } from "react-router-dom";

function Tab({ tab, stripped }) {
  const navigate = useNavigate();

  const navigateToTab = () => {
    navigate(`/tabs/${tab.id}`, { state: tab });
  };

  return (
    <div
      onClick={navigateToTab}
      className={"tab__list" + (stripped ? " stripped" : "")}
    >
      <p>{tab.id}</p>
      <p>{tab.name}</p>
      <p>{tab.startingTotal}</p>
      <p>{tab.usage}</p>
      <p>{tab.observations}</p>
    </div>
  );
}

export default Tab;
