import PartsRecievedHeader from "./PartsRecievedHeader";
import PartsRecievedBody from "./PartsRecievedBody";

function PartsRecieved({
  parts,
  isHidden,
  entry,
  editEntry,
  requestActions,
  modalActions,
}) {
  return (
    <div className={"parts-recieved" + (isHidden ? " hidden" : "")}>
      <PartsRecievedHeader />
      <PartsRecievedBody
        parts={parts}
        entry={entry}
        editEntry={editEntry}
        requestActions={requestActions}
        modalActions={modalActions}
      />
    </div>
  );
}
export default PartsRecieved;
