import "./request.scss";
import RequestHeader from "./components/RequestHeader";
import RequestBody from "./components/RequestBody";
import { useReactToPrint } from "react-to-print";
import { useEffect, useRef, useState } from "react";
import ProtocolTable from "tables/protocol/ProtocolTable";
import RequestTable from "tables/request/RequestTable";
import { useLocation, useNavigate } from "react-router";
import { AiOutlineDown } from "react-icons/ai";

function Request({
  requestProp,
  openModal,
  deleteRequest,
  setInitialValues,
  setRequests,
  requests,
}) {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [request, setRequest] = useState(requestProp || []);
  const [showRequest, setShowRequest] = useState(false);
  const [hasChanged, setHasChanged] = useState(false);
  const [entries, setEntries] = useState(request.entries);

  const copyRequest = () => {
    setInitialValues({ ...request, copy: true });
    openModal();
  };

  const toggleRequestVisibility = () => {
    setShowRequest(!showRequest);
  };

  useEffect(() => {
    setRequest(requestProp);
    setEntries(requestProp.entries);
  }, [requestProp]);

  useEffect(() => {
    if (hasChanged) {
      setHasChanged(false);
      setRequests(
        requests.map((oldRequest) => {
          if (oldRequest.id === request.id) {
            return request;
          }
          return oldRequest;
        })
      );

      navigate("", {
        state: state.map((requestFromState) => {
          if (requestFromState.id === request.id) {
            return request;
          }
          return requestFromState;
        }),
      });
    }
  }, [hasChanged]);
  useEffect(() => {
    setRequest({ ...request, entries: entries });
    setHasChanged(true);
  }, [entries]);

  const printRef = useRef();
  const requestRef = useRef();
  const protocolRef = useRef();

  const handlePrintRequest = useReactToPrint({
    content: () => requestRef.current,
    pageStyle: `@page {
    margin: 0.5in 0.5in 0.5in 0.5in !important; 
    size: landscape;
  }`,
  });
  const handlePrintProtocol = useReactToPrint({
    content: () => protocolRef.current,
    onBeforePrint: () => {
      console.log("content is");
      printRef.current.style.display = "block";
      console.log(protocolRef.current.clientHeight);
      printRef.current.style.zIndex = "-100";
      printRef.current.style.position = "absolute";
    },
    pageStyle: `@page {
    margin: 0.5in 0.5in 0.5in 0.5in !important;
    size: landscape;
  }`,
  });

  const editClickedRequest = () => {
    setInitialValues(request);
    openModal();
  };

  const deleteClickedRequest = () => {
    deleteRequest(request.id);
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
          <div ref={requestRef}>{<RequestTable request={request} />}</div>
          <div ref={protocolRef}>{<ProtocolTable request={request} />}</div>
        </div>
        <AiOutlineDown
          className="table__button"
          onClick={toggleRequestVisibility}
        />
        <div className={"request " + (showRequest ? "" : "hidden")}>
          <RequestHeader />
          <RequestBody
            entriesProp={entries}
            request={request}
            setRequestEntries={setEntries}
          />
          <button onClick={handlePrintRequest}>Αποθήκευση Αίτησης</button>
          <button onClick={handlePrintProtocol}>Αποθήκευση Πρωτόκολλου</button>
        </div>
        <div className={"request__body"}>
          <div className={"request__data"}>
            <span>Φ</span>
            <span className="firstPartOfPhi">{request.firstPartOfPhi}</span>
            <span>Σχήμα</span>
            <span>{request.secondPartOfPhi}</span>
          </div>
          <div className={"request__data"}>
            <span>Aίτος</span>
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
        <button onClick={deleteClickedRequest}>Διαγραφή Αίτησης</button>
        <button onClick={copyRequest}>Αντιγραφή Αίτησης</button>
        <button onClick={editClickedRequest}>Τροποποίηση Αίτησης</button>
      </div>
    </>
  );
}

export default Request;
