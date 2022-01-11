import Entry from "./Entry";

function RequestBody({ entries, deleteEntry, openEntryModal }) {
  return (
    <>
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
    </>
  );
}

export default RequestBody;
