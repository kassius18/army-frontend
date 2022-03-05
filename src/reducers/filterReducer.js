const FILTER_ACTIONS = {
  SET_MIN_VALUE: "SET_MIN_VALUE",
  SET_MAX_VALUE: "SET_MAX_VALUE",
  SET_FILTERED_ARRAY: "SET_FILTERED_ARRAY",
  FILTER: "FILTER",
};

export const filterReducer = (filter, action) => {
  switch (action.type) {
    case FILTER_ACTIONS.SET_MIN_VALUE: {
      const parts = action.payload.parts.filter((part) => {
        return partFilterFn(part, action.payload.minValue, filter.maxValue);
      });
      return {
        ...filter,
        filteredArray: parts,
        minValue: action.payload.minValue,
      };
    }
    case FILTER_ACTIONS.SET_MAX_VALUE: {
      const parts = action.payload.parts.filter((part) => {
        return partFilterFn(part, filter.minValue, action.payload.maxValue);
      });
      return {
        ...filter,
        filteredArray: parts,
        maxValue: action.payload.maxValue,
      };
    }
    case FILTER_ACTIONS.SET_FILTERED_ARRAY: {
      return { ...filter, filteredArray: action.payload.filteredArray };
    }
    default: {
      return filter;
    }
  }
};

export const filterDispatchMap = (filterDispatch) => {
  return {
    setMinValue: (minValue, parts) => {
      filterDispatch({
        type: FILTER_ACTIONS.SET_MIN_VALUE,
        payload: { minValue, parts },
      });
    },
    setMaxValue: (maxValue, parts) => {
      filterDispatch({
        type: FILTER_ACTIONS.SET_MAX_VALUE,
        payload: { maxValue, parts },
      });
    },
    setFilteredArray: (filteredArray) => {
      filterDispatch({
        type: FILTER_ACTIONS.SET_FILTERED_ARRAY,
        payload: { filteredArray },
      });
    },
  };
};

const filterFn = (year, minYear, maxYear) => {
  if (minYear === "" && maxYear === "") {
    return true;
  }
  if (minYear === "") {
    return year <= maxYear;
  }
  if (maxYear === "") {
    return year >= minYear;
  }
  return year >= minYear && year <= maxYear;
};

const partFilterFn = (part, minYear, maxYear) => {
  if (part.amountRecieved !== "") {
    const yearRecieved = parseInt(part.dateRecieved.split("-")[2]);
    return filterFn(yearRecieved, minYear, maxYear);
  } else {
    const yearUsed = parseInt(part.dateUsed.split("-")[2]);
    return filterFn(yearUsed, minYear, maxYear);
  }
};
