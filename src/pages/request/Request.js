import axios from "axios";
import { IoMdAdd } from "react-icons/io";

import "./request.scss";
import RequestHeader from "./components/RequestHeader";
import RequestBody from "./components/RequestBody";
// import RequestFooter from "./components/RequestFooter";
import { useReactToPrint } from "react-to-print";
import { useContext, useEffect, useRef, useState } from "react";
import RequestTable from "tables/request/RequestTable";
import ProtocolTable from "tables/protocol/ProtocolTable";
import ApiCallState from "../common/ApiCallState";
import CustomModal from "modals/CustomModal";

import { RequestContext } from "context/RequestContext";

function Request(props) {
  const {
    request,
    setRequest,
    modalContent,
    openApiErrorModal,
    openEntryModal,
  } = useContext(RequestContext);

  if (props.request) {
    setRequest(props.request);
  }

  const requestRef = useRef();
  const protocolRef = useRef();

  const handlePrintRequest = useReactToPrint({
    content: () => requestRef.current,
    pageStyle: `@page { margin: 0.5in 0.5in 0.5in 0.5in !important; }`,
  });

  const handlePrintProtocol = useReactToPrint({
    content: () => protocolRef.current,
    pageStyle: `@page { margin: 0.5in 0.5in 0.5in 0.5in !important; }`,
  });

  // const url = "https://dentoid-gleam.000webhostapp.com/requests";
  const url = "http://army-backend.com/requests";

  const [postRequestState, setPostRequestState] = useState(null);

  useEffect(() => {
    if (postRequestState === "loading") {
      axios
        .post(url, request, { timeout: 20000 })
        .then(function (response) {
          setPostRequestState("sucess");
        })
        .catch(function (error) {
          openApiErrorModal(error.toJSON());
          setPostRequestState("failure");
        });
    }
  }, [postRequestState]);

  const editEntry = (id, changedEntry) => {
    setRequest((prevRequest) => {
      const changedEntries = prevRequest.entries.map((entry) => {
        if (entry.id === id) {
          return changedEntry;
        }
        return entry;
      });
      return { ...prevRequest, entries: changedEntries };
    });
  };

  const deleteEntry = (id) => {
    setRequest((prevRequest) => {
      const filteredEntries = prevRequest.entries.filter((entry) => {
        return entry.id !== id;
      });
      return { ...prevRequest, entries: filteredEntries };
    });
  };

  const addEntry = (newEntry) => {
    newEntry.partsRecieved = [];
    setRequest((prevRequest) => {
      return { ...prevRequest, entries: [...prevRequest.entries, newEntry] };
    });
  };

  const addPartRecieved = (newPart, entryId) => {
    const entriesUpdated = request.entries.map((entry) => {
      if (entry.id === entryId) {
        entry.partsRecieved = [...entry.partsRecieved, newPart];
        return entry;
      }
      return entry;
    });
    setRequest((prevRequest) => {
      return { prevRequest, entries: entriesUpdated };
    });
  };

  const makePostRequest = (event) => {
    event.preventDefault();
    setRequest((prevRequest) => {
      return {
        ...prevRequest,
        firstPartOfPhi: parseInt(event.target.firstPartOfPhi.value),
        secondPartOfPhi: parseInt(event.target.secondPartOfPhi.value),
        year: parseInt(event.target.year.value),
        month: parseInt(event.target.month.value),
        day: parseInt(event.target.day.value),
      };
    });
    setPostRequestState("loading");
  };

  return (
    <>
      <div>
        <div className="request">
          <RequestHeader />
          <RequestBody entries={request.entries} deleteEntry={deleteEntry} />
          {
            //<RequestFooter request={request} />
          }
          <button onClick={handlePrintRequest}>Print Request</button>
          <button onClick={handlePrintProtocol}>Print Protocol</button>
          <div style={{ display: "none" }}>
            <div ref={requestRef}>
              <RequestTable headerData={""} footerData={""} request={request} />
            </div>
            <div ref={protocolRef}>
              <ProtocolTable
                headerData={""}
                footerData={""}
                request={request}
              />
            </div>
          </div>
        </div>

        <form
          onSubmit={makePostRequest}
          className={"requestForm"}
          id="requestForm"
        >
          <div className={"request__body"}>
            <div className={"request__data"}>
              <span>phi</span>
              <input type="number" name="firstPartOfPhi" />
              <input type="number" name="secondPartOfPhi" />
            </div>
            <div className={"request__data"}>
              <span>year</span>
              <input type="number" name="year" />
            </div>
            <div className={"request__data"}>
              <span>month</span>
              <input type="number" name="month" />
            </div>
            <div className={"request__data"}>
              <span>day</span>
              <input type="number" name="day" />
            </div>
          </div>
          <button type="submit" form="requestForm">
            <ApiCallState postRequestState={postRequestState} />
            Create
          </button>
        </form>
        <IoMdAdd className="table__button addRow" onClick={openEntryModal} />
        <CustomModal
          addEntry={addEntry}
          addPartRecieved={addPartRecieved}
          editEntry={editEntry}
          content={modalContent}
        />
      </div>
    </>
  );
}

export default Request;
