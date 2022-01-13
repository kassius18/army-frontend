import OnePartRecieved from "./OnePartRecieved";

export default function PartsRecievedBody({ parts }) {
  return (
    <>
      {parts.map((part) => {
        return <OnePartRecieved part={part} />;
      })}
    </>
  );
}
