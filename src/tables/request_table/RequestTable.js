import React from "react";
import "./table_structure.css";

import TableHeader from "./TableHeader";
import TableRow from "./TableRow";
import TableFoter from "./TableFooter";
import uuid from "react-uuid";

function RequestTable({ headerData, request, footerData }) {
  return (
    <div className="request__table">
      <table cellSpacing="0" border="0">
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
          <col width="68"></col>
        </colgroup>
        <tbody>
          <TableHeader headerData={headerData} />
        </tbody>
        <tbody className="table_body">
          {request.entries.map((entry) => {
            return <TableRow row={entry} key={uuid()} />;
          })}
        </tbody>
        <tbody>
          <TableFoter footerData={footerData} />
        </tbody>
      </table>
    </div>
  );
}

export default RequestTable;
