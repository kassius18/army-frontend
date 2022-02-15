import ApiErrorModal from "modals/ApiErrorModal";
import requestApi from "apis/requestApi";
import { useNavigate, useLocation } from "react-router-dom";
import "./getRequests.scss";
import { useEffect, useState } from "react";

function GetRequests() {
  const navigate = useNavigate();
  const [error, setError] = useState({ sucess: true });
  const [isOpen, setIsOpen] = useState(false);
  const [content, setContent] = useState();
  const { state } = useLocation();

  const closeModal = () => {
    setIsOpen(false);
  };

  const openModal = () => {
    setIsOpen(true);
  };

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
        setError(response.error);
        openModal();
      }
    });
  };

  const findByDate = (event) => {
    event.preventDefault();
    const getHttpRequestParams = {};
    getHttpRequestParams.startYear =
      parseInt(event.target.startYear.value) || null;
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
          navigate("/requests/list", { state: response.requests });
        } else {
          setError(response.error);
          openModal();
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
        setError(response.error);
        openModal();
      }
    });
  };

  useEffect(() => {
    switch (state.findBy) {
      case "phi":
        setContent(
          <form
            onSubmit={findByPhi}
            className={"requests--byPhi"}
            id={"requests--byPhi"}
          >
            <h1>Find ALL By Phi</h1>
            <label htmlFor="firstPartOfPhi">First Part Of Phi</label>
            <input type="number" name="firstPartOfPhi" />
            <button type="submit">Submit</button>
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
            <h1>Find By Date</h1>
            <label htmlFor="startYear">Start Year</label>
            <input type="number" name="startYear" />
            <label htmlFor="startMonth">Start Month</label>
            <input type="number" name="startMonth" />
            <label htmlFor="startDay">Start Day</label>
            <input type="number" name="startDay" />
            <label htmlFor="endYear">End Year</label>
            <input type="number" name="endYear" />
            <label htmlFor="endMonth">End Month</label>
            <input type="number" name="endMonth" />
            <label htmlFor="endDay">End Day</label>
            <input type="number" name="endDay" />
            <button type="submit"> Submit </button>
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
            <h1>Find One By Phi and Year</h1>
            <label htmlFor="phi">First Part Of Phi</label>
            <input type="number" name="phi" />
            <label htmlFor="year">Year</label>
            <input type="number" name="year" />
            <button type="submit">Submit</button>
          </form>
        );
        break;

      default:
        break;
    }
  }, [state]);

  return (
    <>
      <main className={"requests"}>{content}</main>
      <ApiErrorModal
        isModalOpen={isOpen}
        closeModal={closeModal}
        error={error}
      />
    </>
  );
}

export default GetRequests;
