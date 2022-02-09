import { MdModeEditOutline } from "react-icons/md";
import { FiDelete } from "react-icons/fi";

export default function OnePartRecieved({
  part,
  setInitialValues,
  openModal,
  deletePart,
}) {
  const editClickedPart = () => {
    setInitialValues(part);
    openModal();
  };

  const deleteClickedPart = () => {
    deletePart(part.id);
  };
  return (
    <div
      key={part.id}
      style={{ display: "contents" }}
      className="parts-recieved__row"
    >
      <div>{part.dateRecieved}</div>
      <div>{part.pieNumber}</div>
      <div>{part.amountRecieved}</div>
      <div>{part.tab}</div>
      <div>{part.observation}</div>
      <div>{part.dateUsed}</div>
      <div>{part.amountUsed}</div>
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
