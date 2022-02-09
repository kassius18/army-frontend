import PartsRecievedHeader from "./PartsRecievedHeader";
import PartsRecievedBody from "./PartsRecievedBody";

function PartsRecieved({ parts = [], isHidden, entryId, setEntriesParts }) {
  return (
    <div
      className="parts-recieved"
      style={{ height: isHidden ? "0" : (parts.length + 2) * 60 }}
    >
      <PartsRecievedHeader />
      <PartsRecievedBody
        partsProp={parts}
        entryId={entryId}
        setEntriesParts={setEntriesParts}
      />
    </div>
  );
}
export default PartsRecieved;
