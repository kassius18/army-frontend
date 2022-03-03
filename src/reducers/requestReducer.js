const ACTIONS = {
  DELETE_REQUEST: "deleteRequest",
  EDIT_REQUEST: "editRequest",
  ADD_ENTRY: "addEntry",
  EDIT_ENTRY: "editEntry",
  DELETE_ENTRY: "delteEntry",
  ADD_PART: "addPart",
  EDIT_PART: "editPart",
  DELETE_PART: "deltePart",
};

export const requestsDispatchMap = (dispatch) => {
  return {
    deleteRequest: (requestId) => {
      dispatch({ type: ACTIONS.DELETE_REQUEST, payload: { requestId } });
    },
    editRequest: (newRequest, requestId) => {
      dispatch({
        type: ACTIONS.EDIT_REQUEST,
        payload: { newRequest, requestId },
      });
    },
    addEntry: (newEntry, requestId) => {
      dispatch({
        type: ACTIONS.ADD_ENTRY,
        payload: { newEntry, requestId },
      });
    },
    editEntry: (newEntry, entryId) => {
      dispatch({ type: ACTIONS.EDIT_ENTRY, payload: { newEntry, entryId } });
    },
    deleteEntry: (entryId) => {
      dispatch({ type: ACTIONS.DELETE_ENTRY, payload: { entryId } });
    },
    addPart: (newPart, entryId) => {
      dispatch({ type: ACTIONS.ADD_PART, payload: { newPart, entryId } });
    },
    deletePart: (partId) => {
      dispatch({ type: ACTIONS.DELETE_PART, payload: { partId } });
    },
    editPart: (newPart, partId) => {
      dispatch({ type: ACTIONS.EDIT_PART, payload: { newPart, partId } });
    },
  };
};

export const requestsReducer = (requests, action) => {
  switch (action.type) {
    case ACTIONS.DELETE_REQUEST:
      return requests.filter((request) => {
        if (request.id !== action.payload.requestId) {
          return request;
        }
      });
    case ACTIONS.EDIT_REQUEST:
      return requests.map((request) => {
        if (request.id === action.payload.requestId) {
          return action.payload.newRequest;
        }
        return request;
      });
    case ACTIONS.ADD_ENTRY:
      return requests.map((request) => {
        if (request.id === action.payload.requestId) {
          return {
            ...request,
            entries: [...request.entries, action.payload.newEntry],
          };
        }
        return request;
      });
    case ACTIONS.DELETE_ENTRY:
      return requests.map((request) => {
        return {
          ...request,
          entries: request.entries.filter((entry) => {
            return entry.id !== action.payload.entryId;
          }),
        };
      });
    case ACTIONS.EDIT_ENTRY:
      return requests.map((request) => {
        return {
          ...request,
          entries: request.entries.map((entry) => {
            if (entry.id === action.payload.entryId) {
              return { ...action.payload.newEntry, parts: entry.parts };
            }
            return entry;
          }),
        };
      });
    case ACTIONS.ADD_PART:
      return requests.map((request) => {
        return {
          ...request,
          entries: request.entries.map((entry) => {
            return {
              ...entry,
              parts: [...entry.parts, action.payload.newPart],
            };
          }),
        };
      });
    case ACTIONS.DELETE_PART:
      return requests.map((request) => {
        return {
          ...request,
          entries: request.entries.map((entry) => {
            return {
              ...entry,
              parts: entry.parts.filter((part) => {
                return part.id !== action.payload.partId;
              }),
            };
          }),
        };
      });
    case ACTIONS.EDIT_PART:
      return requests.map((request) => {
        return {
          ...request,
          entries: request.entries.map((entry) => {
            return {
              ...entry,
              parts: entry.parts.map((part) => {
                if (part.id === action.payload.partId) {
                  return action.payload.newPart;
                }
                return part;
              }),
            };
          }),
        };
      });
    default:
      return requests;
  }
};
