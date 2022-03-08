import uuid from "react-uuid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDeleteLeft, faPencil } from "@fortawesome/free-solid-svg-icons";
import { DELETE_ACTIONS } from "modals/DeleteModal";

export default function OnePartRecieved({
  part,
  modalActions,
  requestActions,
}) {
  const openDeleteModal = () => {
    modalActions.openDeleteModal(
      modalActions.closeModal,
      modalActions,
      requestActions,
      part.id,
      DELETE_ACTIONS.DELETE_PART
    );
  };

  const editClickedPart = () => {
    modalActions.openPartModal(
      modalActions.closeModal,
      requestActions.addPart,
      requestActions.editPart,
      {},
      part
    );
  };

  return (
    <div
      key={uuid()}
      style={{ display: "contents" }}
      className="parts-recieved__row"
    >
      <div>{part.dateRecieved}</div>
      <div>{part.pieNumber}</div>
      <div>{part.amountRecieved}</div>
      <div>{part.tabUsed}</div>
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
          <FontAwesomeIcon
            icon={faPencil}
            className="table__button"
            onClick={editClickedPart}
          />
          <FontAwesomeIcon
            icon={faDeleteLeft}
            className="table__button"
            onClick={openDeleteModal}
          />
        </div>
      </div>
    </div>
  );
}
