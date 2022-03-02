import React from "react";
import RequestModal from "modals/RequestModal";
import ApiErrorModal from "modals/ApiErrorModal";
import DeleteModal from "modals/DeleteModal";
import EntryModal from "modals/EntryModal";
import PartRecievedModal from "modals/PartRecievedModal";

export const MODALS = {
  REQUEST_MODAL: "REQUEST_MODAL",
  ENTRY_MODAL: "ENTRY_MODAL",
  PART_MODAL: "PART_MODAL",
  DELETE_MODAL: "DELETE_MODAL",
  ERROR_MODAL: "ERROR_MODAL",
};

function ModalWrapper({ modal }) {
  if (!modal.isOpen) {
    return null;
  }
  console.log("modal is", modal.modalContent);

  switch (modal.modalContent) {
    case MODALS.REQUEST_MODAL:
      return (
        <RequestModal
          isOpen={modal.isOpen}
          closeModal={modal.closeModal}
          editRequest={modal.editRequest}
          addRequest={modal.addRequest}
          initialValues={modal.initialValues}
        />
      );
    case MODALS.ENTRY_MODAL:
      return (
        <EntryModal
          isOpen={modal.isOpen}
          closeModal={modal.closeModal}
          addEntry={modal.addEntry}
          editEntry={modal.editEntry}
          request={modal.request}
          initialValues={modal.initialValues}
        />
      );
    case MODALS.PART_MODAL:
      return (
        <PartRecievedModal
          isOpen={modal.isOpen}
          closeModal={modal.closeModal}
          addPart={modal.addPart}
          editPart={modal.editPart}
          initialValues={modal.initialValues}
          entryId={modal.entryId}
        />
      );
    case MODALS.DELETE_MODAL:
      return (
        <DeleteModal
          isOpen={modal.isOpen}
          closeModal={modal.closeModal}
          deleteFcn={modal.deleteFcn}
          name={modal.name}
        />
      );

    case MODALS.ERROR_MODAL:
      return (
        <ApiErrorModal
          isOpen={modal.isOpen}
          closeModal={modal.closeModal}
          error={modal.error}
        />
      );
    default:
      return null;
  }
}

export default ModalWrapper;
