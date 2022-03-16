import Modal from "./Modal";
import uuid from "react-uuid";
import entryApi from "apis/entryApi";

function EntryModal({
  closeModal,
  initialValues = {},
  addEntry,
  editEntry,
  request,
  modalActions,
}) {
  const createEntry = (newEntry, request) => {
    modalActions.openLoadingModal();
    entryApi
      .createEntry(newEntry, request.firstPartOfPhi, request.year)
      .then((response) => {
        if (response.success === true && Object.keys(response.entries) !== 0) {
          closeModal();
          addEntry(...response.entries, request.id);
        } else {
          modalActions.openApiErrorModal(
            modalActions.closeModal,
            response.error
          );
        }
      });
  };

  const updateEntry = (newEntry, entryId, action = null) => {
    modalActions.openLoadingModal();
    entryApi.updateEntry(newEntry, entryId).then((response) => {
      if (response.success === true && Object.keys(response.entries) !== 0) {
        closeModal();
        if (action) {
          action(...response.entries, entryId);
        } else {
          editEntry(...response.entries, entryId);
        }
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
    const newEntry = {
      id: uuid(),
      nameNumber: event.target.nameNumber.value,
      name: event.target.name.value,
      mainPart: event.target.mainPart.value,
      amountOfOrder: parseInt(event.target.amountOfOrder.value),
      unitOfOrder: event.target.unitOfOrder.value,
      reasonOfOrder: event.target.reasonOfOrder.value,
      priorityOfOrder: parseInt(event.target.priorityOfOrder.value),
    };
    if (Object.keys(initialValues).length === 0) {
      createEntry({ ...newEntry, consumableId: "" }, request);
    } else {
      updateEntry(
        { ...newEntry, consumableId: initialValues.consumableId },
        initialValues.id
      );
    }
  };

  return (
    <div>
      <Modal closeModal={closeModalAndResetContent}>
        <form className="modal__inputs" onSubmit={submitForm} id="entry__form">
          <div className="modal__input">
            <label htmlFor="nameNumber">Αριθμός Ονομαστικού</label>
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
          <div className="modal__input">
            <label htmlFor="name">Όνομα</label>
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
          <div className="modal__input">
            <label htmlFor="mainPart">Κύριο Υλικό</label>
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
          <div className="modal__input">
            <label htmlFor="amountOfOrder">Ποσότητα</label>
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
          <div className="modal__input">
            <label htmlFor="unitOfOrder">Μονάδα</label>
            <select
              name="unitOfOrder"
              type="text"
              defaultValue={
                Object.keys(initialValues).length !== 0
                  ? initialValues.unitOfOrder
                  : "τεμ"
              }
            >
              <option value="τεμ">τεμ</option>
              <option value="λτ">λτ</option>
            </select>
          </div>
          <div className="modal__input">
            <label htmlFor="reasonOfOrder">Αιτιολογία </label>
            <input
              name="reasonOfOrder"
              type="text"
              defaultValue={
                initialValues.reasonOfOrder !== undefined
                  ? initialValues.reasonOfOrder
                  : "04"
              }
            />
          </div>
          <div className="modal__input">
            <label htmlFor="priorityOfOrder">Προτεραιοτήτα</label>
            <input
              name="priorityOfOrder"
              type="text"
              defaultValue={
                initialValues.priorityOfOrder !== undefined
                  ? initialValues.priorityOfOrder
                  : 50
              }
            />
          </div>
        </form>
        <button type="submit" className="modal__button" form="entry__form">
          {Object.keys(initialValues).length === 0 ? "Προσθήκη" : "Τροποποίηση"}
        </button>
      </Modal>
    </div>
  );
}
export default EntryModal;
