import React, { useEffect, useRef } from "react";
import ReactDOM from "react-dom";

import "./modal.scss";

function Modal({ isOpen, closeModal, children }) {
  const portalDiv = document.getElementById("modal-root");
  const modalRef = useRef();

  const closeOnEscKeyOrClickOutside = (e) => {
    if (e.keyCode === 27) {
      closeModal();
    } else if (isOpen === true && !modalRef.current.contains(e.target)) {
      closeModal();
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", closeOnEscKeyOrClickOutside);
    return () =>
      window.removeEventListener("keydown", closeOnEscKeyOrClickOutside);
  }, []);

  if (!isOpen) {
    return null;
  }

  return ReactDOM.createPortal(
    <div className="modal" onClick={closeOnEscKeyOrClickOutside}>
      <div className="modal__content" ref={modalRef}>
        <div className="modal__close" onClick={closeModal}>
          Close Modal
        </div>
        <div className="modal__body">{children}</div>
      </div>
    </div>,
    portalDiv
  );
}

export default Modal;
