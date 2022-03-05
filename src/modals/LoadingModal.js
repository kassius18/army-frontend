import React from "react";
import ReactDOM from "react-dom";
import ClipLoader from "react-spinners/ClipLoader";

function LoadingModal({ portalId }) {
  const portalDiv = document.getElementById(
    portalId === "" ? "portal" : portalId
  );

  return ReactDOM.createPortal(
    <div className="modal">
      <div className="modal__content loading">
        <ClipLoader color={"#ffffff"} loading={true} size={50} />
      </div>
    </div>,
    portalDiv
  );
}

export default LoadingModal;
