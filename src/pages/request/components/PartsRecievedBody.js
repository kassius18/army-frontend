import React, { useState } from "react";
import { IoMdAdd } from "react-icons/io";
import partApi from "apis/partApi";
import OnePartRecieved from "./OnePartRecieved";
import PartRecievedModal from "modals/PartRecievedModal";
import ApiErrorModal from "modals/ApiErrorModal";

export default function PartsRecievedBody({ parts, entryId, requestActions }) {
  const [initialValues, setInitialValues] = useState({});
  const [apiResponse, setApiResponse] = useState({ success: true });
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);

  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setInitialValues({});
    setIsOpen(false);
  };

  const openErrorModal = () => {
    setIsErrorModalOpen(true);
  };

  const closeErrorModal = () => {
    setIsErrorModalOpen(false);
  };

  const addPart = (newPart) => {
    requestActions.addPart(newPart, entryId);
  };

  const deletePart = (partId) => {
    partApi.deletePart(partId).then((response) => {
      if (response.success === true) {
        requestActions.deletePart(partId);
      } else {
        setApiResponse(response);
        openErrorModal();
      }
    });
  };

  const editPart = (newPart, partId) => {
    requestActions.editPart(newPart, partId);
  };
  return (
    <>
      {parts.map((part) => {
        return (
          <OnePartRecieved
            part={part}
            key={part.id}
            setInitialValues={setInitialValues}
            openModal={openModal}
            deletePart={deletePart}
          />
        );
      })}
      <IoMdAdd className="table__button addRow" onClick={openModal} />
      <PartRecievedModal
        isOpen={isOpen}
        closeModal={closeModal}
        addPart={addPart}
        editPart={editPart}
        initialValues={initialValues}
        entryId={entryId}
      />
      <ApiErrorModal
        isModalOpen={isErrorModalOpen}
        closeModal={closeErrorModal}
        error={apiResponse.error}
      />
    </>
  );
}
