import Entry from "./Entry";
import { IoMdAdd } from "react-icons/io";
import entryApi from "apis/entryApi";

function RequestBody({ entries, requestActions, request, modalActions }) {
  const openModal = () => {
    modalActions.openEntryModal(
      modalActions.closeModal,
      requestActions.addEntry,
      requestActions.editEntry,
      request
    );
  };

  const deleteEntry = (entryId) => {
    entryApi.deleteEntry(entryId).then((response) => {
      if (response.success === true) {
        requestActions.deleteEntry(entryId);
      } else {
        modalActions.openApiErrorModal(modalActions.closeModal, response.error);
      }
    });
  };

  return (
    <>
      {entries.map((entry) => {
        return (
          <Entry
            entry={entry}
            key={entry.id}
            deleteEntry={deleteEntry}
            requestActions={requestActions}
            modalActions={modalActions}
          />
        );
      })}
      <IoMdAdd className="table__button addRow" onClick={openModal} />
    </>
  );
}

export default RequestBody;
