import Modal from "react-modal";
import { AiOutlineClose } from "react-icons/ai";
import uuid from "react-uuid";

function EntryModal({ isModalOpen, closeModal, addEntry }) {
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
    addEntry(newEntry);
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
              <input name="nameNumber" type="text" />
            </div>
            <div className="modal__inputs-name">
              <label htmlFor="name">Name</label>
              <input name="name" type="text" />
            </div>
            <div className="modal__inputs-mainPart">
              <label htmlFor="mainPart">Main Material</label>
              <input name="mainPart" type="text" />
            </div>
            <div className="modal__inputs-amountOfOrder">
              <label htmlFor="amountOfOrder">Amount Of Order</label>
              <input name="amountOfOrder" type="text" />
            </div>
            <div className="modal__inputs-unitOfOrder">
              <label htmlFor="modal__inputs-unitOfOrder">Units Of Order</label>
              <input name="unitOfOrder" type="text" />
            </div>
            <div className="modal__inputs-reasonOfOrder">
              <label htmlFor="modal__inputs-reasonOfOrder">
                Reason Of Order
              </label>
              <input name="reasonOfOrder" type="text" />
            </div>
            <div className="modal__inputs-priorityOfOrder">
              <label htmlFor="modal__inputs-priorityOfOrder">
                Priority Of Order
              </label>
              <input name="priorityOfOrder" type="text" />
            </div>
            <div className="modal__inputs-observations">
              <label htmlFor="modal__inputs-observations">Observations</label>
              <input name="observations" type="text" />
            </div>
            <button type="submit" className="modal__button">
              Add
            </button>
          </form>
        </div>
      </Modal>
    </div>
  );
}
export default EntryModal;
