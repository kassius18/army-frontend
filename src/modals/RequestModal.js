import requestApi from "apis/requestApi";
import Modal from "./Modal";
import { AiOutlineClose } from "react-icons/ai";
import { useState } from "react";

function RequestModal({
  isOpen,
  closeModal,
  addRequest,
  editRequest,
  initialValues = {},
}) {
  const [apiResponse, setApiResponse] = useState({ sucess: true });

  const createRequest = (newRequest) => {
    requestApi.createRequest(newRequest).then((response) => {
      if (response.success === true) {
        closeModal();
        addRequest(...response.requests);
        if (apiResponse.sucess !== true) {
          setApiResponse(response);
        }
      } else {
        setApiResponse(response);
      }
    });
  };

  const updateRequest = (newRequest, requestId) => {
    requestApi.updateRequest(newRequest, requestId).then((response) => {
      if (response.success === true) {
        closeModal();
        editRequest(newRequest, requestId);
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

  const submitForm = (e) => {
    e.preventDefault();
    const newRequest = {
      firstPartOfPhi: parseInt(e.target.firstPartOfPhi.value),
      secondPartOfPhi: parseInt(e.target.secondPartOfPhi.value),
      year: parseInt(e.target.year.value),
      month: parseInt(e.target.month.value),
      day: parseInt(e.target.day.value),
    };
    if (Object.keys(initialValues).length === 0) {
      createRequest(newRequest);
    } else {
      updateRequest(newRequest, initialValues.id);
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
            onSubmit={submitForm}
            className={"request__form"}
            id="requestForm"
          >
            <div className={"request__body"}>
              <div className={"request__data"}>
                <span>phi</span>
                <input
                  type="number"
                  name="firstPartOfPhi"
                  defaultValue={
                    initialValues.firstPartOfPhi !== undefined
                      ? initialValues.firstPartOfPhi
                      : undefined
                  }
                />
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
                <span>year</span>
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
                <span>month</span>
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
                <span>day</span>
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
              {Object.keys(initialValues).length === 0 ? "Add" : "Edit"}
            </button>
          </form>
        ) : (
          <h1>Error connecting to server</h1>
        )}
      </Modal>
    </div>
  );
}
export default RequestModal;
