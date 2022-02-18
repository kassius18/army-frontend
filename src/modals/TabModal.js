import Modal from "./Modal";
import { AiOutlineClose } from "react-icons/ai";
import tabApi from "apis/tabApi";
import { useState } from "react";

export default function TabModal({
  isOpen,
  closeModal,
  addTab,
  editTab,
  initialValues = {},
}) {
  const [apiResponse, setApiResponse] = useState({ success: true });

  const createTab = (newTab) => {
    tabApi.createTab(newTab).then((response) => {
      if (response.success === true && Object.keys(response.tabs) !== 0) {
        closeModal();
        addTab(...response.tabs);
        if (apiResponse.success !== true) {
          setApiResponse(response);
        }
      } else {
        console.log("error happened setting api response");
        setApiResponse(response);
      }
    });
  };

  const updateTab = (newTab, tabId) => {
    tabApi.updateTab(newTab, tabId).then((response) => {
      if (response.success === true) {
        closeModal();
        editTab(newTab, tabId);
        if (apiResponse.success !== true) {
          setApiResponse(response);
        }
      } else {
        setApiResponse(response);
      }
    });
  };

  const closeModalAndResetContent = () => {
    closeModal();
    setApiResponse({ success: true });
  };

  const submitForm = (event) => {
    event.preventDefault();
    const newTab = {
      id: event.target.id.value,
      name: event.target.name.value,
      startingTotal: event.target.startingTotal.value,
      usage: event.target.usage.value,
      observations: event.target.observations.value,
    };
    if (Object.keys(initialValues).length === 0) {
      createTab(newTab);
    } else {
      updateTab(newTab, initialValues.id);
    }
  };

  return (
    <div>
      <Modal isOpen={isOpen} closeModal={closeModalAndResetContent}>
        {apiResponse.success ? (
          <form className="modal__inputs" onSubmit={submitForm}>
            <AiOutlineClose
              color="red"
              className="modal__cancel"
              onClick={closeModal}
            />
            <div className="modal__inputs-id">
              <label htmlFor="id">Id</label>
              <input
                name="id"
                type="number"
                defaultValue={
                  initialValues.id !== undefined ? initialValues.id : undefined
                }
              />
            </div>
            <div className="modal__inputs-name">
              <label htmlFor="plate">Όνομα</label>
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
            <div className="modal__inputs-startingTotal">
              <label htmlFor="tabType">Αρχικό Σύνολο</label>
              <input
                name="startingTotal"
                type="text"
                defaultValue={
                  initialValues.startingTotal !== undefined
                    ? initialValues.startingTotal
                    : undefined
                }
              />
            </div>
            <div className="modal__inputs-usage">
              <label htmlFor="usage">Χρήση</label>
              <input
                name="usage"
                type="text"
                defaultValue={
                  initialValues.usage !== undefined
                    ? initialValues.usage
                    : undefined
                }
              />
            </div>
            <div className="modal__inputs-observations">
              <label htmlFor="observations">Παρατηρησεις</label>
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
              {Object.keys(initialValues).length === 0
                ? "Προσθήκη"
                : "Τροποποίηση"}
            </button>
          </form>
        ) : (
          <h1>{apiResponse.error.message}</h1>
        )}
      </Modal>
    </div>
  );
}
