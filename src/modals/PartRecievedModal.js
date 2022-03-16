import Modal from "./Modal";
import uuid from "react-uuid";
import partApi from "apis/partApi";
import entryApi from "apis/entryApi";
import { useState } from "react";
import { useContext } from "react";
import { AppContext } from "context/AppContext";

function PartRecievedModal({
  closeModal,
  addPart,
  editPart,
  editEntry,
  entry,
  initialValues = {},
  modalActions,
}) {
  const [validationPasses, setValidationPasses] = useState(true);
  const { tabs } = useContext(AppContext);

  const createPart = (newPart, entryId) => {
    modalActions.openLoadingModal();
    partApi.createPart(newPart, entryId).then((response) => {
      if (response.success === true && Object.keys(response.parts) !== 0) {
        closeModal();
        addPart(...response.parts);
      } else {
        modalActions.openApiErrorModal(modalActions.closeModal, response.error);
      }
    });
  };

  const updatePart = (newPart, partId) => {
    modalActions.openLoadingModal();
    partApi.updatePart(newPart, partId).then((response) => {
      if (response.success === true) {
        closeModal();
        editPart(...response.parts, partId);
      } else {
        modalActions.openApiErrorModal(modalActions.closeModal, response.error);
      }
    });
  };

  const updateEntry = (newEntry, entryId) => {
    modalActions.openLoadingModal();
    entryApi.updateEntry(newEntry, entryId).then((response) => {
      if (response.success === true && Object.keys(response.entries) !== 0) {
        closeModal();
        editEntry(...response.entries, entryId);
      } else {
        modalActions.openApiErrorModal(modalActions.closeModal, response.error);
      }
    });
  };

  const closeModalAndResetContent = () => {
    setValidationPasses(true);
    closeModal();
  };

  const submitForm = (event) => {
    event.preventDefault();
    if (
      event.target.amountRecieved.value === "" &&
      event.target.amountUsed.value === ""
    ) {
      setValidationPasses(1);
    } else if (
      event.target.amountRecieved.value !== "" &&
      (event.target.dayRecieved.value === "" ||
        event.target.monthRecieved.value === "" ||
        event.target.yearRecieved.value === "")
    ) {
      setValidationPasses(2);
    } else if (
      event.target.amountUsed.value !== "" &&
      (event.target.dayUsed.value === "" ||
        event.target.monthUsed.value === "" ||
        event.target.yearUsed.value === "")
    ) {
      setValidationPasses(3);
    } else {
      setValidationPasses(false);
      closeModal();

      const newPart = {
        id: uuid(),
        dateRecieved:
          event.target.dayRecieved.value &&
          event.target.monthRecieved.value &&
          event.target.yearRecieved.value
            ? event.target.dayRecieved.value +
              "-" +
              event.target.monthRecieved.value +
              "-" +
              event.target.yearRecieved.value
            : "",
        amountUsed: parseInt(event.target.amountUsed.value),
        pieNumber: event.target.pieNumber.value,
        amountRecieved: parseInt(event.target.amountRecieved.value),
        tabUsed: event.target.tabUsed.value,
        observation: event.target.observation.value,
        dateUsed:
          event.target.dayUsed.value &&
          event.target.monthUsed.value &&
          event.target.yearUsed.value
            ? event.target.dayUsed.value +
              "-" +
              event.target.monthUsed.value +
              "-" +
              event.target.yearUsed.value
            : "",
      };

      const consumableId = event.target.consumableId.value;
      if (entry.consumableId !== consumableId) {
        const newEntry = { ...entry, consumableId };
        updateEntry(newEntry, entry.id);
      }
      if (Object.keys(initialValues).length === 0) {
        createPart(newPart, entry.id);
      } else {
        updatePart(newPart, initialValues.id);
      }
    }
  };

  return (
    <div>
      <Modal closeModal={closeModalAndResetContent}>
        <form
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
          }}
          className="modal__form"
          onSubmit={submitForm}
          id="part__form"
        >
          <div className="modal__input-left">
            <div className="modal__input">
              {validationPasses === 2 ? (
                <div>Date cannot be empty if amount used is set</div>
              ) : null}
              <label htmlFor="dayRecieved">Ημέρα εισαγωγής</label>
              <input
                name="dayRecieved"
                type="number"
                defaultValue={
                  initialValues.dateRecieved !== undefined &&
                  initialValues.dateRecieved !== ""
                    ? parseInt(initialValues.dateRecieved.split("-")[0])
                    : ""
                }
              />
            </div>
            <div className="modal__input">
              <label htmlFor="monthRecieved">Μήνας εισαγωγής</label>
              <input
                name="monthRecieved"
                type="number"
                defaultValue={
                  initialValues.dateRecieved !== undefined &&
                  initialValues.dateRecieved !== ""
                    ? parseInt(initialValues.dateRecieved.split("-")[1])
                    : ""
                }
              />
            </div>
            <div className="modal__input">
              <label htmlFor="yearRecieved">Ετός εισαγωγής</label>
              <input
                name="yearRecieved"
                type="number"
                defaultValue={
                  initialValues.dateRecieved !== undefined &&
                  initialValues.dateRecieved !== ""
                    ? parseInt(initialValues.dateRecieved.split("-")[2])
                    : ""
                }
              />
            </div>
            <div className="modal__input">
              {validationPasses === 1 ? (
                <div>One of these fields must be filled</div>
              ) : null}
              <label htmlFor="amountRecieved">Ποσότητα εισαγωγής</label>
              <input
                name="amountRecieved"
                type="number"
                defaultValue={
                  initialValues.amountRecieved !== undefined &&
                  initialValues.amountRecieved !== ""
                    ? parseInt(initialValues.amountRecieved)
                    : ""
                }
              />
            </div>
          </div>
          <div className="modal__input-right">
            <div className="modal__input">
              {validationPasses === 2 ? (
                <div>Date cannot be empty if amount used is set</div>
              ) : null}
              <label htmlFor="dayUsed">Ημέρα εξαγωγής</label>
              <input
                name="dayUsed"
                type="number"
                defaultValue={
                  initialValues.dateUsed !== undefined &&
                  initialValues.dateUsed !== ""
                    ? parseInt(initialValues.dateUsed.split("-")[0])
                    : ""
                }
              />
            </div>
            <div className="modal__input">
              <label htmlFor="monthUsed">Μηνας εξαγωγής</label>
              <input
                name="monthUsed"
                type="number"
                defaultValue={
                  initialValues.dateUsed !== undefined &&
                  initialValues.dateUsed !== ""
                    ? parseInt(initialValues.dateUsed.split("-")[1])
                    : ""
                }
              />
            </div>
            <div className="modal__input">
              <label htmlFor="yearUsed">Ετός εξαγωγής</label>
              <input
                name="yearUsed"
                type="number"
                defaultValue={
                  initialValues.dateUsed !== undefined &&
                  initialValues.dateUsed !== ""
                    ? parseInt(initialValues.dateUsed.split("-")[2])
                    : ""
                }
              />
            </div>
            <div className="modal__input">
              {validationPasses === 1 ? (
                <div>One of these fields must be filled</div>
              ) : null}
              <label htmlFor="amountUsed">Ποσότητα εξαγωγής</label>
              <input
                name="amountUsed"
                type="number"
                defaultValue={
                  initialValues.amountUsed !== undefined &&
                  initialValues.amountUsed !== ""
                    ? parseInt(initialValues.amountUsed)
                    : ""
                }
              />
            </div>
          </div>
          <div className="modal__input-bottom" style={{ gridColumn: "-1/1" }}>
            <div className="modal__input">
              <label htmlFor="pieNumber">Αριθμός Π</label>
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
            <div className="modal__input">
              <label htmlFor="tabUsed">Αριθμός Εργασίας</label>
              <input
                name="tabUsed"
                type="text"
                defaultValue={
                  initialValues.tabUsed !== undefined
                    ? initialValues.tabUsed
                    : undefined
                }
              />
            </div>
            <div className="modal__input">
              <label htmlFor="observation">Παρατηρησεις</label>
              <input
                name="observation"
                type="text"
                defaultValue={
                  initialValues.observation !== undefined
                    ? initialValues.observation
                    : undefined
                }
              />
            </div>
            <div className="modal__input">
              <label htmlFor="consumableId">Καρτέλα</label>
              <select name="consumableId" defaultValue={entry.consumableId}>
                {tabs.map((tab) => {
                  return (
                    <option key={tab.id} value={tab.id}>
                      {tab.id}: {tab.name}
                    </option>
                  );
                })}
                <option value="">none</option>
              </select>
            </div>
          </div>
        </form>

        <button type="submit" className="modal__button" form="part__form">
          {Object.keys(initialValues).length === 0 ? "Add" : "Edit"}
        </button>
      </Modal>
    </div>
  );
}

export default PartRecievedModal;
