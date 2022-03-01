import React from "react";
import "./table_structure.scss";

import TableHeader from "./TableHeader";
import TableRow from "./TableRow";
import TableFooter from "./TableFooter";

function ProtocolTable({ print, request }) {
  const firstPartOfPhi = request.firstPartOfPhi;
  const date = `${request.day}/${request.month}/${request.year}`;
  const entries = request.entries || [];

  return (
    <table className="protocol__table">
      <colgroup>
        <col width="93" />
        <col width="154" />
        <col width="157" />
        <col width="369" />
        <col width="116" />
        <col width="73" />
        <col width="153" />
        <col width="93" />
        <col width="73" />
        <col width="126" />
      </colgroup>
      <tbody className="table__body">
        <TableHeader />
        {entries.map((entry, index) => {
          if (index === 0) {
            return (
              <TableRow
                entry={entry}
                firstColumnContent={firstPartOfPhi}
                key={entry.id}
              />
            );
          } else if (index === 1) {
            return (
              <TableRow
                entry={entry}
                firstColumnContent={date}
                key={entry.id}
              />
            );
          }
          return <TableRow entry={entry} key={entry.id} />;
        })}
      </tbody>
      <TableFooter print={print} />
    </table>
  );
}

export default ProtocolTable;
