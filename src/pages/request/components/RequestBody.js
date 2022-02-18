import Entry from "./Entry";
import { IoMdAdd } from "react-icons/io";
import { useEffect, useState } from "react";
import EntryModal from "modals/EntryModal";
import ApiErrorModal from "modals/ApiErrorModal";
import entryApi from "apis/entryApi";

function RequestBody({ entriesProp, request, setRequestEntries }) {
  const [entries, setEntries] = useState(entriesProp || []);
  const [initialValues, setInitialValues] = useState({});
  const [apiResponse, setApiResponse] = useState({ success: true });
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setRequestEntries(entries);
  }, [entries]);

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

  const addEntry = (newEntry) => {
    setEntries([...entries, newEntry]);
  };

  const deleteEntry = (entryId) => {
    entryApi.deleteEntry(entryId).then((response) => {
      if (response.success === true) {
        setEntries((oldEntries) => {
          return oldEntries.filter((entry) => {
            if (entry.id !== entryId) {
              return entry;
            }
          });
        });
      } else {
        setApiResponse(response);
        openErrorModal();
      }
    });
  };

  const editEntry = (newEntry, entryId) => {
    setEntries((oldEntries) => {
      return oldEntries.map((entry) => {
        if (entry.id === entryId) {
          return newEntry;
        }
        return entry;
      });
    });
  };

  return (
    <>
      {entries.map((entry) => {
        return (
          <Entry
            entry={entry}
            entries={entries}
            key={entry.id}
            setInitialValues={setInitialValues}
            setEntries={setEntries}
            openModal={openModal}
            deleteEntry={deleteEntry}
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
