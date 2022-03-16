import React, { useRef, useEffect, useState } from "react";
import EmptyRow from "./EmptyRow";
function TableFooter(print) {
  const paperHeight = 697;
  const emptyRowHeight = 14;
  const footerRef = useRef(0);

  const [emptyRowsToFillFullPage, setEmptyRowsToFillFullPage] = useState(-1);
  const [emptyRowsToFillBefore, setEmptyRowsToFillBefore] = useState(-1);

  useEffect(() => {
    const offsetTop = footerRef.current.offsetTop;

    const remainder = Math.abs((offsetTop % paperHeight) - paperHeight);

    if (remainder > emptyRowHeight) {
      setEmptyRowsToFillBefore(
        Math.floor((remainder - emptyRowHeight) / emptyRowHeight)
      );
      setEmptyRowsToFillFullPage(-1);
    }
  }, [print]);

  return (
    <>
      <tbody ref={footerRef} className="table__body">
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
      </tbody>
    </>
  );
}

export default TableFooter;
