import { createContext, useState } from "react";

export const RequestContext = createContext();

export default function Context({ children }) {
  const [request, setRequest] = useState({
    firstPartOfPhi: "testYear",
    secondPartOfPhi: "",
    year: "",
    month: "",
    day: "",
    entries: [],
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState({ modalName: "EntryModal" });

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const openPartsRecievedModal = (entryId, partId = null) => {
    if (partId === null) {
      setModalContent({ modalName: "PartsRecievedModal", entryId: entryId });
    } else {
      const entryClicked = request.entries.find((entry) => {
        return entry.id === entryId;
      });
      const initialPartValues = entryClicked.partsRecieved.find(
        (part) => part.id === partId
      );
      setModalContent({
        modalName: "PartsRecievedModal",
        entryId: entryId,
        initialPartValues: initialPartValues,
      });
    }
    openModal();
  };

  const openEntryModal = (id = null) => {
    if (id === null) {
      setModalContent({ modalName: "EntryModal" });
    } else {
      const initialValues = request.entries.find((entry) => entry.id === id);
      setModalContent({
        modalName: "EntryModal",
        initialValues: initialValues,
      });
    }
    openModal();
  };

  const openApiErrorModal = (error) => {
    setModalContent({ modalName: "ApiErrorModal", error: error });
    openModal();
  };

  const editPart = (entryId, partId, changedPart) => {
    setRequest((prevRequest) => {
      const entryHoldingPart = prevRequest.entries.find(
        (entry) => entry.id === entryId
      );

      const editedEntry = {
        ...entryHoldingPart,
        partsRecieved: entryHoldingPart.partsRecieved.map((part) => {
          if (part.id === partId) {
            return changedPart;
          }
          return part;
        }),
      };

      const allEntries = prevRequest.entries.map((entry) => {
        if (entry.id === entryId) {
          return editedEntry;
        }
        return entry;
      });
      return {
        ...prevRequest,
        entries: allEntries,
      };
    });
  };

  const deletePart = (entryId, partId) => {
    setRequest((prevRequest) => {
      const entryHoldingPart = prevRequest.entries.find(
        (entry) => entry.id === entryId
      );

      const changedParts = entryHoldingPart.partsRecieved.filter((part) => {
        return part.id !== partId;
      });

      const allEntries = prevRequest.entries.map((entry) => {
        if (entry.id === entryId) {
          return { ...entry, partsRecieved: changedParts };
        }
        return entry;
      });
      return { ...prevRequest, entries: allEntries };
    });
  };

  const context = {
    request: request,
    setRequest: setRequest,
    isModalOpen: isModalOpen,
    closeModal: closeModal,
    modalContent: modalContent,
    setModalContent: setModalContent,
    openApiErrorModal: openApiErrorModal,
    openEntryModal: openEntryModal,
    openPartsRecievedModal: openPartsRecievedModal,
    editPart: editPart,
    deletePart: deletePart,
  };

  return (
    <RequestContext.Provider value={context}>
      {children}
    </RequestContext.Provider>
  );
}
