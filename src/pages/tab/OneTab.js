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
import PartRow from "./components/PartRow";
import TabTable from "tables/tab/TabTable";
import { useReactToPrint } from "react-to-print";
import ModalWrapper from "modals/ModalWrapper";
import { modalReducer, modalDispatchMap } from "reducers/modalReducer";
import { tabReducer, tabDispatchMap } from "reducers/tabReducer";
import { filterReducer, filterDispatchMap } from "reducers/filterReducer";
import tabApi from "apis/tabApi";

function OneTab() {
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
    const tabActions = tabDispatchMap(tabDispatch);
    let isMounted = true;
    tabApi.getPartsByTabId(tab.id).then((response) => {
      if (isMounted && response.success === true) {
        tabActions.setParts(response.parts);
      }
    });
    return () => {
      isMounted = false;
    };
  }, [tab.id]);

  useEffect(() => {
    const filterActions = filterDispatchMap(filterDispatch);
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
      <div className="form">
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
      </div>
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
        {render()}
      </div>
      <div
        style={{
          visibility: "hidden",
          position: "absolute",
          zIndex: "-100",
        }}
      >
        <div ref={tabRef}>
          {print.value ? (
            <TabTable parts={filter.filteredArray} print={print.value} />
          ) : null}
        </div>
      </div>
      <ModalWrapper modal={modal} modalActions={modalActions} />
    </div>
  );
}
export default OneTab;
