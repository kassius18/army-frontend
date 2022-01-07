import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./getRequests.scss";

function GetRequests() {
  const navigate = useNavigate();
  const url = "https://dentoid-gleam.000webhostapp.com/requests/";
  // const url = "http://army-backend.com/requests/";

  const findByDate = (event) => {
    event.preventDefault();
    const getHttpRequestParams = {};
    getHttpRequestParams.startYear = parseInt(event.target.startYear.value);
    getHttpRequestParams.startMonth = parseInt(event.target.startMonth.value);
    getHttpRequestParams.startDay = parseInt(event.target.startDay.value);
    getHttpRequestParams.endYear = parseInt(event.target.endYear.value);
    getHttpRequestParams.endMonth = parseInt(event.target.endMonth.value);
    getHttpRequestParams.endDay = parseInt(event.target.endDay.value);
    getHttpRequestParams.findBy = "date";

    axios
      .get(url, {
        params: {
          ...getHttpRequestParams,
        },
      })
      .then(function (response) {
        console.log(response.data);
        navigate("/request/print", {
          state: response.data,
        });
      })
      .catch(function (error) {
        console.log(error);
      })
      .then(function () {
        // always executed
      });
  };

  const findByPhi = (event) => {
    event.preventDefault();
    const getHttpRequestParams = {};
    getHttpRequestParams.year = parseInt(event.target.year.value);
    getHttpRequestParams.firstPartOfPhi = parseInt(
      event.target.firstPartOfPhi.value
    );
    getHttpRequestParams.secondPartOfPhi = parseInt(
      event.target.secondPartOfPhi.value
    );
    getHttpRequestParams.findBy = "phi";

    axios
      .get("http://army-backend.com/requests/", {
        params: {
          ...getHttpRequestParams,
        },
      })
      .then(function (response) {
        navigate("/request/print", {
          state: response.data,
        });
      })
      .catch(function (error) {
        console.log(error);
      })
      .then(function () {
        // always executed
      });
  };

  return (
    <>
      <main className={"requests"}>
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
        <form
          onSubmit={findByPhi}
          className={"requests--byPhi"}
          id={"requests--byPhi"}
        >
          <h1>Find By Phi</h1>
          <label htmlFor="firstPartOfPhi">First Part Of Phi</label>
          <input type="number" name="firstPartOfPhi" />
          <label htmlFor="secondPartOfPhi">Second Part Of Phi</label>
          <input type="number" name="secondPartOfPhi" />
          <label htmlFor="year">Year</label>
          <input type="number" name="year" />
          <button type="submit">Submit</button>
        </form>
      </main>
    </>
  );
}

export default GetRequests;
