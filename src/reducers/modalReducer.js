import { MODALS } from "modals/ModalWrapper";

const ACTIONS = {
  OPEN_REQUEST_MODAL: "OPEN_REQUEST_MODAL",
  OPEN_ENTRY_MODAL: "OPEN_ENTRY_MODAL",
  OPEN_PART_MODAL: "OPEN_PART_MODAL",
  OPEN_DELETE_MODAL: "OPEN_DELETE_MODAL",
  OPEN_ERROR_MODAL: "OPEN_ERROR_MODAL",
  CLOSE_MODAL: "CLOSE_MODAL",
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
        entryId: action.payload.entryId,
        initialValues: action.payload.initialValues,
      };
    case ACTIONS.OPEN_DELETE_MODAL:
      return {
        modalContent: MODALS.DELETE_MODAL,
        isOpen: action.payload.isOpen,
        closeModal: action.payload.closeModal,
        deleteFcn: action.payload.deleteFcn,
        name: action.payload.name,
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
      entryId,
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
          entryId,
        },
      });
    },
    openDeleteModal: (closeModal, deleteFcn, name) => {
      modalDispatch({
        type: ACTIONS.OPEN_DELETE_MODAL,
        payload: { isOpen: true, closeModal, deleteFcn, name },
      });
    },
    openApiErrorModal: (closeModal, error) => {
      modalDispatch({
        type: ACTIONS.OPEN_ERROR_MODAL,
        payload: { isOpen: true, closeModal, error },
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
