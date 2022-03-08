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
    <div className={"parts-recieved" + (isHidden ? " hidden" : "")}>
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
