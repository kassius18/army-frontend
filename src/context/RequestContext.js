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

  const openPartsRecievedModal = (entryId) => {
    setModalContent({ modalName: "PartsRecievedModal", entryId: entryId });
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
  };

  return (
    <RequestContext.Provider value={context}>
      {children}
    </RequestContext.Provider>
  );
}
