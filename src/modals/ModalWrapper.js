import React from "react";
import RequestModal from "modals/RequestModal";
import EntryModal from "modals/EntryModal";
import PartRecievedModal from "modals/PartRecievedModal";
import VehicleModal from "modals/VehicleModal";
import TabModal from "modals/TabModal";
import ApiErrorModal from "modals/ApiErrorModal";
import DeleteModal from "modals/DeleteModal";
import LoadingModal from "modals/LoadingModal";

export const MODALS = {
  REQUEST_MODAL: "REQUEST_MODAL",
  ENTRY_MODAL: "ENTRY_MODAL",
  PART_MODAL: "PART_MODAL",
  VEHICLE_MODAL: "VEHICLE_MODAL",
  TAB_MODAL: "TAB_MODAL",
  DELETE_MODAL: "DELETE_MODAL",
  LOADING_MODAL: "LOADING_MODAL",
  ERROR_MODAL: "ERROR_MODAL",
};

function ModalWrapper({ modal, modalActions }) {
  const mainContent = document.querySelector("#portal");
  const height = mainContent.scrollTop;
  if (!modal.isOpen) {
    mainContent.style.overflowY = "scroll";
    return null;
  } else {
    mainContent.style.overflowY = "hidden";
  }

  switch (modal.modalContent) {
    case MODALS.REQUEST_MODAL:
      return (
        <RequestModal
          closeModal={modal.closeModal}
          editRequest={modal.editRequest}
          addRequest={modal.addRequest}
          initialValues={modal.initialValues}
          modalActions={modalActions}
        />
      );
    case MODALS.ENTRY_MODAL:
      return (
        <EntryModal
          closeModal={modal.closeModal}
          addEntry={modal.addEntry}
          editEntry={modal.editEntry}
          request={modal.request}
          initialValues={modal.initialValues}
          modalActions={modalActions}
        />
      );
    case MODALS.PART_MODAL:
      return (
        <PartRecievedModal
          closeModal={modal.closeModal}
          addPart={modal.addPart}
          editPart={modal.editPart}
          initialValues={modal.initialValues}
          entryId={modal.entryId}
          modalActions={modalActions}
        />
      );
    case MODALS.VEHICLE_MODAL:
      return (
        <VehicleModal
          editVehicle={modal.editVehicle}
          addVehicle={modal.addVehicle}
          closeModal={modal.closeModal}
          initialValues={modal.initialValues}
          modalActions={modalActions}
        />
      );
    case MODALS.TAB_MODAL:
      return (
        <TabModal
          editTab={modal.editTab}
          addTab={modal.addTab}
          closeModal={modal.closeModal}
          initialValues={modal.initialValues}
          modalActions={modalActions}
        />
      );
    case MODALS.DELETE_MODAL:
      return (
        <DeleteModal
          closeModal={modal.closeModal}
          resourceToBeDeleted={modal.resourceToBeDeleted}
          id={modal.id}
          modalActions={modalActions}
          requestActions={modal.requestActions}
        />
      );
    case MODALS.LOADING_MODAL:
      return <LoadingModal portalId={modal.portalId} height={height} />;
    case MODALS.ERROR_MODAL:
      return (
        <ApiErrorModal closeModal={modal.closeModal} error={modal.error} />
      );
    default:
      return null;
  }
}

export default ModalWrapper;
