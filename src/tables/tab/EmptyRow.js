import React from "react";
import uuid from "react-uuid";

function EmptyRow({ iterationArray }) {
  return (
    <>
      {iterationArray.map(() => {
        return (
          <div className="wrapper-1fr" style={{ height: "31px" }} key={uuid()}>
            <div className="table__cell"></div>
          </div>
        );
      })}
    </>
  );
}

export default EmptyRow;
