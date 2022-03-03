import Entry from "./Entry";
import { IoMdAdd } from "react-icons/io";

function RequestBody({ entries, requestActions, request, modalActions }) {
  const openModal = () => {
    modalActions.openEntryModal(
      modalActions.closeModal,
      requestActions.addEntry,
      requestActions.editEntry,
      request
    );
  };

  return (
    <>
      {entries.map((entry) => {
        return (
          <Entry
            entry={entry}
            key={entry.id}
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
