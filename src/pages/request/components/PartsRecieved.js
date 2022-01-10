function PartsRecieved({ parts, isHidden }) {
  return (
    <>
      {isHidden === true && (
        <tr>
          <th scope="col">Ημερομηνια</th>
          <th scope="col">Π αρ</th>
          <th scope="col">Χωρηγησεις</th>
          <th scope="col">Καρτελα εργασιας</th>
          <th scope="col">Παρατηρησεις</th>
        </tr>
      )}
      {parts.map((part) => {
        return (
          <tr>
            <td>date</td>
            <td>p nu</td>
            <td>amount recieved</td>
            <td>tab </td>
            <td>observation or vehicle</td>
          </tr>
        );
      })}
    </>
  );
}
export default PartsRecieved;
