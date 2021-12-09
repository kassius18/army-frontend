import "./request.scss";
import HiddenRows from "./HiddenRows";
import { IoMdAdd } from "react-icons/io";
import { AiOutlineClose } from "react-icons/ai";
import { MdModeEditOutline, MdOutlineExpandMore } from "react-icons/md";
import { FiDelete } from "react-icons/fi";

import { useRef, useState } from "react";
import { useContextRows } from "./../App";
import axios from "axios";

function NewRequest({ initialTable }) {
  // todo this is for when the inputs for the table are loaded from the backend const [tableRows, setTableRows] = useState(initialTable);
  const modal = useRef(null);
  const [rows, setRows] = useState([]);
  const [firstPartOfPhi, setFirstPartOfPhi] = useState("");
  const [secondPartOfPhi, setSecondPartOfPhi] = useState("");
  const [year, setYear] = useState("");
  const [month, setMonth] = useState("");
  const [day, setDay] = useState("");
  const [requestData, setRequestData] = useState({});
  const [initialValues, setInitialValues] = useState({});

  // const [indexOfRowBeingEdited, setIndexOfRowBeingEdited] = useState
  const makePostRequest = () => {
    const rowsWithPhiAndYear = rows.map((row) => {
      row.firstPartOfPhi = firstPartOfPhi;
      row.secondPartOfPhi = secondPartOfPhi;
      row.year = year;
      return row;
    });

    const request = {
      requests: [
        {
          firstPartOfPhi: firstPartOfPhi,
          secondPartOfPhi: secondPartOfPhi,
          year: year,
          month: month,
          day: day,
          entries: rowsWithPhiAndYear,
        },
      ],
    };
    axios
      // .post("http://army-backend.com/requests", {
      .post("http://localhost:8080/requests", request)
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const editRow = (index) => {
    toggleModal();
    const rowBeingEdited = rows[index];
    setInitialValues(rowBeingEdited);
  };

  const deleteRow = (index) => {
    setRows(
      rows.filter((row) => {
        return row.index !== index;
      })
    );
  };

  const toggleHiddenTable = (index) => {
    const clickedRow = rows.find((row) => {
      return row.index === index;
    });
    clickedRow.isHidden = !clickedRow.isHidden;
    setRows(
      rows.map((row) => {
        if (row.index === index) {
          return clickedRow;
        }
        return row;
      })
    );
  };

  const addRow = (event, newRow) => {
    setInitialValues({});
    modal.current.classList.toggle("modal-inactive");
  };

  const handleAddSubmit = (event) => {
    event.preventDefault();
    const newRow = {
      nameNumber: event.target.nameNumber.value,
      nameNumber: event.target.nameNumber.value,
      name: event.target.name.value,
      mainPart: event.target.mainPart.value,
      amountOfOrder: parseInt(event.target.amountOfOrder.value),
      unitOfOrder: event.target.unitOfOrder.value,
      reasonOfOrder: parseInt(event.target.reasonOfOrder.value),
      priorityOfOrder: parseInt(event.target.priorityOfOrder.value),
      observations: event.target.observations.value,
    };
    if (
      //checks if object is empty
      Object.keys(initialValues).length === 0 &&
      initialValues.constructor === Object
    ) {
      setRows([...rows, newRow]);
    } else {
      setRows(
        rows.map((row) => {
          if (row.index === initialValues.index) {
            return newRow;
          }
          return row;
        })
      );
    }
    toggleModal();
  };

  const toggleModal = () => {
    modal.current.classList.toggle("modal-inactive");
  };

  return (
    <div className="request">
      <table className="table table-striped">
        <thead>
          <tr height="70px">
            <th scope="col">Αριθμος Ονομαστικου</th>
            <th scope="col">Ονομασια</th>
            <th scope="col">Κυριο Υλικο</th>
            <th scope="col">Αιτουμενη Ποσοτητα</th>
            <th scope="col">MM</th>
            <th scope="col">Αιτολογια</th>
            <th scope="col">Προτεραιοτητα</th>
            <th scope="col">Παρατηρησεις</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => {
            if (row.isHidden === undefined) {
              row.isHidden = true;
            }
            row.index = index;
            return (
              <>
                <tr height="70px" key={index}>
                  <td>{row.nameNumber}</td>
                  <td>{row.name}</td>
                  <td>{row.mainPart}</td>
                  <td>{row.amountOfOrder}</td>
                  <td>{row.unitOfOrder}</td>
                  <td>{row.reasonOfOrder}</td>
                  <td>{row.priorityOfOrder}</td>
                  <td>{row.observations}</td>
                  <td className="edit">
                    <MdModeEditOutline
                      onClick={() => {
                        editRow(index);
                      }}
                    />
                    <FiDelete
                      className="table__button"
                      onClick={() => {
                        deleteRow(index);
                      }}
                    />
                    <MdOutlineExpandMore
                      className="table__button"
                      onClick={() => {
                        toggleHiddenTable(index);
                      }}
                    />
                  </td>
                </tr>
                <HiddenRows key={Date.toString()} isHidden={row.isHidden} />
              </>
            );
          })}
        </tbody>
      </table>
      <div className>
        <div className={"request__body"}>
          <div className={"request__data"}>
            <span>phi</span>
            <input
              type="number"
              value={firstPartOfPhi}
              onChange={(e) => {
                setFirstPartOfPhi(parseInt(e.target.value));
              }}
            />
            <input
              type="number"
              value={secondPartOfPhi}
              onChange={(e) => {
                setSecondPartOfPhi(parseInt(e.target.value));
              }}
            />
          </div>
          <div className={"request__data"}>
            <span>year</span>
            <input
              type="number"
              value={year}
              onChange={(e) => {
                setYear(parseInt(e.target.value));
              }}
            />
          </div>
          <div className={"request__data"}>
            <span>month</span>
            <input
              type="number"
              value={month}
              onChange={(e) => {
                setMonth(parseInt(e.target.value));
              }}
            />
          </div>
          <div className={"request__data"}>
            <span>day</span>
            <input
              type="number"
              value={day}
              onChange={(e) => {
                setDay(parseInt(e.target.value));
              }}
            />
          </div>
        </div>
      </div>
      <div className="modal modal-inactive" ref={modal}>
        <form className="modal__inputs" onSubmit={handleAddSubmit}>
          <AiOutlineClose className="modal__cancel" onClick={toggleModal} />
          <div className="modal__inputs-nameNumber">
            <label htmlFor="nameNumber">Name Number</label>
            <input
              name="nameNumber"
              type="text"
              defaultValue={initialValues.nameNumber}
            />
          </div>
          <div className="modal__inputs-name">
            <label htmlFor="name">Name</label>
            <input name="name" type="text" defaultValue={initialValues.name} />
          </div>
          <div className="modal__inputs-mainPart">
            <label htmlFor="mainPart">Main Material</label>
            <input
              name="mainPart"
              type="text"
              defaultValue={initialValues.mainPart}
            />
          </div>
          <div className="modal__inputs-amountOfOrder">
            <label htmlFor="amountOfOrder">Amount Of Order</label>
            <input
              name="amountOfOrder"
              type="text"
              defaultValue={initialValues.amountOfOrder}
            />
          </div>
          <div className="modal__inputs-unitOfOrder">
            <label htmlFor="modal__inputs-unitOfOrder">Units Of Order</label>
            <input
              name="unitOfOrder"
              type="text"
              defaultValue={initialValues.unitOfOrder}
            />
          </div>
          <div className="modal__inputs-reasonOfOrder">
            <label htmlFor="modal__inputs-reasonOfOrder">Reason Of Order</label>
            <input
              name="reasonOfOrder"
              type="text"
              defaultValue={initialValues.reasonOfOrder}
            />
          </div>
          <div className="modal__inputs-priorityOfOrder">
            <label htmlFor="modal__inputs-priorityOfOrder">
              Priority Of Order
            </label>
            <input
              name="priorityOfOrder"
              type="text"
              defaultValue={initialValues.priorityOfOrder}
            />
          </div>
          <div className="modal__inputs-observations">
            <label htmlFor="modal__inputs-observations">Observations</label>
            <input
              name="observations"
              type="text"
              defaultValue={initialValues.observations}
            />
          </div>
          <button type="submit" className="modal__button">
            Add
          </button>
        </form>
      </div>
      <IoMdAdd className="table__button addRow" onClick={addRow} />
      <div onClick={makePostRequest}>Submit</div>
    </div>
  );
}

export default NewRequest;
