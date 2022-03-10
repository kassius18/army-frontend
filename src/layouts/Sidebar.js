import { useState } from "react";
import { NavLink } from "react-router-dom";
import logo from "resources/images/96tmxeth.png";
import RequestDropdown from "common/dropdowns/RequestDropdown";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFileInvoice,
  faCaretDown,
  faClipboardList,
  faCar,
} from "@fortawesome/free-solid-svg-icons";

function Sidebar() {
  const [isRequestOpen, setIsRequestOpen] = useState(false);
  const [isFindOpen, setIsFindOpen] = useState(false);

  const allActiveLinks = Array.from(
    document.querySelectorAll(".dropdown-list.sublist a")
  );
  const handleClick = () => {
    allActiveLinks.map((el) => {
      el.classList.remove("active");
      return el;
    });
  };

  const toggleRequestMenu = () => {
    setIsRequestOpen((oldValue) => {
      return !oldValue;
    });
    setIsFindOpen(false);
  };

  const toggleFindMenu = () => {
    setIsFindOpen((oldValue) => {
      return !oldValue;
    });
  };

  return (
    <div className="sidebar">
      <div className="sidebar__icon">
        <img src={logo} alt="" />
      </div>
      <div className="sidebar__title">96 ΤΜΧΕΘ</div>
      <nav className="sidebar__navbar">
        <div className="sidebar__request">
          <button onClick={toggleRequestMenu} className="dropdown-button link">
            <div className="left">
              <FontAwesomeIcon icon={faFileInvoice} />
              <span>Αiτήσεις</span>
            </div>
            <FontAwesomeIcon icon={faCaretDown} />
          </button>
          <RequestDropdown
            isFindOpen={isFindOpen}
            isOpen={isRequestOpen}
            toggleFindMenu={toggleFindMenu}
          />
        </div>
        <NavLink onClick={handleClick} to="/tabs" className="link">
          <div className="left">
            <FontAwesomeIcon icon={faClipboardList} />
            <span>Καρτελες</span>
          </div>
        </NavLink>
        <NavLink onClick={handleClick} to="/vehicles" className="link">
          <div className="left">
            <FontAwesomeIcon icon={faCar} />
            <span>Οχήματα</span>
          </div>
        </NavLink>
      </nav>
    </div>
  );
}

export default Sidebar;
