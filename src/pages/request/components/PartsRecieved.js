import { useRef } from "react";

function PartsRecieved({ parts, isHidden, addPart }) {
  const wrapperDiv = useRef();

  return (
    <div
      className="request__parts-recieved"
      style={{ height: isHidden ? "0" : (parts.length + 2) * 60 }}
    >
      <div className={"request__parts-recieved__header"} ref={wrapperDiv}>
        <div>Ημερομηνια</div>
        <div>Π αρ</div>
        <div>Χωρηγησεις</div>
        <div>Καρτελα εργασιας</div>
        <div>Παρατηρησεις</div>
        {parts.map((part) => {
          return (
            <div key={part.id} style={{ display: "contents" }}>
              <div>{part.date}</div>
              <div>{part.pieNumber}</div>
              <div>{part.amountRecieved}</div>
              <div>{part.tab}</div>
              <div>{part.observation}</div>
            </div>
          );
        })}
        <button onClick={addPart}>Add</button>
      </div>
    </div>
  );
}
export default PartsRecieved;
