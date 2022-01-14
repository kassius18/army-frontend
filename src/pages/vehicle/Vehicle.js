import VehicleModal from "modals/VehicleModal";
import { useState } from "react";
import { useNavigate } from "react-router";
import OneVehicle from "./components/OneVehicle";
import "./vehicle.scss";

export default function Vehicle() {
  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const closeModal = () => {
    setIsModalOpen(false);
  };
  const openModal = () => {
    setIsModalOpen(true);
  };

  const addVehicle = () => {
    openModal();
  };
  const editVehicle = () => {
    openModal();
  };

  const initialValues = {};

  const navigateToVehicle = (vehicle) => {
    navigate(`/vehicles/${vehicle.id}`, { state: { vehicle: vehicle } });
  };

  const [vehicles, setVehicles] = useState([
    { id: 1, plate: 2323, vehicleType: "Toyota" },
    { id: 2, plate: 1111, vehicleType: "beczzzz" },
    { id: 3, plate: 1111, vehicleType: "beczzzz" },
    { id: 4, plate: 1111, vehicleType: "beczzzz" },
    { id: 5, plate: 1111, vehicleType: "beczzzz" },
    { id: 6, plate: 1111, vehicleType: "beczzzz" },
    { id: 7, plate: 1111, vehicleType: "beczzzz" },
    { id: 8, plate: 1111, vehicleType: "beczzzz" },
    { id: 9, plate: 1111, vehicleType: "beczzzz" },
    { id: 10, plate: 1111, vehicleType: "beczzzz" },
    { id: 11, plate: 1111, vehicleType: "beczzzz" },
    { id: 12, plate: 1111, vehicleType: "beczzzz" },
    { id: 13, plate: 1111, vehicleType: "beczzzz" },
    { id: 14, plate: 1111, vehicleType: "beczzzz" },
    { id: 15, plate: 1111, vehicleType: "beczzzz" },
    { id: 16, plate: 1111, vehicleType: "beczzzz" },
    { id: 17, plate: 1111, vehicleType: "beczzzz" },
    { id: 18, plate: 1111, vehicleType: "beczzzz" },
    { id: 19, plate: 1111, vehicleType: "beczzzz" },
    { id: 20, plate: 1111, vehicleType: "beczzzz" },
    { id: 21, plate: 1111, vehicleType: "beczzzz" },
    { id: 22, plate: 1111, vehicleType: "beczzzz" },
    { id: 23, plate: 1111, vehicleType: "beczzzz" },
    { id: 24, plate: 1111, vehicleType: "beczzzz" },
    { id: 25, plate: 1111, vehicleType: "beczzzz" },
    { id: 26, plate: 1111, vehicleType: "beczzzz" },
    { id: 27, plate: 1111, vehicleType: "beczzzz" },
    { id: 28, plate: 1111, vehicleType: "beczzzz" },
    { id: 29, plate: 1111, vehicleType: "beczzzz" },
    { id: 30, plate: 1111, vehicleType: "beczzzz" },
    { id: 31, plate: 1111, vehicleType: "beczzzz" },
    { id: 32, plate: 1111, vehicleType: "beczzzz" },
    { id: 33, plate: 1111, vehicleType: "beczzzz" },
    { id: 34, plate: 1111, vehicleType: "beczzzz" },
  ]);

  return (
    <>
      <div className="vehicle__all">
        <div className="vehicle__list">
          <div className="vehicle__list-header">
            <div>Vehicle Plate</div>
            <div>Vehicle Type</div>
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
                <div className="vehicle__list-plate">{vehicle.plate}</div>
                <div className="vehicle__list-car">{vehicle.vehicleType}</div>
              </div>
            );
          })}
        </div>
        <button onClick={openModal}>Add Vehicle</button>
      </div>
      <VehicleModal
        isModalOpen={isModalOpen}
        closeModal={closeModal}
        addVehicle={addVehicle}
        editVehicle={editVehicle}
        initialValues={initialValues}
      />
    </>
  );
}
