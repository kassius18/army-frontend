function HiddenRows({ headers, rows, isHidden }) {
  return (
    <>
      <tr className={isHidden ? "table__hidden" : "table__shown"}>
        <td scope="col">Ημερομηνια</td>
        <td scope="col">Χωρηγησεις</td>
        <td scope="col">Καρτελα εργασιας</td>
        <td scope="col">Παρατηρησεις</td>
      </tr>
      <tr className={isHidden ? "table__hidden" : "table__shown"}>
        <td>first</td>
        <td>second</td>
        <td>third</td>
        <td>fourth</td>
      </tr>
    </>
  );
}
export default HiddenRows;
