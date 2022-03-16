import React from "react";
import uuid from "react-uuid";

function EmptyRow({ iterationArray }) {
  return (
    <>
      {iterationArray.map(() => {
        return (
          <tr key={uuid()}>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
        );
      })}
    </>
  );
}

export default EmptyRow;
