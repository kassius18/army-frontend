import { AiOutlineClose } from "react-icons/ai";
import Modal from "react-modal";

Modal.setAppElement("#root");

export default function VehicleModal({
  isModalOpen,
  closeModal,
  addVehicle,
  editVehicle,
  initialValues = {},
}) {
  const submitForm = (event) => {
    event.preventDefault();
    closeModal();
    const newVehicle = {
      plate: event.target.plate.value,
      vehicleType: event.target.vehicleType.value,
    };
    if (Object.keys(initialValues).length === 0) {
      addVehicle(newVehicle);
    } else {
      editVehicle(newVehicle);
    }
  };

  return (
    <div>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        // style={customStyles}
        contentLabel="Parts recieved modal"
      >
        <div
          className={
            "modal " + (isModalOpen ? "modal-active" : "modal-inactive")
          }
        >
          <form className="modal__inputs" onSubmit={submitForm}>
            <AiOutlineClose
              color="red"
              className="modal__cancel"
              onClick={closeModal}
            />
            <div className="modal__inputs-plate">
              <label htmlFor="plate">Plate</label>
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
              <label htmlFor="vehicleType">Vehicle Type</label>
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
        </div>
      </Modal>
    </div>
  );
}
