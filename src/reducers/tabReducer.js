const TAB_ACTIONS = {
  SET_PARTS: "SET_PARTS",
};

export const tabReducer = (tab, action) => {
  switch (action.type) {
    case TAB_ACTIONS.SET_PARTS:
      const sortedParts = action.payload.parts.sort(compareFn);
      const startingTotal = tab.startingTotal;
      let calculatedTotalPerPart = startingTotal;
      const partsWithTotal = sortedParts.map((part) => {
        calculatedTotalPerPart =
          calculatedTotalPerPart - part.amountUsed + part.amountRecieved;
        return { ...part, partTotal: calculatedTotalPerPart };
      });
      return { ...tab, parts: partsWithTotal };
    default:
      return tab;
  }
};

export const tabDispatchMap = (tabDispatch) => {
  return {
    setParts: (parts) => {
      tabDispatch({ type: TAB_ACTIONS.SET_PARTS, payload: { parts } });
    },
  };
};

const compareFn = (firstPart, secondPart) => {
  const firstPartYear = firstPart.dateRecieved
    ? parseInt(firstPart.dateRecieved.split("-")[2])
    : parseInt(firstPart.dateUsed.split("-")[2]);
  const secondPartYear = secondPart.dateRecieved
    ? parseInt(secondPart.dateRecieved.split("-")[2])
    : parseInt(secondPart.dateUsed.split("-")[2]);
  if (firstPartYear === secondPartYear) {
    const firstPartMonth = firstPart.dateRecieved
      ? parseInt(firstPart.dateRecieved.split("-")[1])
      : parseInt(firstPart.dateUsed.split("-")[1]);
    const secondPartMonth = secondPart.dateRecieved
      ? parseInt(secondPart.dateRecieved.split("-")[1])
      : parseInt(secondPart.dateUsed.split("-")[1]);
    if (firstPartMonth === secondPartMonth) {
      const firstPartDay = firstPart.dateRecieved
        ? parseInt(firstPart.dateRecieved.split("-")[0])
        : parseInt(firstPart.dateUsed.split("-")[0]);
      const secondPartDay = secondPart.dateRecieved
        ? parseInt(secondPart.dateRecieved.split("-")[0])
        : parseInt(secondPart.dateUsed.split("-")[0]);
      if (firstPartMonth === secondPartMonth) {
        return 0;
      }
      return firstPartDay < secondPartDay ? -1 : 1;
    }
    return firstPartMonth < secondPartMonth ? -1 : 1;
  }
  return firstPartYear < secondPartYear ? -1 : 1;
};
