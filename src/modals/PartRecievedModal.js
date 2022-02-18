import Modal from "./Modal";
import { AiOutlineClose } from "react-icons/ai";
import uuid from "react-uuid";
import partApi from "apis/partApi";
import { useState } from "react";

function PartRecievedModal({
  isOpen,
  closeModal,
  addPart,
  editPart,
  entryId,
  initialValues = {},
}) {
  const [apiResponse, setApiResponse] = useState({ sucess: true });
  const [validationPasses, setValidationPasses] = useState(true);

  const createPart = (newPart, entryId) => {
    partApi.createPart(newPart, entryId).then((response) => {
      if (response.success === true && Object.keys(response.parts) !== 0) {
        closeModal();
        addPart(...response.parts);
        if (apiResponse.sucess !== true) {
          setApiResponse(response);
        }
      } else {
        setApiResponse(response);
      }
    });
  };

  const updatePart = (newPart, partId) => {
    partApi.updatePart(newPart, partId).then((response) => {
      if (response.success === true) {
        closeModal();
        editPart(newPart, partId);
        if (apiResponse.sucess !== true) {
          setApiResponse(response);
        }
      } else {
        setApiResponse(response);
      }
    });
  };

  const closeModalAndResetContent = () => {
    setValidationPasses(true);
    closeModal();
    setApiResponse({ sucess: true });
  };

  const submitForm = (event) => {
    event.preventDefault();

    console.log("clicked");
    console.log(
      event.target.amountRecieved.value,
      event.target.amountUsed.value
    );
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

      console.log(event.target.monthUsed.value);

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
        amountUsed: parseInt(event.target.amountUsed.value) || "",
      };
      if (Object.keys(initialValues).length === 0) {
        createPart(newPart, entryId);
      } else {
        updatePart(newPart, initialValues.id);
      }
    }
  };

  return (
    <div>
      <Modal isOpen={isOpen} closeModal={closeModalAndResetContent}>
        <AiOutlineClose
          style={{ color: "red" }}
          className="modal__cancel"
          onClick={closeModal}
        />
        {apiResponse.sucess ? (
          <form className="modal__inputs" onSubmit={submitForm} id="part__form">
            <div className="modal__inputs-dateRecieved">
              {validationPasses === 3 ? (
                <div>Date cannot be empty if amount used is set</div>
              ) : null}
              <label htmlFor="dayRecieved">Ημέρα εισαγωγής</label>
              <input
                name="dayRecieved"
                type="number"
                defaultValue={
                  initialValues.dateRecieved !== undefined
                    ? parseInt(initialValues.dateRecieved.split("-")[0])
                    : ""
                }
              />
              <label htmlFor="monthRecieved">Μήνας εισαγωγής</label>
              <input
                name="monthRecieved"
                type="number"
                defaultValue={
                  initialValues.dateRecieved !== undefined
                    ? parseInt(initialValues.dateRecieved.split("-")[1])
                    : ""
                }
              />
              <label htmlFor="yearRecieved">Ετός εισαγωγής</label>
              <input
                name="yearRecieved"
                type="number"
                defaultValue={
                  initialValues.dateRecieved !== undefined
                    ? parseInt(initialValues.dateRecieved.split("-")[2])
                    : ""
                }
              />
            </div>
            <div className="modal__inputs-amountRecieved">
              {validationPasses === 1 ? (
                <div>One of these fields must be filled</div>
              ) : null}
              <label htmlFor="amountRecieved">Ποσότητα εισαγωγής</label>
              <input
                name="amountRecieved"
                type="number"
                defaultValue={
                  initialValues.amountRecieved !== undefined
                    ? initialValues.amountRecieved
                    : ""
                }
              />
            </div>
            <div className="modal__inputs-pieNumber">
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
            <div className="modal__inputs-tabUsed">
              <label htmlFor="tabUsed">Αριθμός Εργασίας</label>
              <input
                name="tabUsed"
                type="text"
                defaultValue={
                  initialValues.tab !== undefined
                    ? initialValues.tab
                    : undefined
                }
              />
            </div>
            <div className="modal__inputs-dateUsed">
              {validationPasses === 2 ? (
                <div>Date cannot be empty if amount used is set</div>
              ) : null}
              <label htmlFor="dayUsed">Ημέρα εξαγωγής</label>
              <input
                name="dayUsed"
                type="number"
                defaultValue={
                  initialValues.dateUsed !== undefined
                    ? parseInt(initialValues.dateUsed.split("-")[0])
                    : ""
                }
              />
              <label htmlFor="monthUsed">Μηνας εξαγωγής</label>
              <input
                name="monthUsed"
                type="number"
                defaultValue={
                  initialValues.dateUsed !== undefined
                    ? parseInt(initialValues.dateUsed.split("-")[1])
                    : ""
                }
              />
              <label htmlFor="yearUsed">Ετός εξαγωγής</label>
              <input
                name="yearUsed"
                type="number"
                defaultValue={
                  initialValues.dateUsed !== undefined
                    ? parseInt(initialValues.dateUsed.split("-")[2])
                    : ""
                }
              />
            </div>
            <div className="modal__inputs-amountUsed">
              {validationPasses === 1 ? (
                <div>One of these fields must be filled</div>
              ) : null}
              <label htmlFor="modal__inputs-amountUsed">
                Ποσότητα εξαγωγής
              </label>
              <input
                name="amountUsed"
                type="number"
                defaultValue={
                  initialValues.amountUsed !== undefined
                    ? parseInt(initialValues.amountUsed)
                    : ""
                }
              />
            </div>
            <div className="modal__inputs-observation">
              <label htmlFor="modal__inputs-observation">Παρατηρησεις</label>
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
          </form>
        ) : (
          <h1>Error connecting to server</h1>
        )}
        <button type="submit" className="modal__button" form="part__form">
          {Object.keys(initialValues).length === 0 ? "Add" : "Edit"}
        </button>
      </Modal>
    </div>
  );
}

export default PartRecievedModal;
