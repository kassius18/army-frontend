import PartsRecievedHeader from "./PartsRecievedHeader";
import PartsRecievedBody from "./PartsRecievedBody";

function PartsRecieved({ parts, isHidden, entryId, requestActions }) {
  return (
    <div
      className="parts-recieved"
      style={{ height: isHidden ? "0" : (parts.length + 2) * 60 }}
    >
      <PartsRecievedHeader />
      <PartsRecievedBody
        parts={parts}
        entryId={entryId}
        requestActions={requestActions}
      />
    </div>
  );
}
export default PartsRecieved;
