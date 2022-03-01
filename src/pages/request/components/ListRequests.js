import { useLocation, useNavigate } from "react-router-dom";
import requestApi from "apis/requestApi";
import ApiErrorModal from "modals/ApiErrorModal";
import RequestModal from "modals/RequestModal";
import Request from "../Request";
import { useEffect, useRef, useState, useReducer } from "react";
import { useReactToPrint } from "react-to-print";
import ProtocolTable from "tables/protocol/ProtocolTable";
import RequestTable from "tables/request/RequestTable";
import uuid from "react-uuid";

export const ACTIONS = {
  DELETE_REQUEST: "deleteRequest",
  EDIT_REQUEST: "editRequest",
  ADD_ENTRY: "addEntry",
  EDIT_ENTRY: "editEntry",
  DELETE_ENTRY: "delteEntry",
  ADD_PART: "addPart",
  EDIT_PART: "editPart",
  DELETE_PART: "deltePart",
};

const reducer = (requests, action) => {
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
              return action.payload.newEntry;
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

function ListRequests() {
  const location = useLocation();
  const navigate = useNavigate();

  const [requests, dispatch] = useReducer(reducer, location.state || []);

  const [isOpen, setIsOpen] = useState(false);
  const [apiResponse, setApiResponse] = useState({ success: true });
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
  const [initialValues, setInitialValues] = useState({});

  const [isPrintRequest, setIsPrintRequest] = useState({
    value: false,
    resolve: undefined,
  });
  const [isPrintProtocol, setIsPrintProtocol] = useState({
    value: false,
    resolve: undefined,
  });

  const requestRef = useRef();
  const protocolRef = useRef();

  const deleteRequest = (requestId) => {
    requestApi.deleteRequest(requestId).then((response) => {
      if (response.success === true) {
        dispatch({ type: ACTIONS.DELETE_REQUEST, payload: { requestId } });
      } else {
        setApiResponse(response);
        openErrorModal();
      }
    });
  };

  const editRequest = (newRequest, requestId) => {
    dispatch({
      type: ACTIONS.EDIT_REQUEST,
      payload: { newRequest, requestId },
    });
  };

  useEffect(() => {
    if (location.state !== requests) {
      navigate("", { state: requests });
    }
  }, [requests]);

  useEffect(() => {
    if (isPrintRequest.resolve) {
      isPrintRequest.resolve();
    }
  }, [isPrintRequest]);

  useEffect(() => {
    if (isPrintProtocol.resolve) {
      isPrintProtocol.resolve();
    }
  }, [isPrintProtocol]);

  const handlePrintRequests = useReactToPrint({
    content: () => requestRef.current,
    pageStyle: `@page {
    margin: 0.5in 0.5in 0.5in 0.5in !important; 
    size: landscape;
  }`,
    onAfterPrint: () => {
      setIsPrintRequest({ value: false, resolve: undefined });
    },
    onBeforeGetContent: () => {
      return new Promise((resolve) => {
        setIsPrintRequest({ value: true, resolve });
      });
    },
  });
  const handlePrintProtocols = useReactToPrint({
    content: () => protocolRef.current,
    pageStyle: `@page {
    margin: 0.5in 0.5in 0.5in 0.5in !important; 
    size: landscape;
  }`,
    onAfterPrint: () => {
      setIsPrintProtocol({ value: false, resolve: undefined });
    },
    onBeforeGetContent: () => {
      return new Promise((resolve) => {
        setIsPrintProtocol({ value: true, resolve });
      });
    },
  });

  const openModal = () => {
    setIsOpen(true);
  };
  const closeModal = () => {
    setInitialValues({});
    setIsOpen(false);
  };

  const openErrorModal = () => {
    setIsErrorModalOpen(true);
  };

  const closeErrorModal = () => {
    setIsErrorModalOpen(false);
  };
  return (
    <>
      <div className="request-list">
        {requests.map((request) => {
          return (
            <Request
              request={request}
              key={request.id}
              openModal={openModal}
              setInitialValues={setInitialValues}
              deleteRequest={deleteRequest}
              dispatch={dispatch}
            />
          );
        })}
      </div>
      <button onClick={handlePrintRequests}>Print all requests</button>
      <button onClick={handlePrintProtocols}>Print all protocols</button>
      <RequestModal
        isOpen={isOpen}
        closeModal={closeModal}
        editRequest={editRequest}
        initialValues={initialValues}
      />
      <ApiErrorModal
        isModalOpen={isErrorModalOpen}
        closeModal={closeErrorModal}
        error={apiResponse.error}
      />
      <div
        style={{
          visibility: "hidden",
          position: "absolute",
          zIndex: "-100",
        }}
      >
        <div
          ref={requestRef}
          className="print-container"
          style={{ margin: 0, paddign: 0 }}
        >
          {isPrintRequest.value
            ? requests.map((request) => {
                return (
                  <>
                    <div>
                      <RequestTable
                        print={isPrintRequest}
                        key={uuid()}
                        request={request}
                      />
                    </div>
                    <div className="page-break" />
                  </>
                );
              })
            : null}
        </div>
        <div
          ref={protocolRef}
          className="print-container"
          style={{ margin: 0, paddign: 0 }}
        >
          {isPrintProtocol.value
            ? requests.map((request) => {
                return (
                  <>
                    <div>
                      <ProtocolTable
                        print={isPrintProtocol}
                        key={uuid()}
                        request={request}
                      />
                    </div>
                    <div className="page-break" />
                  </>
                );
              })
            : null}
        </div>
      </div>
    </>
  );
}

export default ListRequests;
