import { useRef } from "react";

function TableRow({ row, vehicle = { plate: "" } }) {
  const rowRef = useRef(-1);

  const {
    nameNumber,
    name,
    mainPart,
    amountOfOrder,
    unitOfOrder,
    reasonOfOrder,
    priorityOfOrder,
  } = row;

  return (
    <>
      <tr ref={rowRef}>
        <td>
          {rowRef.current.offsetTop !== undefined
            ? rowRef.current.offsetTop
            : null}
        </td>
        <td>{nameNumber}</td>
        <td>
          <br />
        </td>
        <td> {name} </td>
        <td> {mainPart} </td>
        <td> {amountOfOrder} </td>
        <td>
          <br />
        </td>
        <td> {unitOfOrder} </td>
        <td> {reasonOfOrder} </td>
        <td> {priorityOfOrder} </td>
        <td>
          <br />
        </td>
        <td> {vehicle.plate} </td>
      </tr>
    </>
  );
}

export default TableRow;
