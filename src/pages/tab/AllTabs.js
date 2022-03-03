import React, { useState, useEffect, useReducer, useContext } from "react";
import Tab from "pages/tab/Tab";
import tabApi from "apis/tabApi";
import { AppContext } from "context/AppContext";
import "./tab.scss";
import { modalReducer, modalDispatchMap } from "reducers/modalReducer";
import ModalWrapper from "modals/ModalWrapper";

function AllTabs() {
  const { setHasChanged } = useContext(AppContext);
  const [tabs, setTabs] = useState([]);
  const [modal, modalDispatch] = useReducer(modalReducer, "");
  const modalActions = modalDispatchMap(modalDispatch);

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

  const openModal = () => {
    modalActions.openTabModal(modalActions.closeModal, addTab, () => {});
  };

  const addTab = (newTab) => {
    setHasChanged(true);
    setTabs([...tabs, newTab]);
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

  return (
    <>
      <div className="tab__view">
        <div className={"tab__list"}>
          <p>A/A</p>
          <p>Ονομασία Υλικού</p>
          <p>Αρχικό Σύνολο</p>
          <p>Χρήση</p>
          <p>Παρατηρησεις</p>
        </div>
        {tabs.map((tab) => {
          return <Tab key={tab.id} tab={tab} />;
        })}
        <button onClick={openModal}>Προσθήκη</button>
      </div>
      <ModalWrapper modal={modal} />
    </>
  );
}

export default AllTabs;
