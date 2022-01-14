import { useLocation } from "react-router";

export default function OneVehicle() {
  const { state } = useLocation();
  const vehicle = state.vehicle;

  return (
    <div className="vehicle">
      <div className="vehicle__body">
        <h1 className="vehicle__plate"> Plate : {vehicle.plate}</h1>
        <h1 className="vehicle__type">Car : {vehicle.vehicleType}</h1>
      </div>
      <div className="vehicle__buttons">
        <button>Edit</button>
        <button>Delete</button>
      </div>
    </div>
  );
}
