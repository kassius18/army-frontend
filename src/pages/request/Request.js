import "./request.scss";
import RequestHeader from "./components/RequestHeader";
import RequestBody from "./components/RequestBody";
import { useReactToPrint } from "react-to-print";
import { useEffect, useRef, useState } from "react";
import ProtocolTable from "tables/protocol/ProtocolTable";
import RequestTable from "tables/request/RequestTable";
import { useLocation, useNavigate } from "react-router";

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
  const [hasChanged, setHasChanged] = useState(false);
  const [entries, setEntries] = useState(request.entries);

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
            // display: "none",
            visibility: "hidden",
            position: "absolute",
            zIndex: "-100",
          }}
        >
          <div ref={requestRef}>{<RequestTable request={request} />}</div>
          <div ref={protocolRef}>{<ProtocolTable request={request} />}</div>
        </div>
        <div className="request">
          <RequestHeader />
          <RequestBody
            entriesProp={entries}
            request={request}
            setRequestEntries={setEntries}
          />
          <button onClick={handlePrintRequest}>Print Request</button>
          <button onClick={handlePrintProtocol}>Print Protocol</button>
        </div>
        <div className={"request__body"}>
          <div className={"request__data"}>
            <span>phi</span>
            <span>{request.firstPartOfPhi}</span>
            <span>{request.secondPartOfPhi}</span>
          </div>
          <div className={"request__data"}>
            <span>year</span>
            <span>{request.year}</span>
          </div>
          <div className={"request__data"}>
            <span>month</span>
            <span>{request.month}</span>
          </div>
          <div className={"request__data"}>
            <span>day</span>
            <span>{request.day}</span>
          </div>
        </div>
        <button onClick={deleteClickedRequest}>Delete Request</button>
        <button onClick={editClickedRequest}>Update Request</button>
      </div>
    </>
  );
}

export default Request;
