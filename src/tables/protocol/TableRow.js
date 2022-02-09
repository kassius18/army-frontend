function TableRow({ entry, firstColumnContent }) {
  const {
    nameNumber,
    name,
    mainPart,
    amountOfOrder,
    observations,
    parts = [],
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
          {parts.map((part, index) => {
            if (index > 2) {
              return null;
            }
            return <p key={part.id}>it exists {part.date}</p>;
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
