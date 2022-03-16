import requestApi from "apis/requestApi";
import Modal from "./Modal";
import { useState } from "react";
import { useContext } from "react";
import { AppContext } from "context/AppContext";

function RequestModal({
  closeModal,
  addRequest,
  editRequest,
  initialValues = {},
  modalActions,
}) {
  const [feedback, setFeedback] = useState(false);
  const { vehicles } = useContext(AppContext);

  const createRequest = (newRequest) => {
    modalActions.openLoadingModal();
    requestApi.createRequest(newRequest).then((response) => {
      if (response.success === true) {
        closeModal();
        addRequest(...response.requests);
      } else {
        modalActions.openApiErrorModal(modalActions.closeModal, response.error);
      }
    });
  };

  const copyRequest = (request) => {
    modalActions.openLoadingModal();
    requestApi.copyRequest(request).then((response) => {
      if (response.success === true) {
        closeModal();
        editRequest(request);
      } else {
        modalActions.openApiErrorModal(modalActions.closeModal, response.error);
      }
    });
  };

  const updateRequest = (newRequest, requestId) => {
    modalActions.openLoadingModal();
    requestApi.updateRequest(newRequest, requestId).then((response) => {
      if (response.success === true) {
        closeModal();
        editRequest(...response.requests, requestId);
      } else {
        modalActions.openApiErrorModal(modalActions.closeModal, response.error);
      }
    });
  };

  const closeModalAndResetContent = () => {
    closeModal();
    setFeedback(false);
  };

  const submitForm = (e) => {
    e.preventDefault();
    const newRequest = {
      firstPartOfPhi: parseInt(e.target.firstPartOfPhi.value),
      secondPartOfPhi: parseInt(e.target.secondPartOfPhi.value) || "",
      year: parseInt(e.target.year.value),
      month: parseInt(e.target.month.value),
      day: parseInt(e.target.day.value),
      vehicleId: parseInt(e.target.vehicleId.value),
    };
    if (Object.keys(initialValues).length === 0) {
      createRequest(newRequest);
    } else {
      if (initialValues.copy) {
        if (
          newRequest.firstPartOfPhi === initialValues.firstPartOfPhi &&
          newRequest.year === initialValues.year
        ) {
          setFeedback(true);
        } else {
          copyRequest({ ...initialValues, ...newRequest });
        }
      } else {
        updateRequest(newRequest, initialValues.id);
      }
    }
  };

  return (
    <div>
      <Modal closeModal={closeModalAndResetContent}>
        <form onSubmit={submitForm} className={"modal__form"} id="requestForm">
          {feedback && <span>Το Φ η το Έτος πρεπει να μην είναι ίδια</span>}
          <div className={"modal__input"}>
            <label htmlFor="firstPartOfPhi">Φ</label>
            <input
              type="number"
              name="firstPartOfPhi"
              defaultValue={
                initialValues.firstPartOfPhi !== undefined
                  ? initialValues.firstPartOfPhi
                  : undefined
              }
            />
          </div>
          <div className={"modal__input"}>
            <label htmlFor="secondPartOfPhi">Σχέδιο</label>
            <input
              type="number"
              name="secondPartOfPhi"
              defaultValue={
                initialValues.secondPartOfPhi !== undefined
                  ? initialValues.secondPartOfPhi
                  : undefined
              }
            />
          </div>
          <div className={"modal__input"}>
            <label htmlFor="year">Έτος</label>
            <input
              type="number"
              name="year"
              defaultValue={
                initialValues.year !== undefined
                  ? initialValues.year
                  : undefined
              }
            />
          </div>
          <div className={"modal__input"}>
            <label htmlFor="month">Μήνας</label>
            <input
              type="number"
              name="month"
              defaultValue={
                initialValues.month !== undefined
                  ? initialValues.month
                  : undefined
              }
            />
          </div>
          <div className={"modal__input"}>
            <label htmlFor="day">Μέρα</label>
            <input
              type="number"
              name="day"
              defaultValue={
                initialValues.day !== undefined ? initialValues.day : undefined
              }
            />
          </div>
          <div className="modal__input">
            <label htmlFor="vehicleId">Όχημα</label>
            <select
              name="vehicleId"
              defaultValue={
                Object.keys(initialValues).length !== 0
                  ? initialValues.vehicleId
                  : ""
              }
            >
              {vehicles.map((vehicle) => {
                return (
                  <option key={vehicle.id} value={vehicle.id}>
                    {vehicle.id}: {vehicle.plate}
                  </option>
                );
              })}
              <option value="">none</option>
            </select>
          </div>
        </form>
        <button type="submit" className="modal__button" form="requestForm">
          {Object.keys(initialValues).length === 0 ? "Προσθήκη" : "Επεξεργασία"}
        </button>
      </Modal>
    </div>
  );
}
export default RequestModal;
