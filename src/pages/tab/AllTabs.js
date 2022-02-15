import React, { useState, useRef, useEffect } from "react";
import Tab from "pages/tab/Tab";
import TabTable from "tables/tab/TabTable";
import tabApi from "apis/tabApi";
import TabModal from "modals/TabModal";
import { useReactToPrint } from "react-to-print";

function AllTabs() {
  const [tabs, setTabs] = useState([]);
  const tabRef = useRef();
  const [filteredTabs, setFilteredTabs] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [showNonEmpty, setShowNonEmpty] = useState(false);

  const [minYear, setMinYear] = useState("");
  const [maxYear, setMaxYear] = useState("");

  const handlePrint = useReactToPrint({
    content: () => tabRef.current,
    pageStyle: `@page { margin: 0.5in 0.5in 0.5in 0.5in !important; 
    size: portrait;
    }`,
  });

  const assingMinYearValue = (event) => {
    setMinYear(parseInt(event.target.value));
  };

  const assingMaxYearValue = (event) => {
    setMaxYear(parseInt(event.target.value));
  };

  const compareFn = (firstPart, secondPart) => {
    const firstPartYear = firstPart.dateRecieved
      ? parseInt(firstPart.dateRecieved.split("-")[2])
      : parseInt(firstPart.dateUsed.split("-")[2]);
    const secondPartYear = secondPart.dateRecieved
      ? parseInt(secondPart.dateRecieved.split("-")[2])
      : parseInt(secondPart.dateUsed.split("-")[2]);
    if (firstPartYear === secondPartYear) {
      const firstPartMonth = firstPart.dateRecieved
        ? parseInt(firstPart.dateRecieved.split("-")[1])
        : parseInt(firstPart.dateUsed.split("-")[1]);
      const secondPartMonth = secondPart.dateRecieved
        ? parseInt(secondPart.dateRecieved.split("-")[1])
        : parseInt(secondPart.dateUsed.split("-")[1]);
      if (firstPartMonth === secondPartMonth) {
        const firstPartDay = firstPart.dateRecieved
          ? parseInt(firstPart.dateRecieved.split("-")[0])
          : parseInt(firstPart.dateUsed.split("-")[0]);
        const secondPartDay = secondPart.dateRecieved
          ? parseInt(secondPart.dateRecieved.split("-")[0])
          : parseInt(secondPart.dateUsed.split("-")[0]);
        if (firstPartMonth === secondPartMonth) {
          return 0;
        }
        return firstPartDay < secondPartDay ? -1 : 1;
      }
      return firstPartMonth < secondPartMonth ? -1 : 1;
    }
    return firstPartYear < secondPartYear ? -1 : 1;
  };

  const closeModal = () => {
    setIsOpen(false);
  };
  const openModal = () => {
    setIsOpen(true);
  };
  const addTab = (newTab) => {
    setTabs([...tabs, newTab]);
  };

  const toggleNonEmpty = (event) => {
    if (showNonEmpty) {
      setFilteredTabs(tabs);
      setShowNonEmpty(false);
    } else {
      setFilteredTabs(
        tabs.filter((tab) => {
          return tab.parts.length !== 0;
        })
      );
      setShowNonEmpty(true);
    }
  };

  useEffect(() => {
    tabApi.getAllTabs().then((response) => {
      if (response.success === true) {
        setTabs(
          response.tabs.map((tab) => {
            tab.parts.sort(compareFn);
            return tab;
          })
        );
      } else setTabs([]);
    });
  }, []);

  let testTabs = tabs;
  testTabs.map((tab) => {
    const parts = tab.parts;
    parts.sort(compareFn);
    return tab;
  });
  return (
    <>
      <div className="tab__view">
        {(filteredTabs || tabs).map((tab) => {
          return <Tab key={tab.id} tab={tab} />;
        })}
        <button onClick={openModal}>Add</button>
        <label htmlFor="nonEmpty">Only Show Non Empty tabs</label>
        <input
          id="nonEmpty"
          type="checkbox"
          value="empty=false"
          onChange={toggleNonEmpty}
        ></input>
        <input type="number" value={minYear} onChange={assingMinYearValue} />
        <input type="number" value={maxYear} onChange={assingMaxYearValue} />
      </div>
      <button onClick={handlePrint}>Print All</button>
      <div
        style={{
          display: "none",
        }}
      >
        <div
          ref={tabRef}
          className="print-container"
          style={{ margin: 0, paddign: 0 }}
        >
          {(showNonEmpty ? filteredTabs : tabs).map((tab) => {
            return (
              <>
                <div>
                  <TabTable
                    parts={tab.parts}
                    startingTotal={tab.startingTotal}
                    startingYear={minYear || 0}
                    endingYear={maxYear || 9999}
                    key={tab.id}
                  />
                </div>
                <div className="page-break" />
              </>
            );
          })}
        </div>
      </div>
      <TabModal addTab={addTab} isOpen={isOpen} closeModal={closeModal} />
    </>
  );
}

export default AllTabs;
