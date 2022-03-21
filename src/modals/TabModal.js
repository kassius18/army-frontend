import Modal from "./Modal";
import tabApi from "apis/tabApi";

function TabModal({
  closeModal,
  addTab,
  editTab,
  initialValues = {},
  modalActions,
}) {
  const createTab = (newTab) => {
    modalActions.openLoadingModal();
    tabApi.createTab(newTab).then((response) => {
      if (response.success === true && Object.keys(response.tabs) !== 0) {
        closeModal();
        addTab(...response.tabs);
      } else {
        modalActions.openApiErrorModal(modalActions.closeModal, response.error);
      }
    });
  };

  const updateTab = (newTab, tabId) => {
    modalActions.openLoadingModal();
    tabApi.updateTab(newTab, tabId).then((response) => {
      if (response.success === true) {
        closeModal();
        editTab(...response.tabs, tabId);
      } else {
        modalActions.openApiErrorModal(modalActions.closeModal, response.error);
      }
    });
  };

  const closeModalAndResetContent = () => {
    closeModal();
  };

  const submitForm = (event) => {
    event.preventDefault();
    const newTab = {
      id: event.target.id.value,
      name: event.target.name.value,
      startingTotal: event.target.startingTotal.value,
      usage: event.target.usage.value,
      observations: event.target.observations.value,
    };
    if (Object.keys(initialValues).length === 0) {
      createTab(newTab);
    } else {
      updateTab(newTab, initialValues.id);
    }
  };

  return (
    <div>
      <Modal closeModal={closeModalAndResetContent}>
        <form className="modal__inputs" onSubmit={submitForm}>
          <div className="modal__input">
            <label htmlFor="id">A/A</label>
            <input
              name="id"
              type="number"
              defaultValue={
                initialValues.id !== undefined ? initialValues.id : undefined
              }
            />
          </div>
          <div className="modal__input">
            <label htmlFor="plate">Ονομασία Υλικού</label>
            <input
              name="name"
              type="text"
              defaultValue={
                initialValues.name !== undefined
                  ? initialValues.name
                  : undefined
              }
            />
          </div>
          <div className="modal__input">
            <label htmlFor="tabType">Αρχικό Σύνολο</label>
            <input
              name="startingTotal"
              type="number"
              defaultValue={
                initialValues.startingTotal !== undefined
                  ? initialValues.startingTotal
                  : undefined
              }
            />
          </div>
          <div className="modal__input">
            <label htmlFor="usage">Χρήση</label>
            <input
              name="usage"
              type="text"
              defaultValue={
                initialValues.usage !== undefined
                  ? initialValues.usage
                  : undefined
              }
            />
          </div>
          <div className="modal__input">
            <label htmlFor="observations">Παρατηρησεις</label>
            <input
              name="observations"
              type="text"
              defaultValue={
                initialValues.observations !== undefined
                  ? initialValues.observations
                  : undefined
              }
            />
          </div>
          <button type="submit" className="modal__button">
            {Object.keys(initialValues).length === 0
              ? "Προσθήκη"
              : "Τροποποίηση"}
          </button>
        </form>
      </Modal>
    </div>
  );
}
export default TabModal;
