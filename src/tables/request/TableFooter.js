import React, { useRef, useEffect, useState } from "react";
import EmptyRow from "./EmptyRow";
function TableFooter({ request, print }) {
  const paperHeight = 697;
  const emptyRowHeight = 26.45;
  const footerRef = useRef(0);

  const [emptyRowsToFillFullPage, setEmptyRowsToFillFullPage] = useState(-1);
  const [emptyRowsToFillBefore, setEmptyRowsToFillBefore] = useState(-1);

  useEffect(() => {
    const offsetTop = footerRef.current.offsetTop;
    const remainder = Math.abs((offsetTop % paperHeight) - paperHeight);

    if (remainder > footerRef.current.offsetHeight) {
      setEmptyRowsToFillBefore(
        Math.floor(
          (remainder - footerRef.current.offsetHeight) / emptyRowHeight
        )
      );
      setEmptyRowsToFillFullPage(-1);
    } else {
      setEmptyRowsToFillBefore(Math.floor(remainder / emptyRowHeight));
      setEmptyRowsToFillFullPage(
        Math.floor(
          (paperHeight - footerRef.current.offsetHeight) / emptyRowHeight
        ) - 1
      );
    }
  }, [print]);

  const renderEmptyRows = () => {
    const countOfRows =
      (emptyRowsToFillBefore >= 0 ? emptyRowsToFillBefore : 0) +
      (emptyRowsToFillFullPage >= 0 ? emptyRowsToFillFullPage : 0);
    const iterationArray = Array(countOfRows).fill(1);
    return <EmptyRow iterationArray={iterationArray} />;
  };

  const { day, month, year, firstPartOfPhi, secondPartOfPhi } = request;
  return (
    <>
      <tbody className="table__body rows empty">{renderEmptyRows()}</tbody>
      <tbody ref={footerRef}>
        <tr>
          <td height="66" align="center">
            <font size="1" color="#000000">
              ΥΠΟΓΡΑΦΗ ΑΙΤΟΥΝΤΟΣ ΚΑΙ ΣΦΡΑΓΙΔΑ ΜΟΝΑΔΑΣ
            </font>
          </td>
          <td align="center">
            <font size="1" color="#000000">
              <br />
            </font>
          </td>
          <td style={{ colSpan: 2, valign: "top", align: "left" }}>
            <font size="1" color="#000000">
              ΕΓΚΡΙΝΟΝΤΟΣ ΤΗΝ ΑΙΤΗΣΗ ΚΑΙ ΟΙΚΕΙΑ ΣΦΡΑΓΙΔΑ
            </font>
          </td>
          <td align="center">
            <br />
          </td>
          <td align="center">
            <font size="1" color="#000000">
              ΥΠΟΓΡΑΦΗ ΚΩΔΙΚΟΠΟΙΗΣΗΣ ΥΠΑΛΛΗΛΟΥ
            </font>
          </td>
          <td align="left">
            <br />
          </td>
          <td align="left">
            <br />
          </td>
          <td align="left">
            <br />
          </td>
          <td align="left">
            <b>
              <font size="1" color="#000000">
                Υποβάλλεται υπό τύπ αναφοράς
              </font>
            </b>
          </td>
          <td align="left">
            <b>
              <font size="1">
                <br />
              </font>
            </b>
          </td>
          <td align="left">
            <b>
              <br />
            </b>
          </td>
          <td align="left">
            <br />
          </td>
        </tr>
        <tr>
          <td height="33" align="left">
            <br />
          </td>
          <td align="center">
            <b>
              <font color="#000000">
                <br />
              </font>
            </b>
          </td>
          <td align="left">
            <br />
          </td>
          <td align="center">
            <b>
              <font color="#000000">
                <br />
              </font>
            </b>
          </td>
          <td align="center">
            <br />
          </td>
          <td align="left">
            <br />
          </td>
          <td sdval="40603" sdnum="M/D/YYYY" align="right"></td>
          <td align="left">
            <br />
          </td>
          <td align="left">
            <br />
          </td>
          <td align="left">
            <b>
              <font color="#000000">Αρ. Φ. 600.14/</font>
            </b>
          </td>
          <td sdval="1" sdnum="1033" align="center">
            <b>{firstPartOfPhi}</b>
          </td>
          <td sdval="236" sdnum="1033" align="left">
            <b>{secondPartOfPhi}</b>
          </td>
        </tr>
        <tr>
          <td height="33" align="left">
            <br />
          </td>
          <td valign="top" align="left">
            <b>
              <font color="#000000">
                <br />
              </font>
            </b>
          </td>
          <td align="left">
            <br />
          </td>
          <td valign="top" align="center">
            <b>
              <font color="#000000">
                <br />
              </font>
            </b>
          </td>
          <td align="center">
            <br />
          </td>
          <td align="left">
            <br />
          </td>
          <td align="left">
            <br />
          </td>
          <td align="left">
            <br />
          </td>
          <td align="left">
            <br />
          </td>
          <td valign="middle" align="left">
            <b>
              <font color="#000000">ΑΡΜΟΛΙΑ</font>
            </b>
          </td>
          <td
            colSpan="2"
            sdval="44221"
            sdnum="M/D/YYYY"
            valign="middle"
            align="left"
          >
            <b>
              {day}/{month}/{year}
            </b>
          </td>
        </tr>
      </tbody>
    </>
  );
}

export default TableFooter;
