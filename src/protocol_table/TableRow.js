// function TableRow({
// }) {
function TableRow({ row }) {
  const {
    nameNumber,
    name,
    mainMaterial,
    amountOfOrder,
    unitOfOrder,
    reasonOfOrder,
    priorityOfOrder,
  } = row;
  return (
    <tr>
      <td
        style={{
          borderTop: "1px solid #33cccc",
          borderBottom: "1px solid #33cccc",
          borderLeft: "1px solid #33cccc",
          borderRight: "1px solid #33cccc",
          valign: "middle",
          height: "33",
          align: "left",
        }}
      >
        <br />
      </td>
      <td
        style={{
          borderTop: "1px solid #33cccc",
          borderBottom: "1px solid #33cccc",
          borderLeft: "1px solid #33cccc",
          borderRight: "1px solid #33cccc",
          align: "left",
        }}
      >
        <font size="1" color="#000000">
          {nameNumber}
        </font>
      </td>
      <td
        style={{
          borderTop: "1px solid #33cccc",
          borderBottom: "1px solid #33cccc",
          borderLeft: "1px solid #33cccc",
          borderRight: "1px solid #33cccc",
          align: "left",
        }}
      >
        <font size="1" color="#000000">
          <br />
        </font>
      </td>
      <td
        style={{
          borderTop: "1px solid #33cccc",
          borderBottom: "1px solid #33cccc",
          borderLeft: "1px solid #33cccc",
          borderRight: "1px solid #33cccc",
          align: "left",
        }}
      >
        <font size="1" color="#000000">
          {name}
        </font>
      </td>
      <td
        style={{
          borderTop: "1px solid #33cccc",
          borderBottom: "1px solid #33cccc",
          borderLeft: "1px solid #33cccc",
          borderRight: "1px solid #33cccc",
          align: "left",
        }}
      >
        <font size="1" color="#000000">
          {mainMaterial}
        </font>
      </td>
      <td
        style={{
          borderTop: "1px solid #33cccc",
          borderBottom: "1px solid #33cccc",
          borderLeft: "1px solid #33cccc",
          borderRight: "1px solid #33cccc",
          sdval: "1",
          sdnum: "1033",
          align: "left",
        }}
      >
        <font size="1" color="#000000">
          {amountOfOrder}
        </font>
      </td>
      <td
        style={{
          borderTop: "1px solid #33cccc",
          borderBottom: "1px solid #33cccc",
          borderLeft: "1px solid #33cccc",
          borderRight: "1px solid #33cccc",
          valign: "middle",
          align: "left",
        }}
      >
        <font size="1">
          <br />
        </font>
      </td>
      <td
        style={{
          borderTop: "1px solid #33cccc",
          borderBottom: "1px solid #33cccc",
          borderLeft: "1px solid #33cccc",
          borderRight: "1px solid #33cccc",
          valign: "middle",
          align: "left",
        }}
      >
        <font size="1">{unitOfOrder}</font>
      </td>
      <td
        style={{
          borderTop: "1px solid #33cccc",
          borderBottom: "1px solid #33cccc",
          borderLeft: "1px solid #33cccc",
          borderRight: "1px solid #33cccc",
          sdnum: "1033",
          valign: "middle",
          align: "left",
        }}
      >
        <font size="1">{reasonOfOrder}</font>
      </td>
      <td
        style={{
          borderTop: "1px solid #33cccc",
          borderBottom: "1px solid #33cccc",
          borderLeft: "1px solid #33cccc",
          borderRight: "1px solid #33cccc",
          sdnum: "1033",
          valign: "middle",
          align: "left",
        }}
      >
        <font size="1">{priorityOfOrder}</font>
      </td>
      <td
        style={{
          borderTop: "1px solid #33cccc",
          borderBottom: "1px solid #33cccc",
          borderLeft: "1px solid #33cccc",
          borderRight: "1px solid #33cccc",
          valign: "middle",
          align: "left",
        }}
      >
        <font size="1">
          <br />
        </font>
      </td>
      <td
        style={{
          borderTop: "1px solid #33cccc",
          borderBottom: "1px solid #33cccc",
          borderLeft: "1px solid #33cccc",
          borderRight: "1px solid #33cccc",
          sdnum: "1033",
          valign: "middle",
          align: "left",
        }}
      >
        <font size="1">
          <br />
        </font>
      </td>
      <td align="left">
        <br />
      </td>
    </tr>
  );
}

export default TableRow;
