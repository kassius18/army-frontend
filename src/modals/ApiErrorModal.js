import Modal from "modals/Modal";

function ApiErrorModal({ closeModal, error = { message: "", code: "" } }) {
  return (
    <Modal closeModal={closeModal}>
      <h1>Open</h1>
      <h1>{error.code}</h1>
      <p>{error.message}</p>
    </Modal>
  );
}
export default ApiErrorModal;
