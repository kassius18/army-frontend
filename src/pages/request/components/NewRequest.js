import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import RequestModal from "modals/RequestModal";

function NewRequest() {
  const [request, setRequest] = useState({});
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (request.firstPartOfPhi && request.year) {
      navigate("/requests/" + request.firstPartOfPhi + "/" + request.year, {
        state: [request],
      });
    }
  }, [request]);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const addRequest = (newRequest) => {
    setRequest(newRequest);
  };

  return (
    <>
      <div>
        <button onClick={openModal}>Crete Request</button>
      </div>
      <RequestModal
        isOpen={isOpen}
        closeModal={closeModal}
        addRequest={addRequest}
      />
    </>
  );
}

export default NewRequest;
