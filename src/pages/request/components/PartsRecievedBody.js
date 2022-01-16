import OnePartRecieved from "./OnePartRecieved";

export default function PartsRecievedBody({ parts }) {
  console.log("parts", parts);
  return (
    <>
      {parts.map((part) => {
        return <OnePartRecieved part={part} key={part.id} />;
      })}
    </>
  );
}
