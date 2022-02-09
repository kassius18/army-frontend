import TableRow from "./TableRow";
function TableRowWithEnd({ part, yearRecieved, currentTotal }) {
  return (
    <>
      <TableRow
        part={part}
        key={part.id}
        yearRecieved={yearRecieved}
        currentTotal={currentTotal}
      />
      <div className="wrapper-end">
        <div className="table__cell"></div>
        <div className="table__cell lined"></div>
        <div className="table__cell"></div>
      </div>
      <div className="wrapper-start">
        <div className="table__cell center">
          ΚΛΕΙΝΕΤΑΙ ΓΙΑ ΤΟ ΕΤΟΣ {yearRecieved}
        </div>
      </div>
    </>
  );
}

export default TableRowWithEnd;
