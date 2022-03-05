import React, {
  useState,
  useEffect,
  useContext,
  useReducer,
  useRef,
} from "react";
import { AppContext } from "context/AppContext";
import { useLocation, useNavigate } from "react-router-dom";
import { DELETE_ACTIONS } from "modals/DeleteModal";
import PartRow from "./PartRow";
import TabTable from "tables/tab/TabTable";
import { useReactToPrint } from "react-to-print";
import ModalWrapper from "modals/ModalWrapper";
import { modalReducer, modalDispatchMap } from "reducers/modalReducer";
import tabApi from "apis/tabApi";
import uuid from "react-uuid";

const filterFn = (year, minYear, maxYear) => {
  if (minYear === "" && maxYear === "") {
    return true;
  }
  if (minYear === "") {
    return year <= maxYear;
  }
  if (maxYear === "") {
    return year >= minYear;
  }
  return year >= minYear && year <= maxYear;
};

const partFilterFn = (part, minYear, maxYear) => {
  if (part.amountRecieved !== "") {
    const yearRecieved = parseInt(part.dateRecieved.split("-")[2]);
    return filterFn(yearRecieved, minYear, maxYear);
  } else {
    const yearUsed = parseInt(part.dateUsed.split("-")[2]);
    return filterFn(yearUsed, minYear, maxYear);
  }
};

const TAB_ACTIONS = {
  SET_PARTS: "SET_PARTS",
};

const FILTER_ACTIONS = {
  SET_MIN_VALUE: "SET_MIN_VALUE",
  SET_MAX_VALUE: "SET_MAX_VALUE",
  SET_FILTERED_ARRAY: "SET_FILTERED_ARRAY",
  FILTER: "FILTER",
};

const tabReducer = (tab, action) => {
  switch (action.type) {
    case TAB_ACTIONS.SET_PARTS:
      const sortedParts = action.payload.parts.sort(compareFn);
      const startingTotal = tab.startingTotal;
      let calculatedTotalPerPart = startingTotal;
      const partsWithTotal = sortedParts.map((part) => {
        calculatedTotalPerPart =
          calculatedTotalPerPart - part.amountUsed + part.amountRecieved;
        return { ...part, partTotal: calculatedTotalPerPart };
      });
      return { ...tab, parts: partsWithTotal };
    default:
      return tab;
  }
};

const filterReducer = (filter, action) => {
  switch (action.type) {
    case FILTER_ACTIONS.SET_MIN_VALUE: {
      const parts = action.payload.parts.filter((part) => {
        return partFilterFn(part, action.payload.minValue, filter.maxValue);
      });
      return {
        ...filter,
        filteredArray: parts,
        minValue: action.payload.minValue,
      };
    }
    case FILTER_ACTIONS.SET_MAX_VALUE: {
      const parts = action.payload.parts.filter((part) => {
        return partFilterFn(part, filter.minValue, action.payload.maxValue);
      });
      return {
        ...filter,
        filteredArray: parts,
        maxValue: action.payload.maxValue,
      };
    }
    case FILTER_ACTIONS.SET_FILTERED_ARRAY: {
      return { ...filter, filteredArray: action.payload.filteredArray };
    }
    default: {
      return filter;
    }
  }
};

const filterDispatchMap = (filterDispatch) => {
  return {
    setMinValue: (minValue, parts) => {
      filterDispatch({
        type: FILTER_ACTIONS.SET_MIN_VALUE,
        payload: { minValue, parts },
      });
    },
    setMaxValue: (maxValue, parts) => {
      filterDispatch({
        type: FILTER_ACTIONS.SET_MAX_VALUE,
        payload: { maxValue, parts },
      });
    },
    setFilteredArray: (filteredArray) => {
      filterDispatch({
        type: FILTER_ACTIONS.SET_FILTERED_ARRAY,
        payload: { filteredArray },
      });
    },
  };
};

const tabDispatchMap = (tabDispatch) => {
  return {
    setParts: (parts) => {
      tabDispatch({ type: TAB_ACTIONS.SET_PARTS, payload: { parts } });
    },
  };
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

export default function OneTab() {
  const { setHasChanged } = useContext(AppContext);
  const navigate = useNavigate();
  const tabRef = useRef();
  const location = useLocation();

  const [print, setPrint] = useState({
    value: false,
    resolve: undefined,
  });

  const [modal, modalDispatch] = useReducer(modalReducer, {});
  const [tab, tabDispatch] = useReducer(tabReducer, location.state);
  const [filter, filterDispatch] = useReducer(filterReducer, {
    filteredArray: [],
    minValue: "",
    maxValue: "",
  });
  const tabActions = tabDispatchMap(tabDispatch);
  const modalActions = modalDispatchMap(modalDispatch);
  const filterActions = filterDispatchMap(filterDispatch);

  const openDeleteModal = () => {
    modalActions.openDeleteModal(
      modalActions.closeModal,
      modalActions,
      {},
      tab.id,
      DELETE_ACTIONS.DELETE_TAB
    );
  };

  useEffect(() => {
    tabApi.getPartsByTabId(tab.id).then((response) => {
      tabActions.setParts(response.parts);
    });
  }, []);

  useEffect(() => {
    if (tab.parts.length) {
      filterActions.setFilteredArray(tab.parts);
    }
  }, [tab]);

  useEffect(() => {
    if (print.resolve) {
      print.resolve();
    }
  }, [print]);

  const openModal = () => {
    modalActions.openTabModal(modalActions.closeModal, () => {}, editTab, tab);
  };

  const editTab = (newTab) => {
    setHasChanged(true);
    navigate(`/tabs/${newTab.id}`, { state: newTab });
  };

  const handlePrintTab = useReactToPrint({
    content: () => tabRef.current,
    pageStyle: `@page {
    margin: 0.5in 0.5in 0.5in 0.5in !important; 
    size: portrait !important;
    }`,
    onAfterPrint: () => {
      setPrint({ value: false, resolve: undefined });
    },
    onBeforeGetContent: () => {
      return new Promise((resolve) => {
        setPrint({ value: true, resolve });
      });
    },
  });

  const assingMinYearValue = (event) => {
    const minValue = isNaN(parseInt(event.target.value))
      ? ""
      : parseInt(event.target.value);
    filterActions.setMinValue(minValue, tab.parts);
  };

  const assingMaxYearValue = (event) => {
    const maxValue = isNaN(parseInt(event.target.value))
      ? ""
      : parseInt(event.target.value);
    filterActions.setMaxValue(maxValue, tab.parts);
  };

  const render = () =>
    filter.filteredArray.map((part) => {
      return <PartRow key={part.id} part={part} total={part.partTotal} />;
    });

  return (
    <div className="tab__view">
      <label htmlFor="startingYear">Αρχικό Έτος</label>
      <input
        type="number"
        value={filter.minValue}
        onChange={assingMinYearValue}
        id="startingYear"
      />
      <label htmlFor="endingYear">Τελικό Έτος</label>
      <input
        type="number"
        value={filter.maxValue}
        onChange={assingMaxYearValue}
        id="endingYear"
      />
      <button onClick={handlePrintTab}>Αποθήκευση</button>
      <button onClick={openModal}>Τροποποίηση</button>
      <button onClick={openDeleteModal}>Διαγραφή</button>
      <div className="tab__properties">
        <div>A/A</div>
        <div>Ονομασία Υλικού</div>
        <div>Αρχικό Σύνολο</div>
        <div>Χρήση</div>
        <div>Παρατηρησεις</div>
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
          visibility: "hidden",
          position: "absolute",
          zIndex: "-100",
        }}
      >
        <div ref={tabRef}>
          {print ? (
            <TabTable key={uuid()} parts={filter.filteredArray} />
          ) : null}
        </div>
      </div>
      <ModalWrapper modal={modal} />
    </div>
  );
}
