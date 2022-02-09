import React, { useState, useEffect } from "react";
import { IoMdAdd } from "react-icons/io";
import partApi from "apis/partApi";
import OnePartRecieved from "./OnePartRecieved";
import PartRecievedModal from "modals/PartRecievedModal";
import ApiErrorModal from "modals/ApiErrorModal";

export default function PartsRecievedBody({
  partsProp,
  entryId,
  setEntriesParts,
}) {
  const [parts, setParts] = useState(partsProp || []);
  const [initialValues, setInitialValues] = useState({});
  const [apiResponse, setApiResponse] = useState({ success: true });
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);

  useEffect(() => {
    setEntriesParts(parts);
  }, [parts]);

  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const openErrorModal = () => {
    setIsErrorModalOpen(true);
  };

  const closeErrorModal = () => {
    setIsErrorModalOpen(false);
  };

  const addPart = (newPart) => {
    setParts([...parts, newPart]);
  };

  const deletePart = (partId) => {
    partApi.deletePart(partId).then((response) => {
      if (response.success === true) {
        setParts((oldParts) => {
          return oldParts.filter((part) => {
            if (part.id !== partId) {
              return part;
            }
          });
        });
      } else {
        setApiResponse(response);
        openErrorModal();
      }
    });
  };

  const editPart = (newPart, partId) => {
    setParts((oldParts) => {
      return oldParts.map((part) => {
        if (part.id === partId) {
          return newPart;
        }
        return part;
      });
    });
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
