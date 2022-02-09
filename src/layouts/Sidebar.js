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
          <a onClick={toggleRequestMenu}>Requests</a>
          <Dropdown isOpen={isRequestOpen}>
            <a onClick={toggleFindMenu}>Find</a>
            <Dropdown isOpen={isFindOpen}>
              <NavLink to="/requests/" state={{ findBy: "phi" }}>
                By Phi
              </NavLink>
              <NavLink to="/requests/" state={{ findBy: "date" }}>
                By Date
              </NavLink>
              <NavLink to="/requests/" state={{ findBy: "phi-year" }}>
                By Phi And Year
              </NavLink>
            </Dropdown>
            <NavLink to="/requests/new">Create</NavLink>
          </Dropdown>
        </div>
        <NavLink to="/tabs">Καρτελες</NavLink>
        <NavLink to="/tv">View Three</NavLink>
        <NavLink to="/fov">View Four</NavLink>
      </nav>
    </div>
  );
}

export default Sidebar;
