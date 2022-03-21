import { useEffect, useState, useReducer, useContext } from "react";
import { useNavigate } from "react-router";
import vehicleApi from "apis/vehicleApi";
import { AppContext } from "context/AppContext";
import ModalWrapper from "modals/ModalWrapper";
import { modalReducer, modalDispatchMap } from "reducers/modalReducer";

function ListVehicles() {
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
      if (isMounted) {
        if (response.success === true) {
          setVehicles(response.vehicles);
          modalActions.closeModal("portal");
        } else {
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
      <div className="vehicle__view">
        <div className="vehicle__list header">
          <div>Αρ Οχήματος</div>
          <div>Πινακίδα Οχήματος</div>
          <div>Τυπος Οχήματος</div>
        </div>
        <div className="vehicle__body">
          {vehicles.map((vehicle, index) => {
            const stripped = index % 2 === 0 ? true : false;
            return (
              <div
                className={"vehicle__list" + (stripped ? " stripped" : "")}
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
export default ListVehicles;
