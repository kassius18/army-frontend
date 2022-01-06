import "./request.scss";

import { MdModeEditOutline } from "react-icons/md";
import { FiDelete } from "react-icons/fi";

function Entry({ entry, editEntry, deleteEntry }) {
  const deleteEntryOnClick = () => {
    deleteEntry(entry.id);
  };

  const editEntryOnClick = () => {
    deleteEntry(entry.id);
  };

  return (
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
        <MdModeEditOutline onClick={editEntryOnClick} />
        <FiDelete className="table__button" onClick={deleteEntryOnClick} />
      </td>
    </tr>
  );
}

export default Entry;
