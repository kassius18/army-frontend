import React, { createContext, useEffect, useState } from "react";
import tabApi from "apis/tabApi";
import vehicleApi from "apis/vehicleApi";

export const AppContext = createContext();

export default function Context({ children }) {
  const [vehicles, setVehicles] = useState([]);
  const [tabs, setTabs] = useState([]);
  const [hasChanged, setHasChanged] = useState(true);
  const [isFailure, setIsFailure] = useState(false);

  useEffect(() => {
    if (hasChanged === true) {
      tabApi.getAllTabs().then((response) => {
        if (response.success === true) {
          setTabs(response.tabs);
          setHasChanged(false);
        } else {
          setIsFailure(true);
          setTabs([]);
        }
      });
      vehicleApi.getAllVehicles().then((response) => {
        if (response.success === true) {
          setVehicles(response.vehicles);
        } else {
          setIsFailure(true);
          setVehicles([]);
        }
      });
    }
    setHasChanged(false);
  }, [hasChanged]);

  const context = {
    vehicles: vehicles,
    setVehicles: setVehicles,
    tabs: tabs,
    setTabs: setTabs,
    setHasChanged: setHasChanged,
    isFailure: isFailure,
  };

  return <AppContext.Provider value={context}>{children}</AppContext.Provider>;
}
