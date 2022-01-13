import { createContext } from "react";
export const EntryContext = createContext();

export default function Context({ entryId, children }) {
  const context = { entryId: entryId };
  return (
    <EntryContext.Provider value={context}>{children}</EntryContext.Provider>
  );
}
