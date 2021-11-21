import { NavLink } from "react-router-dom";

function Sidebar() {
  return (
    <div className="sidebar">
      <nav className="sidebar__navbar">
        <NavLink to="/protocol">Protocol</NavLink>
        <NavLink to="/sv">View Two</NavLink>
        <NavLink to="/tv">View Three</NavLink>
        <NavLink to="/fov">View Four</NavLink>
      </nav>
    </div>
  );
}

export default Sidebar;
