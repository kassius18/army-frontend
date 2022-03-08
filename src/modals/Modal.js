import React, { useEffect, useRef } from "react";
import ReactDOM from "react-dom";

function Modal({ closeModal, children }) {
  const portalDiv = document.getElementById("modal-root");
  const modalRef = useRef();

  useEffect(() => {
    const closeOnClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        closeModal();
      }
    };

    const closeOnEscKeyDown = (e) => {
      if (e.keyCode === 27) {
        closeModal();
      }
    };

    window.addEventListener("keydown", closeOnEscKeyDown);
    window.addEventListener("click", closeOnClickOutside);
    return () => {
      window.removeEventListener("keydown", closeOnEscKeyDown);
      window.removeEventListener("click", closeOnClickOutside);
    };
  }, [closeModal]);

  return ReactDOM.createPortal(
    <div className="modal">
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
