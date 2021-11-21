import React from "react";
import ReactDom from "react-dom";
import "./table_structure.css";
import { IoMdAddCircle } from "react-icons/io";
import { FaSave } from "react-icons/fa";
import { AiFillPrinter } from "react-icons/ai";

import TableHeader from "./TableHeader";
import TableRow from "./TableRow";
import TableFoter from "./TableFooter";
import { useState } from "react";

const ProtocolTableStructure = React.forwardRef(
  ({ headerData, rows, footerData }, ref) => {
    const [allRows, setRows] = useState(rows);

    const addRow = () => {
      setRows([...allRows, {}]);
    };

    const deleteRow = (partialId) => {
      const newRows = allRows.filter((element, index) => index !== partialId);
      setRows(newRows);
    };

    const editRow = (newRow, partialId) => {
      setRows(
        allRows.map((oldRow, index) => {
          if (index === partialId) {
            return newRow;
          } else return oldRow;
        })
      );
    };

    const saveTable = () => {};

    const printAsPdf = () => {};

    return (
      <div ref={ref}>
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
            {allRows.map((row, index) => {
              return (
                <TableRow
                  row={row}
                  key={index}
                  partialId={index}
                  deleteRow={deleteRow}
                  editRow={editRow}
                />
              );
            })}
          </tbody>
          <tbody>
            <TableFoter footerData={footerData} />
          </tbody>
        </table>
        <div
          className="buttons"
          style={{ display: "flex", flexDirection: "row" }}
        >
          <IoMdAddCircle
            onClick={addRow}
            style={{ fontSize: "2rem", color: "green" }}
          />
          <FaSave
            onClick={saveTable}
            style={{ fontSize: "2rem", color: "green" }}
          />
          <AiFillPrinter
            onClick={printAsPdf}
            style={{ fontSize: "2rem", color: "green" }}
          />
        </div>
      </div>
    );
  }
);

export default ProtocolTableStructure;
