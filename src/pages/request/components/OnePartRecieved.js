import { MdModeEditOutline } from "react-icons/md";
import { FiDelete } from "react-icons/fi";
import uuid from "react-uuid";
import DeleteModal from "modals/DeleteModal";
import { useState } from "react";

export default function OnePartRecieved({
  part,
  setInitialValues,
  openModal,
  deletePart,
}) {
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const closeDeleteModal = () => {
    setIsDeleteOpen(false);
  };

  const openDeleteModal = () => {
    setIsDeleteOpen(true);
  };

  const editClickedPart = () => {
    setInitialValues(part);
    openModal();
  };

  const deleteClickedPart = () => {
    deletePart(part.id);
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
          <MdModeEditOutline
            style={{ fontSize: "2rem", fill: "red", cursor: "pointer" }}
            onClick={() => {
              editClickedPart(part.id);
            }}
          />
          <FiDelete className="table__button" onClick={openDeleteModal} />
          <DeleteModal
            isOpen={isDeleteOpen}
            closeModal={closeDeleteModal}
            deleteFcn={deleteClickedPart}
            name="part"
          />
        </div>
      </div>
    </div>
  );
}
