import React, { useRef, useEffect, useState } from "react";
import EmptyRow from "./EmptyRow";
function TableFooter({ shouldRerender }) {
  const paperHeight = 1026;
  const emptyRowHeight = 31;
  const footerRef = useRef(0);

  const [emptyRowsToFillFullPage, setEmptyRowsToFillFullPage] = useState(-1);
  const [emptyRowsToFillBefore, setEmptyRowsToFillBefore] = useState(-1);

  useEffect(() => {
    let emptyRowsToFillBeforeNumber =
      emptyRowsToFillBefore !== -1 ? emptyRowsToFillBefore : 0;
    let emptyRowsToFillFullPageNumber =
      emptyRowsToFillFullPage !== -1 ? emptyRowsToFillFullPage : 0;
    let allEmptyRowsHeight =
      (emptyRowsToFillFullPageNumber + emptyRowsToFillBeforeNumber) *
      emptyRowHeight;

    const offsetTop = footerRef.current.offsetTop - allEmptyRowsHeight;
    const remainder = Math.abs((offsetTop % paperHeight) - paperHeight);
    console.log("allEmptyRowsHeight is", allEmptyRowsHeight);
    console.log("remainder is", remainder);
    console.log("current height is", footerRef.current.offsetHeight);
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
  }, [shouldRerender]);

  console.log(
    "empty rows",
    Array(emptyRowsToFillBefore >= 0 ? emptyRowsToFillBefore : 0).fill(1)
  );
  console.log(
    "empty rows to fill full page ",
    Array(emptyRowsToFillFullPage >= 0 ? emptyRowsToFillFullPage : 0).fill(1)
  );
  return (
    <>
      <EmptyRow
        iterationArray={Array(
          emptyRowsToFillBefore >= 0 ? emptyRowsToFillBefore : 0
        ).fill(1)}
      />
      <EmptyRow
        iterationArray={Array(
          emptyRowsToFillFullPage >= 0 ? emptyRowsToFillFullPage : 0
        ).fill(1)}
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
