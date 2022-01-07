import "./request.scss";
import RequestHeader from "./RequestHeader";
import RequestBody from "./RequestBody";
import RequestFooter from "./RequestFooter";
import { useReactToPrint } from "react-to-print";
import { useRef, useState } from "react";
import ProtocolTableStructure from "../tables/protocol_table/ProtocolTableStructure";
import Test from "./Test";

import axios from "axios";
import Modal from "./Modal";
import uuid from "react-uuid";

function Request(props) {
  const comRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => comRef.current,
  });

  // const url = "https://dentoid-gleam.000webhostapp.com/requests";
  const url = "http://army-backend.com/requests";
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [postRequestState, setPostRequestState] = useState(null);

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

  const editEntry = (id) => {
    setIsModalOpen(true);
    // const rowBeingEdited = rows[index];
    // setInitialValues(rowBeingEdited);
  };

  const deleteEntry = (id) => {
    setRequest((prevRequest) => {
      const filteredEntries = prevRequest.entries.filter((entry) => {
        return entry.id !== id;
      });
      return { ...prevRequest, entries: filteredEntries };
    });
  };

  const addEntry = (event) => {
    event.preventDefault();
    const newEntry = {
      id: uuid(),
      nameNumber: event.target.nameNumber.value,
      name: event.target.name.value,
      mainPart: event.target.mainPart.value,
      amountOfOrder: parseInt(event.target.amountOfOrder.value),
      unitOfOrder: event.target.unitOfOrder.value,
      reasonOfOrder: parseInt(event.target.reasonOfOrder.value),
      priorityOfOrder: parseInt(event.target.priorityOfOrder.value),
      observations: event.target.observations.value,
    };
    setRequest((prevRequest) => {
      return { ...prevRequest, entries: [...prevRequest.entries, newEntry] };
    });
  };

  const makePostRequest = (event) => {
    event.preventDefault();
    setPostRequestState("loading");
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
    axios
      .post(url, request, { timeout: 20000 })
      .then(function (response) {
        setPostRequestState("sucess");
      })
      .catch(function (error) {
        setPostRequestState("failure");
      });
  };

  return (
    <>
      <div className="request">
        <table className="table table-striped">
          <RequestHeader />
          <RequestBody entries={request.entries} deleteEntry={deleteEntry} />
        </table>
        {
          //<RequestFooter request={request} />
        }
        <button onClick={handlePrint}>Print</button>
        <div style={{ display: "none" }}>
          <div ref={comRef}>
            <ProtocolTableStructure
              headerData={""}
              footerData={""}
              request={request}
            />
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
            {
              // <Test postRequestState={postRequestState} />
            }
            Submit
          </button>
        </form>
        <Modal
          addEntry={addEntry}
          setIsModalOpen={setIsModalOpen}
          isModalOpen={isModalOpen}
        />
      </div>
    </>
  );
}

export default Request;
