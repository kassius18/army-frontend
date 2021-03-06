import requestApi from "apis/requestApi";
import { useNavigate } from "react-router-dom";
import { useReducer } from "react";
import ModalWrapper from "modals/ModalWrapper";
import { modalReducer, modalDispatchMap } from "reducers/modalReducer";
import { useContext } from "react";
import { AppContext } from "context/AppContext";

function GetRequests() {
  const navigate = useNavigate();
  const [modal, modalDispatch] = useReducer(modalReducer, "");
  const modalActions = modalDispatchMap(modalDispatch);
  const { vehicles } = useContext(AppContext);

  const findByVehicle = (event) => {
    event.preventDefault();
    const vehicleId = parseInt(event.target.vehicleId.value) || null;

    if (vehicleId) {
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
    } else {
      modalActions.openNotFoundModal(modalActions.closeModal);
    }
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
    getHttpRequestParams.endYear = parseInt(event.target.endYear.value) || null;
    getHttpRequestParams.endMonth =
      parseInt(event.target.endMonth.value) || null;
    getHttpRequestParams.endDay = parseInt(event.target.endDay.value) || null;
    getHttpRequestParams.findBy = "date";

    requestApi
      .getRequestByDateInterval(getHttpRequestParams)
      .then((response) => {
        if (response.success) {
          if (Object.keys(response.requests).length) {
            navigate("/requests/list", { state: response.requests });
          } else {
            modalActions.openNotFoundModal(modalActions.closeModal);
          }
        } else {
          modalActions.openApiErrorModal(
            modalActions.closeModal,
            response.error
          );
        }
      });
  };

  const findByPhiYear = (event) => {
    event.preventDefault();
    const year = parseInt(event.target.year.value) || null;
    const phi = parseInt(event.target.phi.value) || null;

    if (year !== null && phi !== null) {
      requestApi.getRequestByPhiYear(year, phi).then((response) => {
        if (response.success) {
          if (Object.keys(response.requests).length) {
            navigate("/requests/list", { state: response.requests });
          } else {
            modalActions.openNotFoundModal(modalActions.closeModal);
          }
        } else {
          modalActions.openApiErrorModal(
            modalActions.closeModal,
            response.error
          );
        }
      });
    } else {
      modalActions.openNotFoundModal(modalActions.closeModal);
    }
  };

  const findByPhi = (event) => {
    event.preventDefault();
    const firstPartOfPhi = parseInt(event.target.firstPartOfPhi.value) || null;

    if (firstPartOfPhi) {
      requestApi.getRequestByPhi(firstPartOfPhi).then((response) => {
        if (response.success) {
          if (Object.keys(response.requests).length) {
            navigate("/requests/list", { state: response.requests });
          } else {
            modalActions.openNotFoundModal(modalActions.closeModal);
          }
        } else {
          modalActions.openApiErrorModal(
            modalActions.closeModal,
            response.error
          );
        }
      });
    } else {
      modalActions.openNotFoundModal(modalActions.closeModal);
    }
  };

  return (
    <>
      <main className={"requests__find"}>
        <form onSubmit={findByPhi} className={"by-phi"} id={"requests--byPhi"}>
          <h1>?????????????????? ???? ??</h1>
          <div className="input">
            <label htmlFor="firstPartOfPhi">?????????????? ??</label>
            <input type="number" name="firstPartOfPhi" />
          </div>
          <div className="input__bottom">
            <button type="submit">??????????????????</button>
          </div>
        </form>
        <form
          onSubmit={findByDate}
          className={"requests--byDate"}
          id={"requests--byDate"}
        >
          <h1 className="input__top">?????????????????? ???? ????????????????????</h1>
          <div className="input__left">
            <div className="input">
              <label htmlFor="startYear">???????????? ????????</label>
              <input type="number" name="startYear" />
            </div>
            <div className="input">
              <label htmlFor="startMonth">?????????????? ??????????</label>
              <input type="number" name="startMonth" />
            </div>
            <div className="input">
              <label htmlFor="startDay">???????????? ????????</label>
              <input type="number" name="startDay" />
            </div>
          </div>
          <div className="input__right">
            <div className="input">
              <label htmlFor="endYear">???????????? ????????</label>
              <input type="number" name="endYear" />
            </div>
            <div className="input">
              <label htmlFor="endMonth">?????????????? ??????????</label>
              <input type="number" name="endMonth" />
            </div>
            <div className="input">
              <label htmlFor="endDay">???????????? ????????</label>
              <input type="number" name="endDay" />
            </div>
          </div>
          <div className="input__bottom">
            <button type="submit">??????????????????</button>
          </div>
        </form>
        <form
          onSubmit={findByPhiYear}
          className={"requests--byPhi"}
          id={"requests--byPhi"}
        >
          <h1>?????????????????? ???? ???????? ?????? ??</h1>
          <div className="input">
            <label htmlFor="phi">?????????????? ??</label>
            <input type="number" name="phi" />
          </div>
          <div className="input">
            <label htmlFor="year">????????</label>
            <input type="number" name="year" />
          </div>
          <div className="input__bottom">
            <button type="submit">??????????????????</button>
          </div>
        </form>
        <form
          onSubmit={findByVehicle}
          className={"requests--byVehicle"}
          id={"requests--byVehicle"}
        >
          <h1>?????????????????? ???? ??????????</h1>
          <div className="input">
            <label htmlFor="vehicleId">??????????</label>
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
          </div>
          <div className="input__bottom">
            <button type="submit">??????????????????</button>
          </div>
        </form>
      </main>
      <ModalWrapper modal={modal} modalActions={modalActions} />
    </>
  );
}

export default GetRequests;
