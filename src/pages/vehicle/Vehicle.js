import VehicleModal from "modals/vehicle/VehicleModal";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
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

  const url = "http://army-backend.com/vehicles";

  const addVehicle = (newVehicle) => {
    axios
      .post(url, newVehicle)
      .then((response) => {
        console.log("added vehicle");
      })
      .catch((message) => {
        console.log("couldnt add vehicle");
      });
  };

  const [vehicles, setVehicles] = useState([]);

  useEffect(() => {
    axios
      .get(url)
      .then((response) => {
        console.log(response.data);
        setVehicles(response.data);
      })
      .catch((message) => {
        console.log(message);
      });
  }, []);

  const navigateToVehicle = (vehicle) => {
    navigate(`/vehicles/${vehicle.id}`, { state: { vehicle: vehicle } });
  };

  const modalContent = {
    modalName: "AddEditVehicleModal",
    addVehicle: addVehicle,
  };

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
        content={modalContent}
      />
    </>
  );
}
