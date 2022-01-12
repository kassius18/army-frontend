function TableRow({ entry, firstColumnContent }) {
  console.log("entry");
  const {
    nameNumber,
    name,
    mainPart,
    amountOfOrder,
    observations,
    partsRecieved = [],
  } = entry;

  return (
    <>
      <tr>
        <td>{firstColumnContent}</td>
        <td>{nameNumber}</td>
        <td>serialNumber</td>
        <td>{name}</td>
        <td>{mainPart}</td>
        <td>{amountOfOrder}</td>
        <td>{observations}</td>
        <td>
          {partsRecieved.map((part, index) => {
            if (index > 2) {
              return null;
            }
            return <p>{part.date}</p>;
          })}
        </td>
        <td></td>
        <td></td>
        <td></td>
      </tr>
    </>
  );
}

export default TableRow;