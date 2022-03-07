import "./mainLayout.scss";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";
import { AppContext } from "context/AppContext";
import React, { useContext, useEffect, useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";

function MainLayout() {
  const { isFailure, isLoading, setHasChanged } = useContext(AppContext);
  const [content, setContent] = useState(null);

  useEffect(() => {
    if (isFailure) {
      setContent(
        <div className="error-screen">
          <div>Loading the data from the server failed</div>
          <button onClick={retryLoadingData}>Try Again</button>
        </div>
      );
    } else if (isLoading) {
      setContent(
        <div className="load-screen">
          <ClipLoader color={"#ffffff"} loading={true} size={50} />
        </div>
      );
    } else {
      setContent(<Outlet />);
    }
  }, [isLoading, isFailure]);

  const retryLoadingData = () => {
    setHasChanged(true);
  };

  return (
    <div className="main-layout">
      <Sidebar />
      <div className="main-content content-wrapper" id="portal">
        {content}
      </div>
    </div>
  );
}
export default MainLayout;
