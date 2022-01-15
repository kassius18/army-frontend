import Modal from "react-modal";
import { useNavigate } from "react-router";

export default function ApiSuccessModal({ isModalOpen, closeModal, content }) {
  console.log("content is ", content);
  const navigate = useNavigate();

  const closeModalAndNavigate = () => {
    navigate("/vehicles");
  };

  return (
    <div>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModalAndNavigate}
        // style={customStyles}
        contentLabel="Parts recieved modal"
      >
        <div
          className={
            "modal " + (isModalOpen ? "modal-active" : "modal-inactive")
          }
        >
          <div>{content.message}</div>
          <button onClick={closeModalAndNavigate}>Ok</button>
        </div>
      </Modal>
    </div>
  );
}
