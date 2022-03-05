import requestApi from "apis/requestApi";
import Modal from "./Modal";
import { AiOutlineClose } from "react-icons/ai";
import { useState } from "react";

function RequestModal({
  closeModal,
  addRequest,
  editRequest,
  initialValues = {},
  modalActions,
}) {
  const [feedback, setFeedback] = useState(false);

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
        <AiOutlineClose
          style={{ color: "red" }}
          className="modal__cancel"
          onClick={closeModal}
        />
        <form
          onSubmit={submitForm}
          className={"request__form"}
          id="requestForm"
        >
          {feedback && <span>Το Φ η το Έτος πρεπει να μην είναι ίδια</span>}
          <div className={"request__body"}>
            <div className={"request__data"}>
              <span>Φ</span>
              <input
                type="number"
                name="firstPartOfPhi"
                defaultValue={
                  initialValues.firstPartOfPhi !== undefined
                    ? initialValues.firstPartOfPhi
                    : undefined
                }
              />
              <span>Σχέδιο</span>
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
            <div className={"request__data"}>
              <span>Έτος</span>
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
            <div className={"request__data"}>
              <span>Μήνας</span>
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
            <div className={"request__data"}>
              <span>Μέρα</span>
              <input
                type="number"
                name="day"
                defaultValue={
                  initialValues.day !== undefined
                    ? initialValues.day
                    : undefined
                }
              />
            </div>
          </div>
          <button type="submit" className="modal__button" form="requestForm">
            {Object.keys(initialValues).length === 0
              ? "Προσθήκη"
              : "Επεξεργασία"}
          </button>
        </form>
      </Modal>
    </div>
  );
}
export default RequestModal;
