import Entry from "./Entry";

function RequestBody({ entries, deleteEntry }) {
  return (
    <tbody>
      {entries.map((entry) => {
        return <Entry entry={entry} key={entry.id} deleteEntry={deleteEntry} />;
      })}
    </tbody>
  );
}

export default RequestBody;
