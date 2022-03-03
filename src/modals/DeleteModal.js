import React, { useContext } from "react";
import { AppContext } from "context/AppContext";
import { useNavigate } from "react-router-dom";
import Modal from "./Modal";
import { AiOutlineClose } from "react-icons/ai";
import requestApi from "apis/requestApi";
import entryApi from "apis/entryApi";
import partApi from "apis/partApi";
import tabApi from "apis/tabApi";
import vehicleApi from "apis/vehicleApi";

export const DELETE_ACTIONS = {
  DELETE_REQUEST: "DELETE_REQUEST",
  DELETE_ENTRY: "DELETE_ENTRY",
  DELETE_PART: "DELETE_PART",
  DELETE_TAB: "DELETE_TAB",
  DELETE_VEHICLE: "DELETE_VEHICLE",
};

function DeleteModal({
  closeModal,
  id,
  resourceToBeDeleted,
  modalActions,
  requestActions,
}) {
  const { setHasChanged } = useContext(AppContext);
  const navigate = useNavigate();

  let name;
  const verifyDeleting = () => {
    switch (resourceToBeDeleted) {
      case DELETE_ACTIONS.DELETE_REQUEST:
        return requestApi.deleteRequest(id).then((response) => {
          if (response.success === true) {
            requestActions.deleteRequest(id);
            name = "request";
            closeModal();
          } else {
            modalActions.openApiErrorModal(
              modalActions.closeModal,
              response.error
            );
          }
        });
      case DELETE_ACTIONS.DELETE_ENTRY:
        return entryApi.deleteEntry(id).then((response) => {
          if (response.success === true) {
            requestActions.deleteEntry(id);
            name = "entry";
            closeModal();
          } else {
            modalActions.openApiErrorModal(
              modalActions.closeModal,
              response.error
            );
          }
        });
      case DELETE_ACTIONS.DELETE_PART:
        return partApi.deletePart(id).then((response) => {
          if (response.success === true) {
            requestActions.deletePart(id);
            name = "part";
            closeModal();
          } else {
            modalActions.openApiErrorModal(
              modalActions.closeModal,
              response.error
            );
          }
        });

      case DELETE_ACTIONS.DELETE_TAB:
        return tabApi.deleteTab(id).then((response) => {
          if (response.success === true) {
            setHasChanged(true);
            navigate("/tabs");
          } else {
            modalActions.openApiErrorModal(
              modalActions.closeModal,
              response.error
            );
          }
        });

      case DELETE_ACTIONS.DELETE_VEHICLE:
        return vehicleApi.deleteVehicle(id).then((response) => {
          if (response.success === true) {
            setHasChanged(true);
            navigate("/vehicles");
          } else {
            modalActions.openApiErrorModal(
              modalActions.closeModal,
              response.error
            );
          }
        });
    }
  };

  return (
    <div>
      <Modal closeModal={closeModal}>
        <div>
          <AiOutlineClose
            style={{ color: "red" }}
            className="modal__cancel"
            onClick={closeModal}
          />
          <div>Are you sure you want to delete this {name}</div>
          <button onClick={verifyDeleting}>Confirm</button>
        </div>
      </Modal>
    </div>
  );
}
export default DeleteModal;
