import { IoMdAdd } from "react-icons/io";
import { AiOutlineClose } from "react-icons/ai";

function Modal({ addEntry, isModalOpen, setIsModalOpen }) {
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const submitAndCloseModal = (event) => {
    closeModal();
    addEntry(event);
  };

  return (
    <>
      <IoMdAdd className="table__button addRow" onClick={openModal} />
      <div
        className={"modal " + (isModalOpen ? "modal-active" : "modal-inactive")}
      >
        <form className="modal__inputs" onSubmit={submitAndCloseModal}>
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
            <label htmlFor="modal__inputs-reasonOfOrder">Reason Of Order</label>
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
    </>
  );
}
export default Modal;
