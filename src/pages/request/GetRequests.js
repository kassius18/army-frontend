import requestApi from "apis/requestApi";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState, useReducer } from "react";
import ModalWrapper from "modals/ModalWrapper";
import { modalReducer, modalDispatchMap } from "reducers/modalReducer";
import { useContext } from "react";
import { AppContext } from "context/AppContext";

function GetRequests() {
  const navigate = useNavigate();
  const [content, setContent] = useState();
  const { state } = useLocation();
  const [modal, modalDispatch] = useReducer(modalReducer, "");
  const modalActions = modalDispatchMap(modalDispatch);
  const { vehicles } = useContext(AppContext);

  useEffect(() => {
    const modalActions = modalDispatchMap(modalDispatch);
    const findByPhiYear = (event) => {
      event.preventDefault();
      const year = parseInt(event.target.year.value) || null;
      const phi = parseInt(event.target.phi.value) || null;

      requestApi.getRequestByPhiYear(year, phi).then((response) => {
        if (response.success) {
          if (Object.keys(response.requests).length) {
            navigate("/requests/list", { state: [response.requests] });
          }
        } else {
          modalActions.openApiErrorModal(
            modalActions.closeModal,
            response.error
          );
        }
      });
    };

    const findByVehicle = (event) => {
      event.preventDefault();
      const vehicleId = parseInt(event.target.vehicleId.value) || null;

      requestApi.getRequestByVehicle(vehicleId).then((response) => {
        if (response.success) {
          if (Object.keys(response.requests).length) {
            navigate("/requests/list", { state: response.requests });
          }
        } else {
          modalActions.openApiErrorModal(
            modalActions.closeModal,
            response.error
          );
        }
      });
    };

    const findByDate = (event) => {
      event.preventDefault();
      const getHttpRequestParams = {};
      getHttpRequestParams.startYear =
        parseInt(event.target.startYear.value) || parseInt(0);
      getHttpRequestParams.startMonth =
        parseInt(event.target.startMonth.value) || null;
      getHttpRequestParams.startDay =
        parseInt(event.target.startDay.value) || null;
      getHttpRequestParams.endYear =
        parseInt(event.target.endYear.value) || null;
      getHttpRequestParams.endMonth =
        parseInt(event.target.endMonth.value) || null;
      getHttpRequestParams.endDay = parseInt(event.target.endDay.value) || null;
      getHttpRequestParams.findBy = "date";

      requestApi
        .getRequestByDateInterval(getHttpRequestParams)
        .then((response) => {
          if (response.success) {
            navigate("/requests/list", { state: response.requests });
          } else {
            modalActions.openApiErrorModal(
              modalActions.closeModal,
              response.error
            );
          }
        });
    };

    const findByPhi = (event) => {
      event.preventDefault();
      const firstPartOfPhi = parseInt(event.target.firstPartOfPhi.value);

      requestApi.getRequestByPhi(firstPartOfPhi).then((response) => {
        if (response.success) {
          navigate("/requests/list", { state: response.requests });
        } else {
          modalActions.openApiErrorModal(
            modalActions.closeModal,
            response.error
          );
        }
      });
    };
    switch (state.findBy) {
      case "phi":
        setContent(
          <form
            onSubmit={findByPhi}
            className={"requests--byPhi"}
            id={"requests--byPhi"}
          >
            <h1>Αναζήτηση με Φ</h1>
            <label htmlFor="firstPartOfPhi">Αριθμός Φ</label>
            <input type="number" name="firstPartOfPhi" />
            <button type="submit">Αναζήτηση</button>
          </form>
        );
        break;
      case "date":
        setContent(
          <form
            onSubmit={findByDate}
            className={"requests--byDate"}
            id={"requests--byDate"}
          >
            <h1>Αναζήτηση με Ημερομηνία</h1>
            <label htmlFor="startYear">Αρχικό Ετός</label>
            <input type="number" name="startYear" />
            <label htmlFor="startMonth">Αρχικός Μηνας</label>
            <input type="number" name="startMonth" />
            <label htmlFor="startDay">Αρχική Μέρα</label>
            <input type="number" name="startDay" />
            <label htmlFor="endYear">Τελικό Ετός</label>
            <input type="number" name="endYear" />
            <label htmlFor="endMonth">Τελικός Μηνας</label>
            <input type="number" name="endMonth" />
            <label htmlFor="endDay">Τελική Μέρα</label>
            <input type="number" name="endDay" />
            <button type="submit">Αναζήτηση</button>
          </form>
        );
        break;
      case "phi-year":
        setContent(
          <form
            onSubmit={findByPhiYear}
            className={"requests--byPhi"}
            id={"requests--byPhi"}
          >
            <h1>Αναζήτηση με Ετός και Φ</h1>
            <label htmlFor="phi">Αριθμός Φ</label>
            <input type="number" name="phi" />
            <label htmlFor="year">Έτος</label>
            <input type="number" name="year" />
            <button type="submit">Αναζήτηση</button>
          </form>
        );
        break;
      case "vehicle":
        setContent(
          <form
            onSubmit={findByVehicle}
            className={"requests--byVehicle"}
            id={"requests--byVehicle"}
          >
            <h1>Αναζήτηση με Όχημα</h1>
            <label htmlFor="vehicleId">Όχημα</label>
            <select name="vehicleId" defaultValue="">
              {vehicles.map((vehicle) => {
                return (
                  <option key={vehicle.id} value={vehicle.id}>
                    {vehicle.id}: {vehicle.plate}
                  </option>
                );
              })}
              <option value="">none</option>
            </select>
            <button type="submit">Αναζήτηση</button>
          </form>
        );
        break;
      default:
        break;
    }
  }, [state, navigate, vehicles]);

  return (
    <>
      <main className={"requests"}>{content}</main>
      <ModalWrapper modal={modal} modalActions={modalActions} />
    </>
  );
}

export default GetRequests;