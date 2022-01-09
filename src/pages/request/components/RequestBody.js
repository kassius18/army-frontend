import Entry from "./Entry";

function RequestBody({ entries, deleteEntry, openEntryModal }) {
  return (
    <tbody>
      {entries.map((entry) => {
        return (
          <Entry
            entry={entry}
            key={entry.id}
            deleteEntry={deleteEntry}
            openEntryModal={openEntryModal}
          />
        );
      })}
    </tbody>
  );
}

export default RequestBody;
