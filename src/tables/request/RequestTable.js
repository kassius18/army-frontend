import React, { useState, useRef, useEffect } from "react";
import "./table_structure.scss";

import TableHeader from "./TableHeader";
import TableRow from "./TableRow";
import TableFoter from "./TableFooter";
import uuid from "react-uuid";

function RequestTable({ request }) {
  const [contentSpace, setContentSapce] = useState(0);
  const headerRef = useRef(0);
  const [numOfEmptyRows, setNumOfEmptyRows] = useState(0);
  const paperHeight = 697;
  const emptyRowHeight = 26.45;
  const entries = request.entries || [];
  const tableRef = useRef(null);

  useEffect(() => {
    const contentSpace = tableRef.current.clientHeight;
    if (contentSpace < paperHeight) {
      const blankSpace = paperHeight - contentSpace;
      setNumOfEmptyRows(Math.floor(blankSpace / emptyRowHeight));
    }
  }, [request]);

  let iterationArray = [];
  if (numOfEmptyRows) {
    iterationArray = Array(numOfEmptyRows).fill(numOfEmptyRows);
  }

  return (
    <div className="request__table">
      <table ref={tableRef} cellSpacing="0" border="0">
        <colgroup>
          <col width="92"></col>
          <col width="120"></col>
          <col width="96"></col>
          <col width="141"></col>
          <col width="67"></col>
          <col width="78"></col>
          <col width="81"></col>
          <col width="31"></col>
          <col width="84"></col>
          <col width="102"></col>
          <col width="51"></col>
          <col width="123"></col>
        </colgroup>
        <tbody className="request__table header" ref={headerRef}>
          <TableHeader />
        </tbody>
        <tbody className="table__body rows">
          {entries.map((entry) => {
            return <TableRow row={entry} key={uuid()} />;
          })}
        </tbody>
        <TableFoter headerRef={headerRef} request={request} />
      </table>
    </div>
  );
}

export default RequestTable;
