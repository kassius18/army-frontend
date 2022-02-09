import { useEffect, useState, useRef } from "react";

function TableRow({ row }) {
  const paperHeight = 697;
  const rowRef = useRef(-1);
  const [createHeader, setCreateHeader] = useState(false);

  useEffect(() => {
    const remainder = Math.abs(
      (rowRef.current.offsetTop % paperHeight) - paperHeight
    );
    if (remainder < rowRef.current.offsetHeight) {
      setCreateHeader(true);
    }
  }, []);

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

  return (
    <>
      {createHeader && (
        <tr>
          <td
            style={{
              borderTop: "1px solid #33cccc",
              borderBottom: "1px solid #33cccc",
              borderLeft: "1px solid #33cccc",
              borderRight: "1px solid #33cccc",
              valign: "middle",
              height: "37",
              bgcolor: "#CCFFFF",
              align: "center",
            }}
          >
            <b>
              <font size="1" color="#000000">
                ΚΩΔΙΚΑΣ ΕΝΤΥΠΟΥ
              </font>
            </b>
          </td>
          <td
            style={{
              borderTop: "1px solid #33cccc",
              borderBottom: "1px solid #33cccc",
              borderLeft: "1px solid #33cccc",
              borderRight: "1px solid #33cccc",
              valign: "middle",
              bgcolor: "#CCFFFF",
              align: "center",
            }}
          >
            <b>
              <font size="1" color="#000000">
                ΑΡΙΘΜΟΣ ΟΝΟΜΑΣΤΙΚΟΥ
              </font>
            </b>
          </td>
          <td
            style={{
              borderTop: "1px solid #33cccc",
              borderBottom: "1px solid #33cccc",
              borderLeft: "1px solid #33cccc",
              borderRight: "1px solid #33cccc",
              valign: "middle",
              bgcolor: "#CCFFFF",
              align: "center",
            }}
          >
            <b>
              <font size="1" color="#000000">
                Part Number
              </font>
            </b>
          </td>
          <td
            style={{
              borderTop: "1px solid #33cccc",
              borderBottom: "1px solid #33cccc",
              borderLeft: "1px solid #33cccc",
              borderRight: "1px solid #33cccc",
              valign: "middle",
              bgcolor: "#CCFFFF",
              align: "center",
            }}
          >
            <b>
              <font size="1" color="#000000">
                Ονομασία
              </font>
            </b>
          </td>
          <td
            style={{
              borderTop: "1px solid #33cccc",
              borderBottom: "1px solid #33cccc",
              borderLeft: "1px solid #33cccc",
              borderRight: "1px solid #33cccc",
              valign: "middle",
              bgcolor: "#CCFFFF",
              align: "center",
            }}
          >
            <b>
              <font size="1" color="#000000">
                ΚΥΡΙΟ ΥΛΙΚΟ
              </font>
            </b>
          </td>
          <td
            style={{
              borderTop: "1px solid #33cccc",
              borderBottom: "1px solid #33cccc",
              borderLeft: "1px solid #33cccc",
              borderRight: "1px solid #33cccc",
              valign: "middle",
              bgcolor: "#CCFFFF",
              align: "center",
            }}
          >
            <b>
              <font size="1" color="#000000">
                ΑΙΤΟΥΜΕΝΗ ΠΟΣΟΤΗΤΑ
              </font>
            </b>
          </td>
          <td
            style={{
              borderTop: "1px solid #33cccc",
              borderBottom: "1px solid #33cccc",
              borderLeft: "1px solid #33cccc",
              borderRight: "1px solid #33cccc",
              valign: "middle",
              bgcolor: "#CCFFFF",
              align: "center",
            }}
          >
            <b>
              <font size="1" color="#000000">
                ΤΑΥΤΟΤΗΤΑ ΕΝΤΥΠΟΥ
              </font>
            </b>
          </td>
          <td
            style={{
              borderTop: "1px solid #33cccc",
              borderBottom: "1px solid #33cccc",
              borderLeft: "1px solid #33cccc",
              borderRight: "1px solid #33cccc",
              valign: "middle",
              bgcolor: "#CCFFFF",
              align: "center",
            }}
          >
            <b>
              <font size="1" color="#000000">
                ΜΜ
              </font>
            </b>
          </td>
          <td
            style={{
              borderTop: "1px solid #33cccc",
              borderBottom: "1px solid #33cccc",
              borderLeft: "1px solid #33cccc",
              borderRight: "1px solid #33cccc",
              valign: "middle",
              bgcolor: "#CCFFFF",
              align: "center",
            }}
          >
            <b>
              <font size="1" color="#000000">
                ΑΙΤΙΟΛΟΓΙΑ
              </font>
            </b>
          </td>
          <td
            style={{
              borderTop: "1px solid #33cccc",
              borderBottom: "1px solid #33cccc",
              borderLeft: "1px solid #33cccc",
              borderRight: "1px solid #33cccc",
              valign: "middle",
              bgcolor: "#CCFFFF",
              align: "center",
            }}
          >
            <b>
              <font size="1" color="#000000">
                ΠΡΟΤΕΡΑΙΟΤΗΤΑ
              </font>
            </b>
          </td>
          <td
            style={{
              borderTop: "1px solid #33cccc",
              borderBottom: "1px solid #33cccc",
              borderLeft: "1px solid #33cccc",
              borderRight: "1px solid #33cccc",
              valign: "middle",
              bgcolor: "#CCFFFF",
              align: "center",
            }}
          >
            <b>
              <font size="1" color="#000000">
                ΔΕΛΤΙΟ
              </font>
            </b>
          </td>
          <td
            style={{
              borderTop: "1px solid #33cccc",
              borderBottom: "1px solid #33cccc",
              borderLeft: "1px solid #33cccc",
              borderRight: "1px solid #33cccc",
              valign: "middle",
              bgcolor: "#CCFFFF",
              align: "center",
            }}
          >
            <b>
              <font size="1" color="#000000">
                ΠΑΡΑΤΗΡΗΣΕΙΣ
              </font>
            </b>
          </td>
          <td valign="middle" align="center">
            <br />
          </td>
        </tr>
      )}
      <tr ref={rowRef}>
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
