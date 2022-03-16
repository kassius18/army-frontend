import React, { useRef, useEffect, useState } from "react";
import EmptyRow from "./EmptyRow";
function TableFooter({ print }) {
  const paperHeight = 1026;
  const emptyRowHeight = 31;
  const footerRef = useRef(0);

  const [emptyRowsToFillFullPage, setEmptyRowsToFillFullPage] = useState(-1);
  const [emptyRowsToFillBefore, setEmptyRowsToFillBefore] = useState(-1);

  useEffect(() => {
    const offsetTop = footerRef.current.offsetTop;
    const remainder = Math.abs((offsetTop % paperHeight) - paperHeight);
    if (remainder > footerRef.current.offsetHeight) {
      setEmptyRowsToFillBefore(
        Math.floor(
          (remainder - footerRef.current.offsetHeight) / emptyRowHeight
        )
      );
      setEmptyRowsToFillFullPage(-1);
    } else {
      setEmptyRowsToFillBefore(Math.floor(remainder / emptyRowHeight));
      setEmptyRowsToFillFullPage(
        Math.floor(
          (paperHeight - footerRef.current.offsetHeight) / emptyRowHeight
        )
      );
    }
  }, [print]);

  return (
    <>
      <EmptyRow
        iterationArray={Array(
          emptyRowsToFillBefore >= 0 ? emptyRowsToFillBefore : 0
        ).fill(1)}
        isFillBefore={true}
        pageOfEmptyRows={emptyRowsToFillFullPage > 0 && true}
      />
      {emptyRowsToFillFullPage > 0 ? <div className="page-break-tab" /> : null}
      <EmptyRow
        iterationArray={Array(
          emptyRowsToFillFullPage >= 0 ? emptyRowsToFillFullPage : 0
        ).fill(1)}
        pageOfEmptyRows={emptyRowsToFillFullPage > 0 && true}
      />
      <div ref={footerRef}>
        <div className="wrapper-1fr">
          <div className="table__cell">ΣΕ ΜΕΤΑΦΟΡΑ</div>
        </div>
        <div className="wrapper-13fr">
          <div className="table__cell">30. ΤΜΗΜΑΤΑ</div>
          <div className="table__cell"></div>
          <div className="table__cell"></div>
          <div className="table__cell"></div>
          <div className="table__cell"></div>
          <div className="table__cell"></div>
          <div className="table__cell"></div>
          <div className="table__cell"></div>
          <div className="table__cell"></div>
          <div className="table__cell"></div>
          <div className="table__cell"></div>
          <div className="table__cell"></div>
          <div className="table__cell"></div>
        </div>
        <div className="wrapper-13fr">
          <div className="table__cell">31. ΠΡΟΒΛΕΠΟΜΕΝΑ</div>
          <div className="table__cell"></div>
          <div className="table__cell"></div>
          <div className="table__cell"></div>
          <div className="table__cell"></div>
          <div className="table__cell"></div>
          <div className="table__cell"></div>
          <div className="table__cell"></div>
          <div className="table__cell"></div>
          <div className="table__cell"></div>
          <div className="table__cell"></div>
          <div className="table__cell"></div>
          <div className="table__cell"></div>
        </div>
        <div className="wrapper-13fr">
          <div className="table__cell">32. ΥΠΑΡΧΟΝΤΑ</div>
          <div className="table__cell"></div>
          <div className="table__cell"></div>
          <div className="table__cell"></div>
          <div className="table__cell"></div>
          <div className="table__cell"></div>
          <div className="table__cell"></div>
          <div className="table__cell"></div>
          <div className="table__cell"></div>
          <div className="table__cell"></div>
          <div className="table__cell"></div>
          <div className="table__cell"></div>
          <div className="table__cell"></div>
        </div>
        <div className="wrapper-13fr">
          <div className="table__cell">33. ΔΙΑΦΟΡΑ</div>
          <div className="table__cell"></div>
          <div className="table__cell"></div>
          <div className="table__cell"></div>
          <div className="table__cell"></div>
          <div className="table__cell"></div>
          <div className="table__cell"></div>
          <div className="table__cell"></div>
          <div className="table__cell"></div>
          <div className="table__cell"></div>
          <div className="table__cell"></div>
          <div className="table__cell"></div>
          <div className="table__cell"></div>
        </div>
      </div>
    </>
  );
}

export default TableFooter;
