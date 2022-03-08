import { useEffect, useState, useReducer, useContext } from "react";
import { useNavigate } from "react-router";
import vehicleApi from "apis/vehicleApi";
import "./vehicle.scss";
import { AppContext } from "context/AppContext";
import ModalWrapper from "modals/ModalWrapper";
import { modalReducer, modalDispatchMap } from "reducers/modalReducer";

export default function Vehicle() {
  const navigate = useNavigate();
  const { setHasChanged } = useContext(AppContext);

  const [vehicles, setVehicles] = useState([]);

  const [modal, modalDispatch] = useReducer(modalReducer, "");
  const modalActions = modalDispatchMap(modalDispatch);

  const openModal = () => {
    modalActions.openVehicleModal(
      modalActions.closeModal,
      addVehicle,
      () => {}
    );
  };

  const addVehicle = (newVehicle) => {
    setHasChanged(true);
    setVehicles([...vehicles, newVehicle]);
  };

  useEffect(() => {
    let isMounted = true;
    const modalActions = modalDispatchMap(modalDispatch);
    modalActions.openLoadingModal();
    vehicleApi.getAllVehicles().then((response) => {
      if (response.success === true) {
        if (isMounted) {
          setVehicles(response.vehicles);
          modalActions.closeModal("portal");
        }
      } else {
        if (isMounted) {
          modalActions.openApiErrorModal(
            modalActions.closeModal,
            response.error
          );
          setVehicles([]);
        }
      }
    });
    return () => {
      isMounted = false;
    };
  }, []);

  const navigateToVehicle = (vehicle) => {
    navigate(`/vehicles/${vehicle.id}`, { state: { vehicle: vehicle } });
  };

  return (
    <>
      <div className="vehicle__all">
        <div className="vehicle__list">
          <div className="vehicle__list-header">
            <div>Αρ Οχήματος</div>
            <div>Πινακίδα Οχήματος</div>
            <div>Τυπος Οχήματος</div>
          </div>
          {vehicles.map((vehicle) => {
            return (
              <div
                className="vehicle__list-item"
                key={vehicle.id}
                onClick={() => {
                  navigateToVehicle(vehicle);
                }}
              >
                <div className="vehicle__list-id">{vehicle.id}</div>
                <div className="vehicle__list-plate">{vehicle.plate}</div>
                <div className="vehicle__list-car">{vehicle.vehicleType}</div>
              </div>
            );
          })}
        </div>
        <button onClick={openModal}>Προσθήκη Οχήματος</button>
      </div>
      <ModalWrapper modal={modal} modalActions={modalActions} />
    </>
  );
}
