import React from "react";

function YearClosed({ year }) {
  return (
    <>
      <div className="wrapper-end">
        <div className="table__cell"></div>
        <div className="table__cell lined"></div>
        <div className="table__cell"></div>
      </div>
      <div className="wrapper-start">
        <div className="table__cell center">ΚΛΕΙΝΕΤΑΙ ΓΙΑ ΤΟ ΕΤΟΣ {year}</div>
        <div className="table__cell center">ΕΤΟΣ {year + 1}</div>
      </div>
    </>
  );
}

export default YearClosed;
