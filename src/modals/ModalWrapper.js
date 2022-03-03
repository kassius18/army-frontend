import React from "react";
import RequestModal from "modals/RequestModal";
import EntryModal from "modals/EntryModal";
import PartRecievedModal from "modals/PartRecievedModal";
import VehicleModal from "modals/vehicle/VehicleModal";
import TabModal from "modals/TabModal";
import ApiErrorModal from "modals/ApiErrorModal";
import DeleteModal from "modals/DeleteModal";

export const MODALS = {
  REQUEST_MODAL: "REQUEST_MODAL",
  ENTRY_MODAL: "ENTRY_MODAL",
  PART_MODAL: "PART_MODAL",
  VEHICLE_MODAL: "VEHICLE_MODAL",
  TAB_MODAL: "TAB_MODAL",
  DELETE_MODAL: "DELETE_MODAL",
  ERROR_MODAL: "ERROR_MODAL",
};

function ModalWrapper({ modal }) {
  if (!modal.isOpen) {
    return null;
  }

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
    case MODALS.VEHICLE_MODAL:
      return (
        <VehicleModal
          editVehicle={modal.editVehicle}
          addVehicle={modal.addVehicle}
          isOpen={modal.isOpen}
          closeModal={modal.closeModal}
          initialValues={modal.initialValues}
        />
      );
    case MODALS.TAB_MODAL:
      return (
        <TabModal
          editTab={modal.editTab}
          addTab={modal.addTab}
          isOpen={modal.isOpen}
          closeModal={modal.closeModal}
          initialValues={modal.initialValues}
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
