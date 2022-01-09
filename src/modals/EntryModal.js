import Modal from "react-modal";
import { AiOutlineClose } from "react-icons/ai";
import uuid from "react-uuid";

function EntryModal({
  isModalOpen,
  closeModal,
  addEntry,
  editEntry,
  initialValues = {},
}) {
  const submitForm = (event) => {
    event.preventDefault();
    closeModal();
    const newEntry = {
      id: uuid(),
      nameNumber: event.target.nameNumber.value,
      name: event.target.name.value,
      mainPart: event.target.mainPart.value,
      amountOfOrder: parseInt(event.target.amountOfOrder.value),
      unitOfOrder: event.target.unitOfOrder.value,
      reasonOfOrder: parseInt(event.target.reasonOfOrder.value),
      priorityOfOrder: parseInt(event.target.priorityOfOrder.value),
      observations: event.target.observations.value,
    };
    if (Object.keys(initialValues).length === 0) {
      addEntry(newEntry);
    } else {
      editEntry(initialValues.id, newEntry);
    }
  };

  return (
    <div>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        // style={customStyles}
        contentLabel="Entry Modal"
      >
        <div
          className={
            "modal " + (isModalOpen ? "modal-active" : "modal-inactive")
          }
        >
          <form className="modal__inputs" onSubmit={submitForm}>
            <AiOutlineClose className="modal__cancel" onClick={closeModal} />
            <div className="modal__inputs-nameNumber">
              <label htmlFor="nameNumber">Name Number</label>
              <input
                name="nameNumber"
                type="text"
                defaultValue={
                  initialValues.nameNumber !== undefined
                    ? initialValues.nameNumber
                    : undefined
                }
              />
            </div>
            <div className="modal__inputs-name">
              <label htmlFor="name">Name</label>
              <input
                name="name"
                type="text"
                defaultValue={
                  initialValues.name !== undefined
                    ? initialValues.name
                    : undefined
                }
              />
            </div>
            <div className="modal__inputs-mainPart">
              <label htmlFor="mainPart">Main Material</label>
              <input
                name="mainPart"
                type="text"
                defaultValue={
                  initialValues.mainPart !== undefined
                    ? initialValues.mainPart
                    : undefined
                }
              />
            </div>
            <div className="modal__inputs-amountOfOrder">
              <label htmlFor="amountOfOrder">Amount Of Order</label>
              <input
                name="amountOfOrder"
                type="text"
                defaultValue={
                  initialValues.amountOfOrder !== undefined
                    ? initialValues.amountOfOrder
                    : undefined
                }
              />
            </div>
            <div className="modal__inputs-unitOfOrder">
              <label htmlFor="modal__inputs-unitOfOrder">Units Of Order</label>
              <input
                name="unitOfOrder"
                type="text"
                defaultValue={
                  initialValues.unitOfOrder !== undefined
                    ? initialValues.unitOfOrder
                    : undefined
                }
              />
            </div>
            <div className="modal__inputs-reasonOfOrder">
              <label htmlFor="modal__inputs-reasonOfOrder">
                Reason Of Order
              </label>
              <input
                name="reasonOfOrder"
                type="text"
                defaultValue={
                  initialValues.reasonOfOrder !== undefined
                    ? initialValues.reasonOfOrder
                    : undefined
                }
              />
            </div>
            <div className="modal__inputs-priorityOfOrder">
              <label htmlFor="modal__inputs-priorityOfOrder">
                Priority Of Order
              </label>
              <input
                name="priorityOfOrder"
                type="text"
                defaultValue={
                  initialValues.priorityOfOrder !== undefined
                    ? initialValues.priorityOfOrder
                    : undefined
                }
              />
            </div>
            <div className="modal__inputs-observations">
              <label htmlFor="modal__inputs-observations">Observations</label>
              <input
                name="observations"
                type="text"
                defaultValue={
                  initialValues.observations !== undefined
                    ? initialValues.observations
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
export default EntryModal;
