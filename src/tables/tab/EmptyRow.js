import React from "react";
import uuid from "react-uuid";

function EmptyRow({ iterationArray, isFillBefore = false, pageOfEmptyRows }) {
  return (
    <>
      {iterationArray.map((iterationEl, index) => {
        let style = { height: "31px" };
        if (
          isFillBefore &&
          index === iterationArray.length - 1 &&
          pageOfEmptyRows
        ) {
          style = { ...style, borderBottom: "2px solid black" };
        } else if (!isFillBefore && index === 0 && pageOfEmptyRows) {
          style = { ...style, borderTop: "2px solid black" };
        }
        return (
          <div className="wrapper-1fr" style={style} key={uuid()}>
            <div className="table__cell"></div>
          </div>
        );
      })}
    </>
  );
}

export default EmptyRow;
