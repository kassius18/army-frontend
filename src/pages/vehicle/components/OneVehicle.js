import { useCallback, useEffect, useState, useContext } from "react";
import vehicleApi from "apis/vehicleApi";
import { useLocation, useNavigate } from "react-router";
import VehicleModal from "modals/vehicle/VehicleModal";
import ApiErrorModal from "modals/ApiErrorModal";
import { AppContext } from "context/AppContext";

export default function OneVehicle() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { setHasChanged } = useContext(AppContext);
  const vehicle = state.vehicle;
  const [apiResponse, setApiResponse] = useState({ success: true });
  const [isOpen, setIsOpen] = useState(false);
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
  const initialValues = vehicle;

  const closeModal = () => {
    setIsOpen(false);
  };
  const openModal = () => {
    setIsOpen(true);
  };

  const openErrorModal = () => {
    setIsErrorModalOpen(true);
  };
  const closeErrorModal = () => {
    setIsErrorModalOpen(false);
  };

  const deleteVehicle = () => {
    setHasChanged(true);
    vehicleApi.deleteVehicle(vehicle.id).then((response) => {
      if (response.success === true) {
        navigate("/vehicles");
      } else {
        setApiResponse(response);
        openErrorModal();
      }
    });
  };

  const editVehicle = (newVehicle) => {
    setHasChanged(true);
    navigate(`/vehicles/${newVehicle.id}`, { state: { vehicle: newVehicle } });
  };

  return (
    <div className="vehicle">
      <div className="vehicle__body">
        <h1 className="vehicle__id"> Id : {vehicle.id}</h1>
        <h1 className="vehicle__plate"> Plate : {vehicle.plate}</h1>
        <h1 className="vehicle__type">Car : {vehicle.vehicleType}</h1>
      </div>
      <div className="vehicle__buttons">
        <button onClick={openModal}>Edit</button>
        <button onClick={deleteVehicle}>Delete</button>
      </div>
      <VehicleModal
        editVehicle={editVehicle}
        isOpen={isOpen}
        closeModal={closeModal}
        initialValues={initialValues}
      />
      <ApiErrorModal
        isModalOpen={isErrorModalOpen}
        closeModal={closeErrorModal}
        error={apiResponse.error}
      />
    </div>
  );
}
