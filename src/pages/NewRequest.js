import "./request.scss";
import axios from "axios";
import RequestHeader from "./RequestHeader";
import Entry from "./Entry";
import Modal from "./Modal";
import { useState } from "react";
import uuid from "react-uuid";

function NewRequest() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [request, setRequest] = useState({
    firstPartOfPhi: "",
    secondPartOfPhi: "",
    year: "",
    month: "",
    day: "",
    entries: [],
  });

  // TODO:
  // edit the entry being changed based on the id
  // test a save request post

  // do a find
  // test the last model
  // create the last model

  // figure out printing
  //
  // <16-12-21, yourname> //

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
      .post("http://army-backend.com/requests", request)
      // .post("http://localhost:8080/requests", request)
      .then(function (response) {
        console.log("sucess");
        console.log(response.data);
        console.log(response);
        console.log(request);
      })
      .catch(function (error) {
        console.log("didnt go through");
        console.log(error);
      });
  };

  return (
    <>
      <div className="request">
        <table className="table table-striped">
          <RequestHeader />
          <tbody>
            {request.entries.map((entry) => {
              return (
                <Entry
                  entry={entry}
                  editEntry={editEntry}
                  deleteEntry={deleteEntry}
                  key={entry.id}
                />
              );
            })}
          </tbody>
        </table>
        <form onSubmit={makePostRequest} className={"requestForm"}>
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
            <button type="submit">Submit</button>
          </div>
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

export default NewRequest;
