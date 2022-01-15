import Modal from "react-modal";

export default function ApiErrorModal({ isModalOpen, closeModal, content }) {
  return (
    <div>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        // style={customStyles}
        contentLabel="Parts recieved modal"
      >
        <div
          className={
            "modal " + (isModalOpen ? "modal-active" : "modal-inactive")
          }
        >
          <div>{content.message}</div>
          <button onClick={closeModal}>Ok</button>
        </div>
      </Modal>
    </div>
  );
}
