import { MdModeEditOutline } from "react-icons/md";

export default function OnePartRecieved({ part }) {
  return (
    <>
      <div
        key={part.id}
        style={{ display: "contents" }}
        className="parts-recieved__row"
      >
        <div>{part.date}</div>
        <div>{part.pieNumber}</div>
        <div>{part.amountRecieved}</div>
        <div>{part.tab}</div>
        <div>{part.observation}</div>
        <div
          style={{
            display: "flex",
            justifyContent: "left",
          }}
        >
          <MdModeEditOutline
            style={{ fontSize: "2rem", fill: "red", cursor: "pointer" }}
            // onClick={() => {
            //   editClickedPart(part.id);
            // }}
          />
        </div>
      </div>
    </>
  );
}
