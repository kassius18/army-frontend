function TableRow({ part, rowNumber, currentTotal }) {
  const {
    dateRecieved,
    amountUsed,
    pieNumber,
    amountRecieved,
    observation,
    dateUsed,
  } = part;

  return (
    <div className="wrapper-8fr row">
      <div className="table__cell center" style={{ width: "52px" }}>
        {rowNumber}
      </div>
      <div
        className="table__cell center text-vertical"
        style={{ width: "96.5px" }}
      >
        {dateRecieved ? dateRecieved : dateUsed}
      </div>
      <div
        className="table__cell center"
        style={{ width: "82.5px", whiteSpace: "nowrap" }}
      ></div>
      <div className="table__cell center" style={{ width: "82.5px" }}>
        {pieNumber}
      </div>
      <div className="table__cell center" style={{ width: "88.5px" }}>
        {amountRecieved}
      </div>
      <div className="table__cell center" style={{ width: "88.5px" }}>
        {amountUsed}
      </div>
      <div className="table__cell center" style={{ width: "88.5px" }}>
        {currentTotal}
      </div>
      <div className="table__cell center">{observation}</div>
    </div>
  );
}

export default TableRow;
