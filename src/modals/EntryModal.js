import Modal from "./Modal";
import { AiOutlineClose } from "react-icons/ai";
import uuid from "react-uuid";
import entryApi from "apis/entryApi";
import { useContext, useState } from "react";
import { AppContext } from "context/AppContext";

function EntryModal({
  isOpen,
  closeModal,
  initialValues = {},
  addEntry,
  editEntry,
  request,
}) {
  const { vehicles, tabs } = useContext(AppContext);

  const [apiResponse, setApiResponse] = useState({ sucess: true });

  const createEntry = (newEntry, request) => {
    entryApi
      .createEntry(newEntry, request.firstPartOfPhi, request.year)
      .then((response) => {
        if (response.success === true && Object.keys(response.entries) !== 0) {
          closeModal();
          addEntry(...response.entries);
          if (apiResponse.sucess !== true) {
            setApiResponse(response);
          }
        } else {
          setApiResponse(response);
        }
      });
  };

  const updateEntry = (newEntry, entryId) => {
    entryApi.updateEntry(newEntry, entryId).then((response) => {
      if (response.success === true) {
        closeModal();
        editEntry(newEntry, entryId);
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
    const newEntry = {
      id: uuid(),
      nameNumber: event.target.nameNumber.value,
      name: event.target.name.value,
      mainPart: event.target.mainPart.value,
      amountOfOrder: parseInt(event.target.amountOfOrder.value),
      unitOfOrder: event.target.unitOfOrder.value,
      reasonOfOrder: parseInt(event.target.reasonOfOrder.value),
      priorityOfOrder: parseInt(event.target.priorityOfOrder.value),
      consumableId: event.target.consumableId.value,
      observations: event.target.observations.value,
    };
    if (Object.keys(initialValues).length === 0) {
      createEntry(newEntry, request);
    } else {
      updateEntry(newEntry, initialValues.id);
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
          <form
            className="modal__inputs"
            onSubmit={submitForm}
            id="entry__form"
          >
            <div className="modal__input">
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
            <div className="modal__input">
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
            <div className="modal__input">
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
            <div className="modal__input">
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
            <div className="modal__input">
              <label htmlFor="unitOfOrder">Units Of Order</label>
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
            <div className="modal__input">
              <label htmlFor="reasonOfOrder">Reason Of Order</label>
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
            <div className="modal__input">
              <label htmlFor="priorityOfOrder">Priority Of Order</label>
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
            <div className="modal__input">
              <label htmlFor="observations">Observations</label>
              <select
                name="observations"
                type="text"
                defaultValue={
                  Object.keys(initialValues).length !== 0
                    ? initialValues.observations
                    : ""
                }
              >
                {vehicles.map((vehicle) => {
                  return (
                    <option key={vehicle.id} value={vehicles.plate}>
                      {vehicle.plate}
                    </option>
                  );
                })}
                <option value={""}>none</option>
              </select>
            </div>
            <div className="modal__input">
              <label htmlFor="consumableId">Consumable</label>
              <select
                name="consumableId"
                type="text"
                defaultValue={
                  Object.keys(initialValues).length !== 0
                    ? initialValues.consumableId
                    : ""
                }
              >
                {tabs.map((tab) => {
                  return (
                    <option key={tab.id} value={tab.id}>
                      {tab.name}
                    </option>
                  );
                })}
                <option value={""}>none</option>
              </select>
            </div>
          </form>
        ) : (
          <h1>Error connecting to server</h1>
        )}
        <button type="submit" className="modal__button" form="entry__form">
          {Object.keys(initialValues).length === 0 ? "Add" : "Edit"}
        </button>
      </Modal>
    </div>
  );
}
export default EntryModal;
