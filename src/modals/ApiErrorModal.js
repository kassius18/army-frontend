import Modal from "react-modal";

function ApiErrorModal({ isModalOpen, closeModal, error }) {
  console.log("error", error);
  return (
    <Modal
      isOpen={isModalOpen}
      onRequestClose={closeModal}
      // style={customStyles}
      contentLabel="Entry Modal"
    >
      <h1>{error.status}</h1>
      <p>{error.message}</p>
    </Modal>
  );
}
export default ApiErrorModal;
