import axios from "axios";
import { IoMdAdd } from "react-icons/io";

import "./request.scss";
import RequestHeader from "./components/RequestHeader";
import RequestBody from "./components/RequestBody";
// import RequestFooter from "./components/RequestFooter";
import { useReactToPrint } from "react-to-print";
import { useEffect, useRef, useState } from "react";
import RequestTable from "tables/request_table/RequestTable";
import ApiCallState from "../common/ApiCallState";
import CustomModal from "modals/CustomModal";

function Request(props) {
  const comRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => comRef.current,
  });

  // const url = "https://dentoid-gleam.000webhostapp.com/requests";
  const url = "http://army-backend.com/requests";
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState({ modalName: "EntryModal" });
  const [postRequestState, setPostRequestState] = useState(null);

  const openEntryModal = (id = null) => {
    if (id === null) {
      setModalContent({ modalName: "EntryModal" });
    } else {
      const initialValues = request.entries.find((entry) => entry.id === id);
      setModalContent({
        modalName: "EntryModal",
        initialValues: initialValues,
      });
    }
    setIsModalOpen(true);
  };

  const openApiErrorModal = (error) => {
    setModalContent({ modalName: "ApiErrorModal", error: error });
    setIsModalOpen(true);
  };

  const openPartsRecievedModal = () => {
    setModalContent("PartsRecievedModal");
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

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

  const [request, setRequest] = useState(() => {
    return props.request
      ? props.request
      : {
          firstPartOfPhi: "",
          secondPartOfPhi: "",
          year: "",
          month: "",
          day: "",
          entries: [],
        };
  });

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
          <RequestBody
            entries={request.entries}
            deleteEntry={deleteEntry}
            openEntryModal={openEntryModal}
          />
          {
            //<RequestFooter request={request} />
          }
          <button onClick={handlePrint}>Print</button>
          <div style={{ display: "none" }}>
            <div ref={comRef}>
              <RequestTable headerData={""} footerData={""} request={request} />
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
          isModalOpen={isModalOpen}
          closeModal={closeModal}
          addEntry={addEntry}
          editEntry={editEntry}
          content={modalContent}
        />
      </div>
    </>
  );
}

export default Request;
