import "./request.scss";
import RequestHeader from "./RequestHeader";
import RequestFooter from "./RequestFooter";
import Entry from "./Entry";
import { useReactToPrint } from "react-to-print";
import { useRef } from "react";
import ProtocolTableStructure from "../tables/protocol_table/ProtocolTableStructure";

function Request({ request }) {
  const comRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => comRef.current,
  });

  return (
    <>
      <div className="request">
        <table className="table table-striped">
          <RequestHeader />
          <tbody>
            {request.entries.map((entry) => {
              return <Entry entry={entry} key={entry.id} />;
            })}
          </tbody>
        </table>
        <RequestFooter request={request} />
        <button onClick={handlePrint}>Print</button>
        <div style={{ display: "none" }}>
          <div ref={comRef}>
            <ProtocolTableStructure
              headerData={""}
              footerData={""}
              request={request}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default Request;
