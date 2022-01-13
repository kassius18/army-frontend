import { MdModeEditOutline } from "react-icons/md";
import { FiDelete } from "react-icons/fi";
import { EntryContext } from "context/EntryContext";
import { RequestContext } from "context/RequestContext";
import { useContext } from "react";

export default function OnePartRecieved({ part }) {
  const { entryId } = useContext(EntryContext);
  const { openPartsRecievedModal, deletePart } = useContext(RequestContext);
  const editClickedPart = () => {
    openPartsRecievedModal(entryId, part.id);
  };
  const deleteClickedPart = () => {
    deletePart(entryId, part.id);
  };
  return (
    <div
      key={part.id}
      style={{ display: "contents" }}
      className="parts-recieved__row"
    >
      <div>{part.date}</div>
      <div>{part.pieNumber}</div>
      <div>{part.amountRecieved}</div>
      <div>{part.tab}</div>
      <div>{part.observation}</div>
      <div
        style={{
          display: "flex",
          justifyContent: "left",
        }}
      >
        <div
          className="actions"
          style={{ display: "flex", flexDirection: "row", padding: "1rem" }}
        >
          <MdModeEditOutline
            style={{ fontSize: "2rem", fill: "red", cursor: "pointer" }}
            onClick={() => {
              editClickedPart(part.id);
            }}
          />
          <FiDelete className="table__button" onClick={deleteClickedPart} />
        </div>
      </div>
    </div>
  );
}
