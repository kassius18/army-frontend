import React, { useEffect, useState, useReducer } from "react";
import { useNavigate } from "react-router";
import ModalWrapper from "modals/ModalWrapper";
import { modalReducer, modalDispatchMap } from "reducers/modalReducer";

function NewRequest() {
  const [modal, modalDispatch] = useReducer(modalReducer, "");
  const [request, setRequest] = useState({});
  const navigate = useNavigate();

  const modalActions = modalDispatchMap(modalDispatch);

  useEffect(() => {
    if (request.firstPartOfPhi && request.year) {
      navigate("/requests/" + request.firstPartOfPhi + "/" + request.year, {
        state: [request],
      });
    }
  }, [request, navigate]);

  const openModal = () => {
    modalActions.openRequestModal(
      () => {},
      addRequest,
      modalActions.closeModal
    );
  };

  const addRequest = (newRequest) => {
    setRequest(newRequest);
  };

  return (
    <>
      <div>
        <button onClick={openModal}>Δημιουργία Νεας Αίτησης</button>
      </div>
      <ModalWrapper modal={modal} modalActions={modalActions} />
    </>
  );
}

export default NewRequest;
