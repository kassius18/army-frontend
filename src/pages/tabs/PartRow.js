import React, { useState } from "react";

function PartRow({ part, index, total }) {
  const { dateRecieved, pieNumber, amountRecieved, amountUsed, observation } =
    part;
  return (
    <div className="tab row">
      <div>{index}</div>
      <div>{dateRecieved}</div>
      <div></div>
      <div>{pieNumber}</div>
      <div>{amountRecieved}</div>
      <div>{amountUsed}</div>
      <div>{total}</div>
      <div>{observation}</div>
    </div>
  );
}

export default PartRow;
