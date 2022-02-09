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
      <div className="table__cell center">{rowNumber}</div>
      <div className="table__cell center text-vertical">{dateRecieved}</div>
      <div className="table__cell center"></div>
      <div className="table__cell center">{pieNumber}</div>
      <div className="table__cell center">{amountRecieved}</div>
      <div className="table__cell center">{amountUsed}</div>
      <div className="table__cell center">{currentTotal}</div>
      <div className="table__cell center">{observation}</div>
    </div>
  );
}

export default TableRow;
