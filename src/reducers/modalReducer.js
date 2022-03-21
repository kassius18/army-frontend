import { MODALS } from "modals/ModalWrapper";

const ACTIONS = {
  OPEN_REQUEST_MODAL: "OPEN_REQUEST_MODAL",
  OPEN_ENTRY_MODAL: "OPEN_ENTRY_MODAL",
  OPEN_PART_MODAL: "OPEN_PART_MODAL",
  OPEN_VEHICLE_MODAL: "OPEN_VEHICLE_MODAL",
  OPEN_TAB_MODAL: "OPEN_TAB_MODAL",
  OPEN_DELETE_MODAL: "OPEN_DELETE_MODAL",
  OPEN_LOADING_MODAL: "OPEN_LOADING_MODAL",
  OPEN_ERROR_MODAL: "OPEN_ERROR_MODAL",
  CLOSE_MODAL: "CLOSE_MODAL",
  OPEN_NOT_FOUND_MODAL: "OPEN_NOT_FOUND_MODAL",
};

export const modalReducer = (modal, action) => {
  switch (action.type) {
    case ACTIONS.OPEN_REQUEST_MODAL:
      return {
        modalContent: MODALS.REQUEST_MODAL,
        isOpen: action.payload.isOpen,
        editRequest: action.payload.editRequest,
        addRequest: action.payload.addRequest,
        initialValues: action.payload.initialValues,
        closeModal: action.payload.closeModal,
      };
    case ACTIONS.OPEN_ENTRY_MODAL:
      return {
        modalContent: MODALS.ENTRY_MODAL,
        isOpen: action.payload.isOpen,
        closeModal: action.payload.closeModal,
        addEntry: action.payload.addEntry,
        editEntry: action.payload.editEntry,
        request: action.payload.request,
        initialValues: action.payload.initialValues,
      };
    case ACTIONS.OPEN_PART_MODAL:
      return {
        modalContent: MODALS.PART_MODAL,
        isOpen: action.payload.isOpen,
        closeModal: action.payload.closeModal,
        addPart: action.payload.addPart,
        editPart: action.payload.editPart,
        entry: action.payload.entry,
        editEntry: action.payload.editEntry,
        initialValues: action.payload.initialValues,
      };
    case ACTIONS.OPEN_VEHICLE_MODAL:
      return {
        modalContent: MODALS.VEHICLE_MODAL,
        isOpen: action.payload.isOpen,
        closeModal: action.payload.closeModal,
        editVehicle: action.payload.editVehicle,
        addVehicle: action.payload.addVehicle,
        initialValues: action.payload.initialValues,
      };
    case ACTIONS.OPEN_TAB_MODAL:
      return {
        modalContent: MODALS.TAB_MODAL,
        isOpen: action.payload.isOpen,
        closeModal: action.payload.closeModal,
        editTab: action.payload.editTab,
        addTab: action.payload.addTab,
        initialValues: action.payload.initialValues,
      };
    case ACTIONS.OPEN_DELETE_MODAL:
      return {
        modalContent: MODALS.DELETE_MODAL,
        isOpen: action.payload.isOpen,
        closeModal: action.payload.closeModal,
        id: action.payload.id,
        resourceToBeDeleted: action.payload.resourceToBeDeleted,
        requestActions: action.payload.requestActions,
      };
    case ACTIONS.OPEN_NOT_FOUND_MODAL:
      return {
        modalContent: MODALS.NOT_FOUND_MODAL,
        isOpen: action.payload.isOpen,
        closeModal: action.payload.closeModal,
      };
    case ACTIONS.OPEN_LOADING_MODAL:
      return {
        modalContent: MODALS.LOADING_MODAL,
        isOpen: action.payload.isOpen,
        portalId: action.payload.portalId,
      };
    case ACTIONS.OPEN_ERROR_MODAL:
      return {
        modalContent: MODALS.ERROR_MODAL,
        isOpen: action.payload.isOpen,
        closeModal: action.payload.closeModal,
        error: action.payload.error,
      };
    case ACTIONS.CLOSE_MODAL:
      return {
        ...modal,
        isOpen: action.payload.isOpen,
        initialValues: action.payload.initialValues,
      };
    default:
      return modal;
  }
};

export const modalDispatchMap = (modalDispatch) => {
  return {
    openRequestModal: (
      editRequest,
      addRequest,
      closeModal,
      initialValues = {}
    ) => {
      modalDispatch({
        type: ACTIONS.OPEN_REQUEST_MODAL,
        payload: {
          isOpen: true,
          initialValues,
          addRequest,
          editRequest,
          closeModal,
        },
      });
    },
    openEntryModal: (
      closeModal,
      addEntry,
      editEntry,
      request,
      initialValues = {}
    ) => {
      modalDispatch({
        type: ACTIONS.OPEN_ENTRY_MODAL,
        payload: {
          isOpen: true,
          initialValues,
          addEntry,
          editEntry,
          closeModal,
          request,
        },
      });
    },
    openPartModal: (
      closeModal,
      addPart,
      editPart,
      entry,
      editEntry,
      initialValues = {}
    ) => {
      modalDispatch({
        type: ACTIONS.OPEN_PART_MODAL,
        payload: {
          isOpen: true,
          initialValues,
          addPart,
          editPart,
          closeModal,
          entry,
          editEntry,
        },
      });
    },
    openVehicleModal: (
      closeModal,
      addVehicle,
      editVehicle,
      initialValues = {}
    ) => {
      modalDispatch({
        type: ACTIONS.OPEN_VEHICLE_MODAL,
        payload: {
          isOpen: true,
          initialValues,
          closeModal,
          editVehicle,
          addVehicle,
        },
      });
    },
    openTabModal: (closeModal, addTab, editTab, initialValues = {}) => {
      modalDispatch({
        type: ACTIONS.OPEN_TAB_MODAL,
        payload: {
          isOpen: true,
          initialValues,
          closeModal,
          editTab,
          addTab,
        },
      });
    },
    openDeleteModal: (
      closeModal,
      modalActions,
      requestActions,
      id,
      resourceToBeDeleted
    ) => {
      modalDispatch({
        type: ACTIONS.OPEN_DELETE_MODAL,
        payload: {
          isOpen: true,
          closeModal,
          id,
          resourceToBeDeleted,
          modalActions,
          requestActions,
        },
      });
    },
    openLoadingModal: (portalId = "") => {
      modalDispatch({
        type: ACTIONS.OPEN_LOADING_MODAL,
        payload: { isOpen: true, portalId },
      });
    },
    openApiErrorModal: (closeModal, error) => {
      modalDispatch({
        type: ACTIONS.OPEN_ERROR_MODAL,
        payload: { isOpen: true, closeModal, error },
      });
    },
    openNotFoundModal: (closeModal) => {
      modalDispatch({
        type: ACTIONS.OPEN_NOT_FOUND_MODAL,
        payload: { isOpen: true, closeModal },
      });
    },
    closeModal: () => {
      modalDispatch({
        type: ACTIONS.OPEN_REQUEST_MODAL,
        payload: { isOpen: false, initialValues: {} },
      });
    },
  };
};
