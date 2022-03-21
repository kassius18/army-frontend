import Modal from "modals/Modal";
import vehicleApi from "apis/vehicleApi";

function VehicleModal({
  closeModal,
  addVehicle,
  editVehicle,
  initialValues = {},
  modalActions,
}) {
  const createVehicle = (newVehicle) => {
    modalActions.openLoadingModal();
    vehicleApi.createVehicle(newVehicle).then((response) => {
      if (response.success === true && Object.keys(response.vehicles) !== 0) {
        closeModal();
        addVehicle(...response.vehicles);
      } else {
        modalActions.openApiErrorModal(modalActions.closeModal, response.error);
      }
    });
  };

  const updateVehicle = (newVehicle, vehicleId) => {
    modalActions.openLoadingModal();
    vehicleApi.updateVehicle(newVehicle, vehicleId).then((response) => {
      if (response.success === true) {
        closeModal();
        editVehicle(newVehicle, vehicleId);
      } else {
        modalActions.openApiErrorModal(modalActions.closeModal, response.error);
      }
    });
  };

  const closeModalAndResetContent = () => {
    closeModal();
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
        <form className="modal__inputs" onSubmit={submitForm}>
          <div className="modal__input">
            <label htmlFor="id">Id</label>
            <input
              name="id"
              type="number"
              defaultValue={
                initialValues.id !== undefined ? initialValues.id : undefined
              }
            />
          </div>
          <div className="modal__input">
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
          <div className="modal__input">
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
      </Modal>
    </div>
  );
}
export default VehicleModal;
