import Entry from "./Entry";

function RequestBody({
  entries,
  deleteEntry,
  openEntryModal,
  openPartsRecievedModal,
}) {
  return (
    <>
      {entries.map((entry) => {
        return (
          <Entry
            entry={entry}
            key={entry.id}
            deleteEntry={deleteEntry}
            openEntryModal={openEntryModal}
            openPartsRecievedModal={openPartsRecievedModal}
          />
        );
      })}
    </>
  );
}

export default RequestBody;
