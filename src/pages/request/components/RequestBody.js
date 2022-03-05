import Entry from "./Entry";

function RequestBody({ entries, requestActions, request, modalActions }) {
  return (
    <>
      {entries.map((entry) => {
        return (
          <Entry
            entry={entry}
            key={entry.id}
            requestActions={requestActions}
            modalActions={modalActions}
          />
        );
      })}
    </>
  );
}

export default RequestBody;
