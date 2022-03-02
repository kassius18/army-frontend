import PartsRecievedHeader from "./PartsRecievedHeader";
import PartsRecievedBody from "./PartsRecievedBody";

function PartsRecieved({
  parts,
  isHidden,
  entryId,
  requestActions,
  modalActions,
}) {
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
        modalActions={modalActions}
      />
    </div>
  );
}
export default PartsRecieved;
