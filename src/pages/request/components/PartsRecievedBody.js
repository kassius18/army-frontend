import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import OnePartRecieved from "./OnePartRecieved";

export default function PartsRecievedBody({
  parts,
  entry,
  requestActions,
  modalActions,
}) {
  const openModal = () => {
    modalActions.openPartModal(
      modalActions.closeModal,
      requestActions.addPart,
      requestActions.editPart,
      entry,
      requestActions.editEntry
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
            entry={entry}
            editEntry={requestActions.editEntry}
          />
        );
      })}
      <FontAwesomeIcon
        icon={faPlus}
        className="table__button addRow"
        onClick={openModal}
      />
    </>
  );
}
