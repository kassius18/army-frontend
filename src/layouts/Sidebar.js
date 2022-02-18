import { useState } from "react";
import { NavLink } from "react-router-dom";
import Dropdown from "common/dropdowns/Dropdown";

function Sidebar() {
  const [isRequestOpen, setIsRequestOpen] = useState(false);
  const [isFindOpen, setIsFindOpen] = useState(false);
  const toggleRequestMenu = () => {
    setIsRequestOpen((oldValue) => {
      return !oldValue;
    });
  };
  const toggleFindMenu = () => {
    setIsFindOpen((oldValue) => {
      return !oldValue;
    });
  };
  return (
    <div className="sidebar">
      <nav className="sidebar__navbar">
        <div className="sidebar__request">
          <a onClick={toggleRequestMenu}>Eτήσεις</a>
          <Dropdown isOpen={isRequestOpen}>
            <a onClick={toggleFindMenu}>Ευρεση</a>
            <Dropdown isOpen={isFindOpen}>
              <NavLink to="/requests/" state={{ findBy: "phi" }}>
                Με Φ
              </NavLink>
              <NavLink to="/requests/" state={{ findBy: "date" }}>
                Με Hμερομηνία
              </NavLink>
              <NavLink to="/requests/" state={{ findBy: "phi-year" }}>
                Με Φ Και Έτος
              </NavLink>
            </Dropdown>
            <NavLink to="/requests/new">Καινούργια</NavLink>
          </Dropdown>
        </div>
        <NavLink to="/tabs">Καρτελες</NavLink>
        <NavLink to="/vehicles">Οχήματα</NavLink>
      </nav>
    </div>
  );
}

export default Sidebar;
