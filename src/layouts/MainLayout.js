import "./mainLayout.scss";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";
import { AppContext } from "context/AppContext";
import React, { useContext, useEffect, useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";

function MainLayout() {
  const { isFailure, isLoading, setHasChanged } = useContext(AppContext);
  const [content, setContent] = useState(null);

  const override = "display: block; margin: 0 auto; border-color: red;";

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
          <ClipLoader
            color={"#ffffff"}
            loading={isLoading}
            css={override}
            size={150}
          />
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
      {content}
    </div>
  );
}
export default MainLayout;
