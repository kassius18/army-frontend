import Modal from "modals/Modal";

function NotFoundModal({ closeModal }) {
  return (
    <div>
      <Modal closeModal={closeModal}>
        <div>
          <div className="modal__confirmation">Δεν Βρέθηκε Καμία Άιτηση</div>
          <button onClick={closeModal}>Ok</button>
        </div>
      </Modal>
    </div>
  );
}

export default NotFoundModal;
