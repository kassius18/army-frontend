import { useRef } from "react";

function PartsRecieved({ parts, isHidden, addPart }) {
  const wrapperDiv = useRef();

  return (
    <div
      className="parts-recieved"
      style={{ height: isHidden ? "0" : (parts.length + 2) * 60 }}
    >
      <div className={"parts-recieved__header"} ref={wrapperDiv}>
        <div>Ημερομηνια</div>
        <div>Π αρ</div>
        <div>Χωρηγησεις</div>
        <div>Καρτελα εργασιας</div>
        <div>Παρατηρησεις</div>
      </div>
      {parts.map((part) => {
        return (
          <div
            key={part.id}
            style={{ display: "contents" }}
            className="parts-recieved__row"
          >
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
  );
}
export default PartsRecieved;
