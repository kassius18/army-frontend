import React from "react";
import Modal from "react-modal";

import ApiErrorModal from "./ApiErrorModal";
import EntryModal from "./EntryModal";
import PartsRecievedModal from "./PartsRecievedModal";

import "./modal.scss";

Modal.setAppElement("#root");

function CustomModal({
  isModalOpen,
  closeModal,
  addEntry,
  addPartRecieved,
  content,
  editEntry,
}) {
  switch (content.modalName) {
    case "ApiErrorModal":
      return (
        <ApiErrorModal
          isModalOpen={isModalOpen}
          closeModal={closeModal}
          addEntry={addEntry}
          error={content.error}
        />
      );
    case "PartsRecievedModal":
      return (
        <PartsRecievedModal
          isModalOpen={isModalOpen}
          closeModal={closeModal}
          addPartRecieved={addPartRecieved}
          entryId={content.entryId}
        />
      );
    case "EntryModal":
      return (
        <EntryModal
          isModalOpen={isModalOpen}
          closeModal={closeModal}
          addEntry={addEntry}
          editEntry={editEntry}
          initialValues={content.initialValues}
        />
      );
    default:
      return null;
  }
}

export default CustomModal;
