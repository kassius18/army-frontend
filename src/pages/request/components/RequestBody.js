import Entry from "./Entry";

function RequestBody({ entries, deleteEntry }) {
  return (
    <>
      {entries.map((entry) => {
        return <Entry entry={entry} key={entry.id} deleteEntry={deleteEntry} />;
      })}
    </>
  );
}

export default RequestBody;
