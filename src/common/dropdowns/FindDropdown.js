import React from "react";
import { Link } from "react-router-dom";

function FindDropdown({ isOpen }) {
  const handleClick = (e) => {
    e.target.classList.toggle("active");
  };
  return (
    <ul className={"dropdown-list sublist" + (isOpen ? "" : " hidden")}>
      <li>
        <Link to="/requests/" state={{ findBy: "phi" }} onClick={handleClick}>
          Με Φ
        </Link>
      </li>
      <li>
        <Link to="/requests/" state={{ findBy: "date" }} onClick={handleClick}>
          Με Hμερομηνία
        </Link>
      </li>
      <li>
        <Link
          to="/requests/"
          state={{ findBy: "phi-year" }}
          onClick={handleClick}
        >
          Με Φ Και Έτος
        </Link>
      </li>
    </ul>
  );
}

export default FindDropdown;
