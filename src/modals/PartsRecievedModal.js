import Modal from "react-modal";
import { AiOutlineClose } from "react-icons/ai";
import uuid from "react-uuid";

function PartsRecievedModal({
  isModalOpen,
  closeModal,
  addPartRecieved,
  editPart,
  entryId,
  initialValues = {},
}) {
  const submitForm = (event) => {
    event.preventDefault();
    closeModal();
    const newPart = {
      id: uuid(),
      date: event.target.date.value,
      pieNumber: event.target.pieNumber.value,
      amountRecieved: event.target.amountRecieved.value,
      tab: event.target.tab.value,
      observations: event.target.observations.value,
      consumable: event.target.consumable.value,
    };
    if (Object.keys(initialValues).length === 0) {
      addPartRecieved(newPart, entryId);
    } else {
      // editEntry(initialValues.id, newEntry);
      throw Error;
    }
    return null;
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
            <div className="modal__inputs-date">
              <label htmlFor="date">Date</label>
              <input
                name="date"
                type="text"
                defaultValue={
                  initialValues.date !== undefined
                    ? initialValues.date
                    : undefined
                }
              />
            </div>
            <div className="modal__inputs-pieNumber">
              <label htmlFor="pieNumber">pieNumber</label>
              <input
                name="pieNumber"
                type="text"
                defaultValue={
                  initialValues.pieNumber !== undefined
                    ? initialValues.pieNumber
                    : undefined
                }
              />
            </div>
            <div className="modal__inputs-amountRecieved">
              <label htmlFor="amountRecieved">Main Material</label>
              <input
                name="amountRecieved"
                type="text"
                defaultValue={
                  initialValues.amountRecieved !== undefined
                    ? initialValues.amountRecieved
                    : undefined
                }
              />
            </div>
            <div className="modal__inputs-tab">
              <label htmlFor="tab">Tab</label>
              <input
                name="tab"
                type="text"
                defaultValue={
                  initialValues.tab !== undefined
                    ? initialValues.tab
                    : undefined
                }
              />
            </div>
            <div className="modal__inputs-observations">
              <label htmlFor="modal__inputs-observations">Units Of Order</label>
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
            <div className="modal__inputs-consumable">
              <label htmlFor="consumable">Reason Of Order</label>
              <input
                name="consumable"
                type="text"
                defaultValue={
                  initialValues.consumable !== undefined
                    ? initialValues.consumable
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
export default PartsRecievedModal;
