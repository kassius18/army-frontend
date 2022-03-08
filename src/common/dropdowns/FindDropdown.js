import React from "react";
import { Link } from "react-router-dom";

function FindDropdown({ isOpen }) {
  const allActiveLinks = Array.from(
    document.querySelectorAll(".dropdown-list.sublist a")
  );
  const handleClick = (e) => {
    allActiveLinks.map((el) => {
      el.classList.remove("active");
    });
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
      <li>
        <Link
          to="/requests/"
          state={{ findBy: "vehicle" }}
          onClick={handleClick}
        >
          Με Όχημα
        </Link>
      </li>
    </ul>
  );
}

export default FindDropdown;
