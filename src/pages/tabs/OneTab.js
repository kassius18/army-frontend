import React, { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import tabApi from "apis/tabApi";
import PartRow from "./PartRow";
import TabTable from "tables/tab/TabTable";
import { useReactToPrint } from "react-to-print";

function OneTab() {
  const tabRef = useRef();
  const location = useLocation();
  const tab = location.state;
  const total = tab.startingTotal;

  const [allParts, setAllParts] = useState([]);
  const [partsToBePrinted, setPartsToBePrinted] = useState(allParts);
  const [newTotal, setNewTotal] = useState(total);

  const [filterValue, setFilterValue] = useState("");

  const handlePrintTab = useReactToPrint({
    content: () => tabRef.current,
    pageStyle: `@page { margin: 0.5in 0.5in 0.5in 0.5in !important; }`,
  });

  const compareFn = (firstPart, secondPart) => {
    const firstPartYearRecieved = parseInt(
      firstPart.dateRecieved.split("-")[2]
    );
    const secondPartYearRecieved = parseInt(
      secondPart.dateRecieved.split("-")[2]
    );
    if (firstPartYearRecieved === secondPartYearRecieved) {
      return 0;
    }
    return firstPartYearRecieved < secondPartYearRecieved ? -1 : 1;
  };

  const filterPartsForPrinting = (event) => {
    setFilterValue(parseInt(event.target.value));

    let localTotal = total;
    const toBePrinted = allParts.filter((part) => {
      const yearRecieved = parseInt(part.dateRecieved.split("-")[2]);
      if (yearRecieved >= event.target.value) {
        return parseInt(yearRecieved) >= event.target.value;
      } else {
        localTotal = localTotal + part.amountRecieved - part.amountUsed;
      }
    });

    toBePrinted.sort(compareFn);

    setPartsToBePrinted(toBePrinted);
    setNewTotal(localTotal);
  };

  useEffect(() => {
    tabApi.getPartsByTabId(tab.id).then((response) => {
      setAllParts(...response.parts);
      setPartsToBePrinted(...response.parts);
    });
  }, []);

  let localTotal = newTotal;
  const render = () =>
    partsToBePrinted.sort(compareFn).map((part) => {
      localTotal = localTotal + part.amountRecieved - part.amountUsed;
      return <PartRow key={part.id} part={part} total={localTotal} />;
    });

  return (
    <div>
      <input
        type="number"
        value={filterValue}
        onChange={filterPartsForPrinting}
      />
      <button onClick={handlePrintTab}>Print</button>
      <div className="tab__properties">
        <div>Id</div>
        <div>Name</div>
        <div>Starting Total</div>
        <div>Observatios</div>
        <div>{tab.id}</div>
        <div>{tab.name}</div>
        <div>{tab.startingTotal}</div>
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
      <div style={{ display: "none" }}>
        <div ref={tabRef}>
          {<TabTable parts={partsToBePrinted} startingTotal={total} />}
        </div>
      </div>
    </div>
  );
}

export default OneTab;
