import Modal from "modals/Modal";
import { AiOutlineClose } from "react-icons/ai";
import vehicleApi from "apis/vehicleApi";
import { useState } from "react";

export default function VehicleModal({
  closeModal,
  addVehicle,
  editVehicle,
  initialValues = {},
}) {
  const [apiResponse, setApiResponse] = useState({ success: true });

  const createVehicle = (newVehicle) => {
    vehicleApi.createVehicle(newVehicle).then((response) => {
      if (response.success === true && Object.keys(response.vehicles) !== 0) {
        closeModal();
        addVehicle(...response.vehicles);
        if (apiResponse.success !== true) {
          setApiResponse(response);
        }
      } else {
        console.log("error happened setting api response");
        setApiResponse(response);
      }
    });
  };

  const updateVehicle = (newVehicle, vehicleId) => {
    vehicleApi.updateVehicle(newVehicle, vehicleId).then((response) => {
      if (response.success === true) {
        closeModal();
        editVehicle(newVehicle, vehicleId);
        if (apiResponse.success !== true) {
          setApiResponse(response);
        }
      } else {
        setApiResponse(response);
      }
    });
  };

  const closeModalAndResetContent = () => {
    closeModal();
    setApiResponse({ success: true });
  };

  const submitForm = (event) => {
    event.preventDefault();
    const newVehicle = {
      id: event.target.id.value,
      plate: event.target.plate.value,
      vehicleType: event.target.vehicleType.value,
    };
    if (Object.keys(initialValues).length === 0) {
      createVehicle(newVehicle);
    } else {
      updateVehicle(newVehicle, initialValues.id);
    }
  };

  return (
    <div>
      <Modal closeModal={closeModalAndResetContent}>
        {apiResponse.success ? (
          <form className="modal__inputs" onSubmit={submitForm}>
            <AiOutlineClose
              color="red"
              className="modal__cancel"
              onClick={closeModal}
            />
            <div className="modal__inputs-id">
              <label htmlFor="id">Id</label>
              <input
                name="id"
                type="number"
                defaultValue={
                  initialValues.id !== undefined ? initialValues.id : undefined
                }
              />
            </div>
            <div className="modal__inputs-plate">
              <label htmlFor="plate">Πινακίδα</label>
              <input
                name="plate"
                type="text"
                defaultValue={
                  initialValues.plate !== undefined
                    ? initialValues.plate
                    : undefined
                }
              />
            </div>
            <div className="modal__inputs-vehicleType">
              <label htmlFor="vehicleType">Είδoς Οχήματος</label>
              <input
                name="vehicleType"
                type="text"
                defaultValue={
                  initialValues.vehicleType !== undefined
                    ? initialValues.vehicleType
                    : undefined
                }
              />
            </div>
            <button type="submit" className="modal__button">
              {Object.keys(initialValues).length === 0 ? "Add" : "Edit"}
            </button>
          </form>
        ) : (
          <h1>{apiResponse.error.message}</h1>
        )}
      </Modal>
    </div>
  );
}
