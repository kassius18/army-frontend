import React from "react";
import { IoMdAdd } from "react-icons/io";
import partApi from "apis/partApi";
import OnePartRecieved from "./OnePartRecieved";

export default function PartsRecievedBody({
  parts,
  entryId,
  requestActions,
  modalActions,
}) {
  const openModal = () => {
    modalActions.openPartModal(
      modalActions.closeModal,
      requestActions.addPart,
      requestActions.editPart,
      entryId
    );
  };

  const deletePart = (partId) => {
    partApi.deletePart(partId).then((response) => {
      if (response.success === true) {
        requestActions.deletePart(partId);
      } else {
        modalActions.openApiErrorModal(modalActions.closeModal, response.error);
      }
    });
  };

  return (
    <>
      {parts.map((part) => {
        return (
          <OnePartRecieved
            part={part}
            key={part.id}
            deletePart={deletePart}
            modalActions={modalActions}
            requestActions={requestActions}
          />
        );
      })}
      <IoMdAdd className="table__button addRow" onClick={openModal} />
    </>
  );
}
