import React from "react";
import FindDropdown from "./FindDropdown";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCaretDown,
  faFolderPlus,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";

function RequestDropdown({ isOpen, isFindOpen, toggleFindMenu }) {
  return (
    <ul className={"dropdown-list" + (isOpen ? "" : " hidden")}>
      <li>
        <a className="dropdown-button" onClick={toggleFindMenu}>
          <div className="left">
            <FontAwesomeIcon icon={faMagnifyingGlass} />
            <span>Αναζήτηση</span>
          </div>
          <FontAwesomeIcon icon={faCaretDown} />
        </a>
        <FindDropdown isOpen={isFindOpen} />
      </li>
      <li>
        <NavLink to="/requests/new">
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