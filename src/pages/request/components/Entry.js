import PartsRecieved from "./PartsRecieved";
import { MdModeEditOutline } from "react-icons/md";
import { FiDelete } from "react-icons/fi";
import { AiOutlineDown } from "react-icons/ai";
import { useEffect, useState } from "react";
import DeleteModal from "modals/DeleteModal";

function Entry({
  entry,
  setInitialValues,
  openModal,
  deleteEntry,
  setEntries,
  entries,
}) {
  const [parts, setParts] = useState(entry.parts);
  const [isPartsHidden, setIsPartsHidden] = useState(true);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const closeDeleteModal = () => {
    setIsDeleteOpen(false);
  };

  const openDeleteModal = () => {
    setIsDeleteOpen(true);
  };

  useEffect(() => {
    setEntries(
      entries.map((oldEntry) => {
        if (oldEntry.id === entry.id) {
          return { ...entry, parts: parts };
        }
        return oldEntry;
      })
    );
  }, [parts]);

  const deleteClickedEntry = () => {
    deleteEntry(entry.id);
  };

  const editClickedEntry = () => {
    setInitialValues(entry);
    openModal();
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
        setEntriesParts={setParts}
      />
      <div className="grid-border-line">
        <DeleteModal
          isOpen={isDeleteOpen}
          closeModal={closeDeleteModal}
          deleteFcn={deleteClickedEntry}
          name="entry"
        />
      </div>
    </>
  );
}

export default Entry;
