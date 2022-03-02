import React, { useEffect, useRef } from "react";
import ReactDOM from "react-dom";

import "./modal.scss";

function Modal({ isOpen, closeModal, children }) {
  const portalDiv = document.getElementById("modal-root");
  const modalRef = useRef();

  const closeOnClickOutside = (e) => {
    console.log("clicked ");
    if (isOpen === true && !modalRef.current.contains(e.target)) {
      closeModal();
    }
  };

  const closeOnEscKeyDown = (e) => {
    console.log("button pressed");
    if (e.keyCode === 27) {
      closeModal();
    }
  };

  useEffect(() => {
    console.log("Mounted");
    window.addEventListener("keydown", closeOnEscKeyDown);
    window.addEventListener("click", closeOnClickOutside);
    return () => {
      console.log("unmounting");
      window.removeEventListener("keydown", closeOnEscKeyDown);
      window.removeEventListener("click", closeOnClickOutside);
    };
  }, []);

  if (!isOpen) {
    return null;
  }

  return ReactDOM.createPortal(
    <div
      className="modal"
      // onKeyDown={closeOnClickOutside}
      // onClick={closeOnEscKeyDown}
    >
      <div className="modal__content" ref={modalRef}>
        <div className="modal__close" onClick={closeModal}>
          Κλείσιμο
        </div>
        <div className="modal__body">{children}</div>
      </div>
    </div>,
    portalDiv
  );
}

export default Modal;
