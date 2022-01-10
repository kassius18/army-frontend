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
      <tr height="70px">
        <td>{entry.nameNumber}</td>
        <td>{entry.name}</td>
        <td>{entry.mainPart}</td>
        <td>{entry.amountOfOrder}</td>
        <td>{entry.unitOfOrder}</td>
        <td>{entry.reasonOfOrder}</td>
        <td>{entry.priorityOfOrder}</td>
        <td>{entry.observations}</td>
        <td className="edit">
          <MdModeEditOutline
            className="table__button"
            onClick={editClickedEntry}
          />
          <FiDelete className="table__button" onClick={deleteClickedEntry} />
          <AiOutlineDown
            className="table__button"
            onClick={togglePartsVisibility}
          />
        </td>
      </tr>
      <PartsRecieved parts={entry.partsRecieved} isHidden={isPartsHidden} />
    </>
  );
}

export default Entry;
