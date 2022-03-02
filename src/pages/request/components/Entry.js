import PartsRecieved from "./PartsRecieved";
import { MdModeEditOutline } from "react-icons/md";
import { FiDelete } from "react-icons/fi";
import { AiOutlineDown } from "react-icons/ai";
import { useState } from "react";

function Entry({ entry, deleteEntry, requestActions, modalActions }) {
  const [isPartsHidden, setIsPartsHidden] = useState(true);

  const openDeleteModal = () => {
    modalActions.openDeleteModal(
      modalActions.closeModal,
      deleteClickedEntry,
      "entry"
    );
  };

  const deleteClickedEntry = () => {
    deleteEntry(entry.id);
  };

  const editClickedEntry = () => {
    modalActions.openEntryModal(
      modalActions.closeModal,
      requestActions.addEntry,
      requestActions.editEntry,
      {},
      entry
    );
  };

  const togglePartsVisibility = () => {
    setIsPartsHidden(!isPartsHidden);
  };
  return (
    <>
      <div
        className={
          entry.consumableId === ""
            ? "request__entry"
            : "request__entry consumable"
        }
      >
        <div>{entry.nameNumber}</div>
        <div>{entry.name}</div>
        <div>{entry.mainPart}</div>
        <div>{entry.amountOfOrder}</div>
        <div>{entry.unitOfOrder}</div>
        <div>{entry.reasonOfOrder}</div>
        <div>{entry.priorityOfOrder}</div>
        <div>{entry.consumableId}</div>
        <div>{entry.observations}</div>
        <div className="edit">
          <MdModeEditOutline
            className="table__button"
            onClick={editClickedEntry}
          />
          <FiDelete className="table__button" onClick={openDeleteModal} />
          <AiOutlineDown
            className="table__button"
            onClick={togglePartsVisibility}
          />
        </div>
      </div>
      <PartsRecieved
        parts={entry.parts}
        isHidden={isPartsHidden}
        entryId={entry.id}
        requestActions={requestActions}
        modalActions={modalActions}
      />
      <div className="grid-border-line"></div>
    </>
  );
}

export default Entry;
