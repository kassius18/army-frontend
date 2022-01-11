function PartsRecieved({ parts, isHidden }) {
  console.log("isHidden", isHidden);
  return (
    <div
      className={
        "request__parts-recieved request__parts-recieved__header " +
        (isHidden ? "hidden" : "")
      }
    >
      <div>Ημερομηνια</div>
      <div>Π αρ</div>
      <div>Χωρηγησεις</div>
      <div>Καρτελα εργασιας</div>
      <div>Παρατηρησεις</div>
      {parts.map((part) => {
        return (
          <>
            <div>part.date</div>
            <div>part.pieNum nu</div>
            <div>part.amountRecieved</div>
            <div>tab </div>
            <div>part.observation</div>
          </>
        );
      })}
      <button>Add</button>
    </div>
  );
}
export default PartsRecieved;
