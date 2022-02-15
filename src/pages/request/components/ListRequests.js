import { useLocation, useNavigate } from "react-router-dom";
import ApiErrorModal from "modals/ApiErrorModal";
import RequestModal from "modals/RequestModal";
import Request from "../Request";
import { useEffect, useRef, useState } from "react";
import requestApi from "apis/requestApi";
import { useReactToPrint } from "react-to-print";
import ProtocolTable from "tables/protocol/ProtocolTable";
import RequestTable from "tables/request/RequestTable";

function ListRequests() {
  const [isOpen, setIsOpen] = useState(false);
  const [apiResponse, setApiResponse] = useState({ success: true });
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const [requests, setRequests] = useState(location.state || []);
  const [initialValues, setInitialValues] = useState({});

  const requestRef = useRef();
  const protocolRef = useRef();

  const handlePrintRequests = useReactToPrint({
    content: () => requestRef.current,
    pageStyle: `@page {
    margin: 0.5in 0.5in 0.5in 0.5in !important; 
    size: landscape;
  }`,
  });
  const handlePrintProtocols = useReactToPrint({
    content: () => protocolRef.current,
    pageStyle: `@page {
    margin: 0.5in 0.5in 0.5in 0.5in !important; 
    size: landscape;
  }`,
  });

  useEffect(() => {
    if (location.state !== requests) {
      navigate("", { state: requests });
    }
  }, [requests]);

  const openModal = () => {
    setIsOpen(true);
  };
  const closeModal = () => {
    setIsOpen(false);
  };

  const openErrorModal = () => {
    setIsErrorModalOpen(true);
  };

  const closeErrorModal = () => {
    setIsErrorModalOpen(false);
  };

  const deleteRequest = (requestId) => {
    requestApi.deleteRequest(requestId).then((response) => {
      if (response.success === true) {
        setRequests((oldRequests) => {
          return oldRequests.filter((request) => {
            if (request.id !== requestId) {
              return request;
            }
          });
        });
      } else {
        setApiResponse(response);
        openErrorModal();
      }
    });
  };

  const editRequest = (newRequest, requestId) => {
    setRequests((oldRequests) => {
      return oldRequests.map((request) => {
        if (request.id === requestId) {
          return newRequest;
        }
        return request;
      });
    });
  };

  return (
    <>
      <div className="request-list">
        {requests.map((request) => {
          return (
            <Request
              requestProp={request}
              key={request.id}
              openModal={openModal}
              setInitialValues={setInitialValues}
              deleteRequest={deleteRequest}
              setRequests={setRequests}
              requests={requests}
            />
          );
        })}
      </div>
      <button onClick={handlePrintRequests}>Print all requests</button>
      <button onClick={handlePrintProtocols}>Print all protocols</button>
      <RequestModal
        isOpen={isOpen}
        closeModal={closeModal}
        editRequest={editRequest}
        initialValues={initialValues}
      />
      <ApiErrorModal
        isModalOpen={isErrorModalOpen}
        closeModal={closeErrorModal}
        error={apiResponse.error}
      />
      <div
        style={{
          visibility: "hidden",
          position: "absolute",
          zIndex: "-100",
        }}
      >
        <div
          ref={requestRef}
          className="print-container"
          style={{ margin: 0, paddign: 0 }}
        >
          {requests.map((request) => {
            return (
              <>
                <div>
                  <RequestTable key={request.id} request={request} />
                </div>
                <div className="page-break" />
              </>
            );
          })}
        </div>
        <div
          ref={protocolRef}
          className="print-container"
          style={{ margin: 0, paddign: 0 }}
        >
          {requests.map((request) => {
            return (
              <>
                <div>
                  <ProtocolTable key={request.id} request={request} />
                </div>
                <div className="page-break" />
              </>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default ListRequests;
