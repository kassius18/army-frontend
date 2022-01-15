import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router";
import VehicleModal from "modals/vehicle/VehicleModal";

export default function OneVehicle() {
  const { state } = useLocation();
  const vehicle = state.vehicle;
  const [modalContent, setModalContent] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const url = `http://army-backend.com/vehicles/${vehicle.id}`;
  const initialValues = vehicle;

  const closeModal = () => {
    setIsModalOpen(false);
  };
  const openModal = () => {
    setIsModalOpen(true);
  };

  const openEditModal = () => {
    setModalContent({
      modalName: "AddEditVehicleModal",
      initialValues: initialValues,
      editVehicle: editVehicle,
    });
    setIsModalOpen(true);
    openModal();
  };

  const deleteVehicle = () => {
    axios
      .delete(url)
      .then(() => {
        setModalContent({
          modalName: "ApiSuccesModal",
          message: "Deleted sucessfuly",
        });
        openModal();
      })
      .catch(() => {
        setModalContent({
          modalName: "ApiErrorModal",
          message: "Couldn't delete",
        });
        openModal();
      });
  };

  const editVehicle = (newVehicle) => {
    axios
      .put(url, newVehicle)
      .then(() => {
        setModalContent({
          modalName: "ApiSuccesModal",
          message: "Edited sucessfuly",
        });
        openModal();
      })
      .catch(() => {
        setModalContent({
          modalName: "ApiErrorModal",
          message: "Couldn't edit",
        });
        openModal();
      });
  };

  return (
    <div className="vehicle">
      <div className="vehicle__body">
        <h1 className="vehicle__plate"> Plate : {vehicle.plate}</h1>
        <h1 className="vehicle__type">Car : {vehicle.vehicleType}</h1>
      </div>
      <div className="vehicle__buttons">
        <button onClick={openEditModal}>Edit</button>
        <button onClick={deleteVehicle}>Delete</button>
      </div>
      <VehicleModal
        isModalOpen={isModalOpen}
        closeModal={closeModal}
        content={modalContent}
        initialValues={initialValues}
      />
    </div>
  );
}
