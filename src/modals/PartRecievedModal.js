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
    closeModal();
    setApiResponse({ sucess: true });
  };

  const submitForm = (event) => {
    event.preventDefault();
    closeModal();
    const newPart = {
      id: uuid(),
      dateRecieved:
        event.target.dayRecieved.value +
        "-" +
        event.target.monthRecieved.value +
        "-" +
        event.target.yearRecieved.value,
      amountUsed: parseInt(event.target.amountUsed.value),
      pieNumber: event.target.pieNumber.value,
      amountRecieved: parseInt(event.target.amountRecieved.value),
      tabUsed: event.target.tabUsed.value,
      observation: event.target.observation.value,
      dateUsed:
        event.target.dayUsed.value +
        "-" +
        event.target.monthUsed.value +
        "-" +
        event.target.yearUsed.value,
      amountUsed: parseInt(event.target.amountUsed.value),
    };
    if (Object.keys(initialValues).length === 0) {
      createPart(newPart, entryId);
    } else {
      updatePart(newPart, initialValues.id);
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
              <label htmlFor="dayRecieved">Day Used</label>
              <input
                name="dayRecieved"
                type="text"
                defaultValue={
                  initialValues.dateRecieved !== undefined
                    ? initialValues.dateRecieved.split("-")[0]
                    : undefined
                }
              />
              <label htmlFor="monthRecieved">Month Recieved</label>
              <input
                name="monthRecieved"
                type="text"
                defaultValue={
                  initialValues.dateRecieved !== undefined
                    ? initialValues.dateRecieved.split("-")[1]
                    : undefined
                }
              />
              <label htmlFor="yearRecieved">Date Recieved</label>
              <input
                name="yearRecieved"
                type="text"
                defaultValue={
                  initialValues.dateRecieved !== undefined
                    ? initialValues.dateRecieved.split("-")[2]
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
              <label htmlFor="amountRecieved">Amount Recieved</label>
              <input
                name="amountRecieved"
                type="number"
                defaultValue={
                  initialValues.amountRecieved !== undefined
                    ? initialValues.amountRecieved
                    : undefined
                }
              />
            </div>
            <div className="modal__inputs-tabUsed">
              <label htmlFor="tabUsed">Tab</label>
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
              <label htmlFor="dayUsed">Day Used</label>
              <input
                name="dayUsed"
                type="text"
                defaultValue={
                  initialValues.dateUsed !== undefined
                    ? initialValues.dateUsed.split("-")[0]
                    : undefined
                }
              />
              <label htmlFor="monthUsed">Month Used</label>
              <input
                name="monthUsed"
                type="text"
                defaultValue={
                  initialValues.dateUsed !== undefined
                    ? initialValues.dateUsed.split("-")[1]
                    : undefined
                }
              />
              <label htmlFor="yearUsed">Date Used</label>
              <input
                name="yearUsed"
                type="text"
                defaultValue={
                  initialValues.dateUsed !== undefined
                    ? initialValues.dateUsed.split("-")[2]
                    : undefined
                }
              />
            </div>
            <div className="modal__inputs-amountUsed">
              <label htmlFor="modal__inputs-amountUsed">Amount Used</label>
              <input
                name="amountUsed"
                type="number"
                defaultValue={
                  initialValues.amountUsed !== undefined
                    ? initialValues.amountUsed
                    : undefined
                }
              />
            </div>
            <div className="modal__inputs-observation">
              <label htmlFor="modal__inputs-observation">Observations</label>
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

            <button type="submit" className="modal__button">
              {Object.keys(initialValues).length === 0 ? "Add" : "Edit"}
            </button>
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
