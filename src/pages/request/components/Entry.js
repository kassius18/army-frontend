import PartsRecieved from "./PartsRecieved";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleDown,
  faDeleteLeft,
  faPencil,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { DELETE_ACTIONS } from "modals/DeleteModal";

function Entry({ entry, requestActions, modalActions }) {
  const [isPartsHidden, setIsPartsHidden] = useState(true);

  const openDeleteModal = () => {
    modalActions.openDeleteModal(
      modalActions.closeModal,
      modalActions,
      requestActions,
      entry.id,
      DELETE_ACTIONS.DELETE_ENTRY
    );
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
          <FontAwesomeIcon
            icon={faPencil}
            className="table__button"
            onClick={editClickedEntry}
          />
          <FontAwesomeIcon
            icon={faDeleteLeft}
            className="table__button"
            onClick={openDeleteModal}
          />
          <FontAwesomeIcon
            icon={faAngleDown}
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
