import React, { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import tabApi from "apis/tabApi";
import PartRow from "./PartRow";
import TabTable from "tables/tab/TabTable";
import TabModal from "modals/TabModal";
import ApiErrorModal from "modals/ApiErrorModal";
import { useReactToPrint } from "react-to-print";

export default function OneTab() {
  const navigate = useNavigate();
  const tabRef = useRef();
  const location = useLocation();
  console.log("location is", location);
  const tab = location.state;
  const initialValues = tab;
  const total = tab.startingTotal;
  const [apiResponse, setApiResponse] = useState({ success: true });
  const [isOpen, setIsOpen] = useState(false);
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);

  const [allParts, setAllParts] = useState(tab.parts);
  const [partsToBePrinted, setPartsToBePrinted] = useState(allParts);
  const [newTotal, setNewTotal] = useState(total);

  const [minYear, setMinYear] = useState("");
  const [maxYear, setMaxYear] = useState("");

  const closeModal = () => {
    setIsOpen(false);
  };
  const openModal = () => {
    setIsOpen(true);
  };

  const openErrorModal = () => {
    setIsErrorModalOpen(true);
  };
  const closeErrorModal = () => {
    setIsErrorModalOpen(false);
  };

  const deleteTab = () => {
    tabApi.deleteTab(tab.id).then((response) => {
      if (response.success === true) {
        navigate("/tabs");
      } else {
        setApiResponse(response);
        openErrorModal();
      }
    });
  };

  const editTab = (newTab) => {
    navigate(`/tabs/${newTab.id}`, { state: newTab });
  };

  const handlePrintTab = useReactToPrint({
    content: () => tabRef.current,
    pageStyle: `@page {
    margin: 0.5in 0.5in 0.5in 0.5in !important; 
    size: portrait !important;
    }`,
  });

  const compareFn = (firstPart, secondPart) => {
    const firstPartYearRecieved = firstPart.dateRecieved
      ? parseInt(firstPart.dateRecieved.split("-")[2])
      : firstPart.dateUsed.split("-")[2];
    const secondPartYearRecieved = secondPart.dateRecieved
      ? parseInt(secondPart.dateRecieved.split("-")[2])
      : secondPart.dateUsed.split("-")[2];
    if (firstPartYearRecieved === secondPart) {
      return 0;
    }
    return firstPartYearRecieved < secondPartYearRecieved ? -1 : 1;
  };

  const assingMinYearValue = (event) => {
    setMinYear(parseInt(event.target.value));
  };

  const assingMaxYearValue = (event) => {
    setMaxYear(parseInt(event.target.value));
  };

  useEffect(() => {
    let localTotal = total;

    const localMinYear = minYear || 0;
    const localMaxYear = maxYear || 9999;

    const toBePrinted = allParts.filter((part) => {
      if (part.amountRecieved !== "") {
        const yearRecieved = parseInt(part.dateRecieved.split("-")[2]);
        if (yearRecieved >= localMinYear && yearRecieved <= localMaxYear) {
          return (
            parseInt(yearRecieved) >= localMinYear &&
            parseInt(yearRecieved) <= localMaxYear
          );
        } else {
          localTotal = localTotal + part.amountRecieved - part.amountUsed;
        }
      } else {
        const yearUsed = parseInt(part.dateUsed.split("-")[2]);
        if (yearUsed >= localMinYear && yearUsed <= localMaxYear) {
          return (
            parseInt(yearUsed) >= localMinYear &&
            parseInt(yearUsed) <= localMaxYear
          );
        } else {
          localTotal = localTotal + part.amountRecieved - part.amountUsed;
        }
      }
    });

    toBePrinted.sort(compareFn);

    setPartsToBePrinted(toBePrinted);
    setNewTotal(localTotal);
  }, [minYear, maxYear]);

  let localTotal = newTotal;
  const render = () =>
    partsToBePrinted.sort(compareFn).map((part) => {
      localTotal = localTotal + part.amountRecieved - part.amountUsed;
      return <PartRow key={part.id} part={part} total={localTotal} />;
    });

  return (
    <div>
      <input type="number" value={minYear} onChange={assingMinYearValue} />
      <input type="number" value={maxYear} onChange={assingMaxYearValue} />
      <button onClick={handlePrintTab}>Print</button>
      <button onClick={openModal}>Edit</button>
      <button onClick={deleteTab}>Delete</button>
      <div className="tab__properties">
        <div>Id</div>
        <div>Name</div>
        <div>Starting Total</div>
        <div>Usage</div>
        <div>Observatios</div>
        <div>{tab.id}</div>
        <div>{tab.name}</div>
        <div>{tab.startingTotal}</div>
        <div>{tab.usage}</div>
        <div>{tab.observations}</div>
      </div>
      <div className="tab header">
        <div>Α/Α</div>
        <div>ΗΜΕΡΟΜ.</div>
        <div>ΑΥΤΟΣ ΠΟΥ ΠΑΡΑΔΩΣΕ ή ΠΑΡΕΛΑΒΕ</div>
        <div>ΑΡΙΘΜΟΣ ΕΥΡΕΤΗΡ.</div>
        <div>ΕΙΣΑΓΩΓΕΣ</div>
        <div>ΕΞΑΓΩΓΕΣ.</div>
        <div>ΥΠΟΛΟΙΟΠΟ</div>
        <div>ΠΑΡΑΤΗΡΗΣΕΙΣ</div>
      </div>
      <div>{render()}</div>
      <div
        style={{
          // display: "none",
          visibility: "hidden",
          position: "absolute",
          zIndex: "-100",
        }}
      >
        <div ref={tabRef}>
          {
            <TabTable
              parts={partsToBePrinted}
              startingTotal={total}
              startingYear={minYear || 0}
              endingYear={maxYear || 9999}
            />
          }
        </div>
      </div>
      <TabModal
        editTab={editTab}
        isOpen={isOpen}
        closeModal={closeModal}
        initialValues={initialValues}
      />
      <ApiErrorModal
        isModalOpen={isErrorModalOpen}
        closeModal={closeErrorModal}
        error={apiResponse.error}
      />
    </div>
  );
}
