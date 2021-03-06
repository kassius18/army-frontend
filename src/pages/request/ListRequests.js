import { useLocation, useNavigate } from "react-router-dom";
import ModalWrapper from "modals/ModalWrapper";
import Request from "./components/Request";
import { useEffect, useRef, useState, useReducer } from "react";
import { useReactToPrint } from "react-to-print";
import ProtocolTable from "tables/protocol/ProtocolTable";
import RequestTable from "tables/request/RequestTable";
import { requestsReducer, requestsDispatchMap } from "reducers/requestReducer";
import { modalReducer, modalDispatchMap } from "reducers/modalReducer";

function ListRequests() {
  const location = useLocation();
  const navigate = useNavigate();

  const [requests, requestsDispatch] = useReducer(
    requestsReducer,
    location.state || []
  );
  const [modal, modalDispatch] = useReducer(modalReducer, "");
  const requestActions = requestsDispatchMap(requestsDispatch);
  const modalActions = modalDispatchMap(modalDispatch);

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

  useEffect(() => {
    if (JSON.stringify(location.state || []) !== JSON.stringify(requests)) {
      navigate("", { state: requests });
    }
  }, [requests, navigate, location.state]);

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

  return (
    <>
      <button onClick={handlePrintRequests}>Print all requests</button>
      <button onClick={handlePrintProtocols}>Print all protocols</button>
      <div className="request-list">
        {requests.map((request) => {
          return (
            <Request
              request={request}
              key={request.id}
              requestActions={requestActions}
              modalActions={modalActions}
            />
          );
        })}
      </div>
      <ModalWrapper modal={modal} modalActions={modalActions} />
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
                  <div key={request.id}>
                    <div>
                      <RequestTable
                        print={isPrintRequest.value}
                        request={request}
                      />
                    </div>
                    <div className="page-break" />
                  </div>
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
                  <div key={request.id}>
                    <div>
                      <ProtocolTable
                        print={isPrintProtocol}
                        request={request}
                      />
                    </div>
                    <div className="page-break" />
                  </div>
                );
              })
            : null}
        </div>
      </div>
    </>
  );
}

export default ListRequests;
