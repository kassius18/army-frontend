import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router";
import VehicleModal from "modals/vehicle/VehicleModal";

export default function OneVehicle() {
  const { state } = useLocation();
  const vehicle = state.vehicle;
  const [initialValues, setInitialValues] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const url = `http://army-backend.com/vehicles/${vehicle.id}`;

  const closeModal = () => {
    setIsModalOpen(false);
  };
  const openModal = () => {
    setInitialValues(vehicle);
    setIsModalOpen(true);
  };

  const deleteVehicle = () => {
    axios
      .delete(url)
      .then((response) => {
        console.log("deleted");
        //open the modal here that says deletion sucessful or smth
      })
      .catch((message) => {
        console.log("failed to delete ");
      });
  };

  const editVehicle = (newVehicle) => {
    axios
      .put(url, newVehicle)
      .then((response) => {
        console.log("changed vehicle");
      })
      .catch((message) => {
        console.log("couldnt add vehicle");
      });
  };

  console.log(axios["get"]);

  const makeApiCall = useCallback((url, method) => {}, []);

  // useEffect(effect);

  return (
    <div className="vehicle">
      <div className="vehicle__body">
        <h1 className="vehicle__plate"> Plate : {vehicle.plate}</h1>
        <h1 className="vehicle__type">Car : {vehicle.vehicleType}</h1>
      </div>
      <div className="vehicle__buttons">
        <button onClick={openModal}>Edit</button>
        <button onClick={deleteVehicle}>Delete</button>
      </div>
      <VehicleModal
        isModalOpen={isModalOpen}
        closeModal={closeModal}
        editVehicle={editVehicle}
        initialValues={initialValues}
      />
    </div>
  );
}
