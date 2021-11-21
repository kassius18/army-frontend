import "./mainLayout.scss";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";

function MainLayout() {
  return (
    <div className="main-layout">
      <Sidebar />
      <Outlet />
    </div>
  );
}
export default MainLayout;
