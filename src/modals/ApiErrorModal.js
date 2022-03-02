import Modal from "modals/Modal";

function ApiErrorModal({
  isOpen,
  closeModal,
  error = { message: "", code: "" },
}) {
  return (
    <Modal isOpen={isOpen} closeModal={closeModal}>
      <h1>Open</h1>
      <h1>{error.code}</h1>
      <p>{error.message}</p>
    </Modal>
  );
}
export default ApiErrorModal;
