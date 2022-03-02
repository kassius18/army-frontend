import Entry from "./Entry";
import { IoMdAdd } from "react-icons/io";
import { useState } from "react";
import { ACTIONS } from "./ListRequests";
import EntryModal from "modals/EntryModal";
import ApiErrorModal from "modals/ApiErrorModal";
import entryApi from "apis/entryApi";

function RequestBody({ entries, actions, request }) {
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

  const addEntry = (newEntry) => {
    actions.addEntry(newEntry, request.id);
  };

  const deleteEntry = (entryId) => {
    entryApi.deleteEntry(entryId).then((response) => {
      if (response.success === true) {
        actions.deleteEntry(entryId);
      } else {
        setApiResponse(response);
        openErrorModal();
      }
    });
  };

  const editEntry = (newEntry, entryId) => {
    actions.editEntry(newEntry, entryId);
  };

  return (
    <>
      {entries.map((entry) => {
        return (
          <Entry
            entry={entry}
            key={entry.id}
            setInitialValues={setInitialValues}
            openModal={openModal}
            deleteEntry={deleteEntry}
            actions={actions}
          />
        );
      })}
      <IoMdAdd className="table__button addRow" onClick={openModal} />
      <EntryModal
        isOpen={isOpen}
        closeModal={closeModal}
        addEntry={addEntry}
        editEntry={editEntry}
        initialValues={initialValues}
        request={request}
      />
      <ApiErrorModal
        isModalOpen={isErrorModalOpen}
        closeModal={closeErrorModal}
        error={apiResponse.error}
      />
    </>
  );
}

export default RequestBody;
