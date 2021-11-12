import { RiDeleteBack2Fill } from "react-icons/ri";
function TableRow({ row, partialId, deleteRow, editRow }) {
  const {
    nameNumber,
    name,
    mainMaterial,
    amountOfOrder,
    unitOfOrder,
    reasonOfOrder,
    priorityOfOrder,
    observations,
  } = row;

  return (
    <>
      <tr
        onChange={(event) => {
          row[event.target.id] = event.target.value;
          editRow(row, partialId);
        }}
      >
        <td>
          <br />
        </td>
        <td>
          <input type="text" id="nameNumber" defaultValue={nameNumber} />
        </td>
        <td>
          <br />
        </td>
        <td>
          <input type="text" id="nameNumber" defaultValue={name} />
        </td>
        <td>
          <input type="text" id="nameNumber" defaultValue={mainMaterial} />
        </td>
        <td>
          <input type="text" id="nameNumber" defaultValue={amountOfOrder} />
        </td>
        <td>
          <br />
        </td>
        <td>
          <input type="text" id="nameNumber" defaultValue={unitOfOrder} />
        </td>
        <td>
          <input type="text" id="nameNumber" defaultValue={reasonOfOrder} />
        </td>
        <td>
          <input type="text" id="nameNumber" defaultValue={priorityOfOrder} />
        </td>
        <td>
          <br />
        </td>
        <td>
          <input type="text" id="nameNumber" defaultValue={observations} />
        </td>
        <td align="left">
          <RiDeleteBack2Fill
            onClick={() => deleteRow(partialId)}
            style={{ color: "red" }}
          />
        </td>
      </tr>
    </>
  );
}

export default TableRow;
