import { useLocation } from "react-router-dom";
import uuid from "react-uuid";
import { useState } from "react";
import RequestTable from "../../../tables/request_table/RequestTable";
import Request from "../Request";

function PrintRequest() {
  const { state } = useLocation();
  const requests = state;
  const [isPrintClicked, setIsPrintClicked] = useState(false);

  const printRequest = () => {
    setIsPrintClicked(true);
  };

  return (
    <>
      {!isPrintClicked
        ? requests.map((request) => {
            return <Request request={request} key={uuid()} />;
          })
        : requests.map((request) => {
            return (
              <RequestTable headerData={""} request={request} footerData={""} />
            );
          })}
      <button onClick={printRequest}>Print</button>
    </>
  );
}

export default PrintRequest;
