import uuid from "react-uuid";

function TableRow({ entry, firstColumnContent }) {
  const { nameNumber, name, mainPart, amountOfOrder, parts = [] } = entry;

  return (
    <>
      <tr>
        <td>{firstColumnContent}</td>
        <td>{nameNumber}</td>
        <td>serialNumber</td>
        <td>{name}</td>
        <td>{mainPart}</td>
        <td>{amountOfOrder}</td>
        <td>
          {parts.map((part, index) => {
            if (index > 2) {
              return null;
            }
            return (
              <p key={uuid()}>{part.dateRecieved + " " + part.pieNumber}</p>
            );
          })}
        </td>
        <td>
          {parts.map((part, index) => {
            if (index > 2) {
              return null;
            }
            return <p key={uuid()}>{part.amountRecieved}</p>;
          })}
        </td>
        <td>
          {parts.map((part, index) => {
            if (index > 2) {
              return null;
            }
            return <p key={uuid()}>{part.tabUsed}</p>;
          })}
        </td>
        <td>
          {parts.map((part, index) => {
            if (index > 2) {
              return null;
            }
            return <p key={part.id}>{part.dateUsed}</p>;
          })}
        </td>
      </tr>
    </>
  );
}

export default TableRow;
