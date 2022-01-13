import PartsRecievedHeader from "./PartsRecievedHeader";
import PartsRecievedBody from "./PartsRecievedBody";

function PartsRecieved({ parts, isHidden, addPart }) {
  return (
    <div
      className="parts-recieved"
      style={{ height: isHidden ? "0" : (parts.length + 2) * 60 }}
    >
      <PartsRecievedHeader />
      <PartsRecievedBody parts={parts} />
      <button onClick={addPart}>Add</button>
    </div>
  );
}
export default PartsRecieved;
