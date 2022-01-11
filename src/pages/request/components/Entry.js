import PartsRecieved from "./PartsRecieved";

import { MdModeEditOutline } from "react-icons/md";
import { FiDelete } from "react-icons/fi";
import { AiOutlineDown } from "react-icons/ai";
import { useState } from "react";

function Entry({ entry, deleteEntry, openEntryModal }) {
  const [isPartsHidden, setIsPartsHidden] = useState(false);

  const deleteClickedEntry = () => {
    deleteEntry(entry.id);
  };

  const editClickedEntry = () => {
    openEntryModal(entry.id);
  };

  const togglePartsVisibility = () => {
    setIsPartsHidden(!isPartsHidden);
  };

  return (
    <>
      <div className="request__entry">
        <div>{entry.nameNumber}</div>
        <div>{entry.name}</div>
        <div>{entry.mainPart}</div>
        <div>{entry.amountOfOrder}</div>
        <div>{entry.unitOfOrder}</div>
        <div>{entry.reasonOfOrder}</div>
        <div>{entry.priorityOfOrder}</div>
        <div>{entry.observations}</div>
        <div className="edit">
          <MdModeEditOutline
            className="table__button"
            onClick={editClickedEntry}
          />
          <FiDelete className="table__button" onClick={deleteClickedEntry} />
          <AiOutlineDown
            className="table__button"
            onClick={togglePartsVisibility}
          />
        </div>
      </div>
      <PartsRecieved parts={entry.partsRecieved} isHidden={isPartsHidden} />
      <div className="grid-border-line"></div>
    </>
  );
}

export default Entry;
