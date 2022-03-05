import "./request.scss";
import RequestHeader from "./components/RequestHeader";
import RequestBody from "./components/RequestBody";
import { useReactToPrint } from "react-to-print";
import { useEffect, useRef, useState } from "react";
import ProtocolTable from "tables/protocol/ProtocolTable";
import RequestTable from "tables/request/RequestTable";
import { AiOutlineDown } from "react-icons/ai";
import { DELETE_ACTIONS } from "modals/DeleteModal";
import uuid from "react-uuid";

function Request({ request, requestActions, modalActions }) {
  const entries = request.entries;

  const [showRequest, setShowRequest] = useState(false);
  const [isPrintRequest, setIsPrintRequest] = useState({
    value: false,
    resolve: undefined,
  });
  const [isPrintProtocol, setIsPrintProtocol] = useState({
    value: false,
    resolve: undefined,
  });

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

  const openDeleteModal = () => {
    modalActions.openDeleteModal(
      modalActions.closeModal,
      modalActions,
      requestActions,
      request.id,
      DELETE_ACTIONS.DELETE_REQUEST
    );
  };

  const copyRequest = () => {
    modalActions.openRequestModal(
      requestActions.editRequest,
      () => {},
      modalActions.closeModal,
      { ...request, copy: true }
    );
  };

  const toggleRequestVisibility = () => {
    setShowRequest(!showRequest);
  };

  const printRef = useRef();
  const requestRef = useRef();
  const protocolRef = useRef();

  const handlePrintRequest = useReactToPrint({
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

  const handlePrintProtocol = useReactToPrint({
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

  const editClickedRequest = () => {
    modalActions.openRequestModal(
      requestActions.editRequest,
      () => {},
      modalActions.closeModal,
      request
    );
  };

  return (
    <>
      <div>
        <div
          ref={printRef}
          style={{
            visibility: "hidden",
            position: "absolute",
            zIndex: "-100",
          }}
        >
          <div ref={requestRef}>
            {isPrintRequest ? (
              <RequestTable
                key={uuid()}
                print={isPrintRequest}
                request={request}
              />
            ) : null}
          </div>
          <div ref={protocolRef}>
            {isPrintProtocol ? (
              <ProtocolTable
                print={isPrintProtocol}
                key={uuid()}
                request={request}
              />
            ) : null}
          </div>
        </div>
        <AiOutlineDown
          className="table__button"
          onClick={toggleRequestVisibility}
        />
        <div className={"request-wrapper" + (showRequest ? "" : " hidden")}>
          <div className={"request"}>
            <RequestHeader />
            <RequestBody
              entries={entries}
              request={request}
              requestActions={requestActions}
              modalActions={modalActions}
            />
          </div>
        </div>
        <div className={"request__body-wrapper"}>
          <div className={"request__body"}>
            <div className={"request__data"}>
              <span>Φ</span>
              <span className="firstPartOfPhi">{request.firstPartOfPhi}</span>
              <span style={{ marginRight: "2rem" }}>Σχέδιο</span>
              <span>{request.secondPartOfPhi}</span>
            </div>
            <div className={"request__data"}>
              <span>Έτος</span>
              <span>{request.year}</span>
            </div>
            <div className={"request__data"}>
              <span>Μήνας</span>
              <span>{request.month}</span>
            </div>
            <div className={"request__data"}>
              <span>Μέρα</span>
              <span>{request.day}</span>
            </div>
          </div>
          <button onClick={handlePrintRequest}>Αποθήκευση Αίτησης</button>
          <button onClick={handlePrintProtocol}>Αποθήκευση Πρωτόκολλου</button>
          <button onClick={openDeleteModal}>Διαγραφή Αίτησης</button>
          <button onClick={copyRequest}>Αντιγραφή Αίτησης</button>
          <button onClick={editClickedRequest}>Τροποποίηση Αίτησης</button>
        </div>
      </div>
    </>
  );
}

export default Request;
