import React from "react";
import "./table_structure.scss";

import TableHeader from "./TableHeader";
import TableRow from "./TableRow";

function ProtocolTable({ request }) {
  const firstPartOfPhi = request.firstPartOfPhi;
  const date = request.year;
  const entries = request.entries;

  return (
    <table className="protocol__table">
      <colgroup>
        <col width="93" />
        <col width="154" />
        <col width="157" />
        <col width="369" />
        <col width="116" />
        <col width="73" />
        <col width="128" />
        <col width="153" />
        <col width="93" />
        <col width="73" />
        <col width="126" />
      </colgroup>
      <tbody>
        <TableHeader />
        {request.entries.map((entry, index) => {
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
    </table>
  );
}

export default ProtocolTable;
