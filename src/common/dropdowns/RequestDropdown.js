import React from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFolderPlus } from "@fortawesome/free-solid-svg-icons";

function RequestDropdown({ isOpen }) {
  return (
    <ul className={"dropdown-list" + (isOpen ? "" : " hidden")}>
      <li>
        <NavLink to="/requests/" className="link">
          <div className="left">
            <FontAwesomeIcon icon={faFolderPlus} />
            <span>Αναζήτηση</span>
          </div>
        </NavLink>
      </li>
      <li>
        <NavLink to="/requests/new" className="link">
          <div className="left">
            <FontAwesomeIcon icon={faFolderPlus} />
            <span>Καινούργια</span>
          </div>
        </NavLink>
      </li>
    </ul>
  );
}

export default RequestDropdown;
