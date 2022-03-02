import { useLocation, useNavigate } from "react-router-dom";
import requestApi from "apis/requestApi";
import ApiErrorModal from "modals/ApiErrorModal";
import RequestModal from "modals/RequestModal";
import Request from "../Request";
import { useEffect, useRef, useState, useReducer } from "react";
import { useReactToPrint } from "react-to-print";
import ProtocolTable from "tables/protocol/ProtocolTable";
import RequestTable from "tables/request/RequestTable";
import uuid from "react-uuid";
import { requestsReducer, requestsDispatchMap } from "reducers/requestReducer";

function ListRequests() {
  const location = useLocation();
  const navigate = useNavigate();

  const [requests, requestsDispatch] = useReducer(
    requestsReducer,
    location.state || []
  );
  const requestActions = requestsDispatchMap(requestsDispatch);

  const [isOpen, setIsOpen] = useState(false);
  const [apiResponse, setApiResponse] = useState({ success: true });
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
  const [initialValues, setInitialValues] = useState({});

  const [isPrintRequest, setIsPrintRequest] = useState({
    value: false,
    resolve: undefined,
  });
  const [isPrintProtocol, setIsPrintProtocol] = useState({
    value: false,
    resolve: undefined,
  });

  const requestRef = useRef();
  const protocolRef = useRef();

  const deleteRequest = (requestId) => {
    requestApi.deleteRequest(requestId).then((response) => {
      if (response.success === true) {
        requestActions.deleteRequest(requestId);
      } else {
        setApiResponse(response);
        openErrorModal();
      }
    });
  };

  const editRequest = (newRequest, requestId) => {
    requestActions.editRequest(newRequest, requestId);
  };

  useEffect(() => {
    if (location.state !== requests) {
      navigate("", { state: requests });
    }
  }, [requests]);

  useEffect(() => {
    if (isPrintRequest.resolve) {
      isPrintRequest.resolve();
    }
  }, [isPrintRequest]);

  useEffect(() => {
    if (isPrintProtocol.resolve) {
      isPrintProtocol.resolve();
    }
  }, [isPrintProtocol]);

  const handlePrintRequests = useReactToPrint({
    content: () => requestRef.current,
    pageStyle: `@page {
    margin: 0.5in 0.5in 0.5in 0.5in !important; 
    size: landscape;
  }`,
    onAfterPrint: () => {
      setIsPrintRequest({ value: false, resolve: undefined });
    },
    onBeforeGetContent: () => {
      return new Promise((resolve) => {
        setIsPrintRequest({ value: true, resolve });
      });
    },
  });
  const handlePrintProtocols = useReactToPrint({
    content: () => protocolRef.current,
    pageStyle: `@page {
    margin: 0.5in 0.5in 0.5in 0.5in !important; 
    size: landscape;
  }`,
    onAfterPrint: () => {
      setIsPrintProtocol({ value: false, resolve: undefined });
    },
    onBeforeGetContent: () => {
      return new Promise((resolve) => {
        setIsPrintProtocol({ value: true, resolve });
      });
    },
  });

  const openModal = () => {
    setIsOpen(true);
  };
  const closeModal = () => {
    setInitialValues({});
    setIsOpen(false);
  };

  const openErrorModal = () => {
    setIsErrorModalOpen(true);
  };

  const closeErrorModal = () => {
    setIsErrorModalOpen(false);
  };
  return (
    <>
      <div className="request-list">
        {requests.map((request) => {
          return (
            <Request
              request={request}
              key={request.id}
              openModal={openModal}
              setInitialValues={setInitialValues}
              deleteRequest={deleteRequest}
              requestActions={requestActions}
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
          {isPrintRequest.value
            ? requests.map((request) => {
                return (
                  <>
                    <div>
                      <RequestTable
                        print={isPrintRequest}
                        key={uuid()}
                        request={request}
                      />
                    </div>
                    <div className="page-break" />
                  </>
                );
              })
            : null}
        </div>
        <div
          ref={protocolRef}
          className="print-container"
          style={{ margin: 0, paddign: 0 }}
        >
          {isPrintProtocol.value
            ? requests.map((request) => {
                return (
                  <>
                    <div>
                      <ProtocolTable
                        print={isPrintProtocol}
                        key={uuid()}
                        request={request}
                      />
                    </div>
                    <div className="page-break" />
                  </>
                );
              })
            : null}
        </div>
      </div>
    </>
  );
}

export default ListRequests;
