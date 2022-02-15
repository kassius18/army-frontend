import VehicleModal from "modals/vehicle/VehicleModal";
import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router";
import vehicleApi from "apis/vehicleApi";
import "./vehicle.scss";

export default function Vehicle() {
  const navigate = useNavigate();

  const [vehicles, setVehicles] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  const closeModal = () => {
    setIsOpen(false);
  };
  const openModal = () => {
    setIsOpen(true);
  };

  const addVehicle = (newVehicle) => {
    setVehicles([...vehicles, newVehicle]);
  };

  useEffect(() => {
    vehicleApi.getAllVehicles().then((response) => {
      if (response.success === true) {
        setVehicles(response.vehicles);
      } else setVehicles([]);
    });
  }, []);

  const navigateToVehicle = (vehicle) => {
    navigate(`/vehicles/${vehicle.id}`, { state: { vehicle: vehicle } });
  };

  return (
    <>
      <div className="vehicle__all">
        <div className="vehicle__list">
          <div className="vehicle__list-header">
            <div>Vehicle Id</div>
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
                <div className="vehicle__list-id">{vehicle.id}</div>
                <div className="vehicle__list-plate">{vehicle.plate}</div>
                <div className="vehicle__list-car">{vehicle.vehicleType}</div>
              </div>
            );
          })}
        </div>
        <button onClick={openModal}>Add Vehicle</button>
      </div>
      <VehicleModal
        addVehicle={addVehicle}
        isOpen={isOpen}
        closeModal={closeModal}
      />
    </>
  );
}
