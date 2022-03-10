import React, { useState, useEffect, useReducer, useContext } from "react";
import Tab from "pages/tab/components/Tab";
import tabApi from "apis/tabApi";
import { AppContext } from "context/AppContext";
import { modalReducer, modalDispatchMap } from "reducers/modalReducer";
import ModalWrapper from "modals/ModalWrapper";

function ListTabs() {
  const { setHasChanged } = useContext(AppContext);
  const [tabs, setTabs] = useState([]);
  const [modal, modalDispatch] = useReducer(modalReducer, "");
  const modalActions = modalDispatchMap(modalDispatch);

  const openModal = () => {
    modalActions.openTabModal(modalActions.closeModal, addTab, () => {});
  };

  const addTab = (newTab) => {
    setHasChanged(true);
    setTabs([...tabs, newTab]);
  };

  useEffect(() => {
    const modalActions = modalDispatchMap(modalDispatch);
    let isMounted = true;
    modalActions.openLoadingModal();
    tabApi.getAllTabs().then((response) => {
      if (isMounted) {
        if (response.success === true) {
          setTabs(response.tabs);
          modalActions.closeModal();
        } else {
          modalActions.openApiErrorModal(
            modalActions.closeModal,
            response.error
          );
          setTabs([]);
        }
      }
    });
    return () => {
      isMounted = false;
    };
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
      <ModalWrapper modal={modal} modalActions={modalActions} />
    </>
  );
}

export default ListTabs;
