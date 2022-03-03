import React from "react";
import { IoMdAdd } from "react-icons/io";
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

  return (
    <>
      {parts.map((part) => {
        return (
          <OnePartRecieved
            part={part}
            key={part.id}
            modalActions={modalActions}
            requestActions={requestActions}
          />
        );
      })}
      <IoMdAdd className="table__button addRow" onClick={openModal} />
    </>
  );
}
