import React, { useRef, useContext } from "react";
import TableHeader from "./TableHeader";
import TableRow from "./TableRow";
import TableFoter from "./TableFooter";
import uuid from "react-uuid";
import { AppContext } from "context/AppContext";

function RequestTable({ print, request }) {
  const entries = request.entries || [];
  const { vehicles } = useContext(AppContext);
  const vehicle = vehicles.find((vehicle) => {
    return vehicle.id === request.vehicleId;
  });
  const tableRef = useRef(null);

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
        <tbody className="request__table header">
          <TableHeader />
        </tbody>
        <tbody className="table__body rows">
          {entries.map((entry) => {
            return <TableRow row={entry} key={uuid()} vehicle={vehicle} />;
          })}
        </tbody>
        <TableFoter request={request} print={print} />
      </table>
    </div>
  );
}

export default RequestTable;
