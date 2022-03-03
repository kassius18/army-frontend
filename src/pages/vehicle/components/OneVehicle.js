import { useContext, useReducer } from "react";
import vehicleApi from "apis/vehicleApi";
import { useLocation, useNavigate } from "react-router";
import { AppContext } from "context/AppContext";
import ModalWrapper from "modals/ModalWrapper";
import { modalReducer, modalDispatchMap } from "reducers/modalReducer";

export default function OneVehicle() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { setHasChanged } = useContext(AppContext);
  const vehicle = state.vehicle;

  const [modal, modalDispatch] = useReducer(modalReducer, "");
  const modalActions = modalDispatchMap(modalDispatch);

  const openDeleteModal = () => {
    modalActions.openDeleteModal(
      modalActions.closeModal,
      deleteVehicle,
      "vehicle"
    );
  };

  const openModal = () => {
    modalActions.openVehicleModal(
      modalActions.closeModal,
      () => {},
      editVehicle,
      vehicle
    );
  };

  const deleteVehicle = () => {
    setHasChanged(true);
    vehicleApi.deleteVehicle(vehicle.id).then((response) => {
      if (response.success === true) {
        navigate("/vehicles");
      } else {
        modalActions.openApiErrorModal(modalActions.closeModal, response.error);
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
        <button onClick={openDeleteModal}>Delete</button>
      </div>
      <ModalWrapper modal={modal} />
    </div>
  );
}
