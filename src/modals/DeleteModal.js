import Modal from "./Modal";
import { AiOutlineClose } from "react-icons/ai";

function DeleteModal({ closeModal, deleteFcn, name = "" }) {
  const verifyDeleting = () => {
    deleteFcn();
    closeModal();
  };

  return (
    <div>
      <Modal closeModal={closeModal}>
        <div>
          <AiOutlineClose
            style={{ color: "red" }}
            className="modal__cancel"
            onClick={closeModal}
          />
          <div>Are you sure you want to delete this {name}</div>
          <button onClick={verifyDeleting}>Confirm</button>
        </div>
      </Modal>
    </div>
  );
}
export default DeleteModal;
