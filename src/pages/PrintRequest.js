import { useLocation } from "react-router-dom";
import Request from "./Request";
import uuid from "react-uuid";
import { useState } from "react";
import ProtocolTableStructure from "../tables/protocol_table/ProtocolTableStructure";

function PrintRequest() {
  const { state } = useLocation();
  const requests = state;
  const [isPrintClicked, setIsPrintClicked] = useState(false);

  const printRequest = () => {
    setIsPrintClicked(true);
  };

  console.log("requsts are");
  console.log(requests);

  return (
    <>
      {!isPrintClicked
        ? requests.map((request) => {
            return <Request request={request} key={uuid()} />;
          })
        : requests.map((request) => {
            console.log("loop");
            console.log(request);
            return (
              <ProtocolTableStructure
                headerData={""}
                request={request}
                footerData={""}
              />
            );
          })}
      <button onClick={printRequest}>Print</button>
    </>
  );
}

export default PrintRequest;
