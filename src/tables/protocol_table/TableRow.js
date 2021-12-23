function TableRow({ row }) {
  console.log("the rows are");
  console.log(row);
  const {
    nameNumber,
    name,
    mainPart,
    amountOfOrder,
    unitOfOrder,
    reasonOfOrder,
    priorityOfOrder,
    observations,
  } = row;

  console.log(
    row.nameNumber,
    name,
    mainPart,
    amountOfOrder,
    unitOfOrder,
    reasonOfOrder,
    priorityOfOrder,
    observations
  );

  return (
    <>
      <tr>
        <td>
          <br />
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
        <td> {observations} </td>
      </tr>
    </>
  );
}

export default TableRow;
