import "./table_structure.css";
import TableHeader from "./TableHeader";
import TableRow from "./TableRow";
import TableFoter from "./TableFooter";

function ProtocolTable({ headerData, rows, footerData }) {
  // let {nameNumber, name, mainMaterial, amountOfOrder, unitOfOrder, reasonOfOrder, priorityOfOrder} = {props}
  // use a map function here to change the rows into may row objects and then invoke a new row for each one
  console.log(rows);
  return (
    <table cellspacing="0" border="0">
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
        <TableHeader />
        {rows.map((row) => {
          console.log(row);
          return <TableRow row={row} />;
        })}
        <TableFoter />
      </tbody>
    </table>
  );
}

export default ProtocolTable;
