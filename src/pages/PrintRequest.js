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

  return (
    <>
      {!isPrintClicked
        ? requests.map((request) => {
            return <Request request={request} key={uuid()} />;
          })
        : requests.map((request) => {
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
