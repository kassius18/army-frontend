import React, { useContext } from "react";
import Modal from "react-modal";

import ApiErrorModal from "./ApiErrorModal";
import EntryModal from "./EntryModal";
import PartsRecievedModal from "./PartsRecievedModal";

import { RequestContext } from "context/RequestContext";

import "./modal.scss";

Modal.setAppElement("#root");

function CustomModal({ addEntry, addPartRecieved, content, editEntry }) {
  const context = useContext(RequestContext);

  switch (content.modalName) {
    case "ApiErrorModal":
      return (
        <ApiErrorModal
          isModalOpen={context.isModalOpen}
          closeModal={context.closeModal}
          addEntry={addEntry}
          error={content.error}
        />
      );
    case "PartsRecievedModal":
      return (
        <PartsRecievedModal
          isModalOpen={context.isModalOpen}
          closeModal={context.closeModal}
          addPartRecieved={addPartRecieved}
          entryId={content.entryId}
          editPart={context.editPart}
          initialValues={content.initialPartValues}
        />
      );
    case "EntryModal":
      return (
        <EntryModal
          isModalOpen={context.isModalOpen}
          closeModal={context.closeModal}
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
