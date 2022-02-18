import React, { createContext, useEffect, useState } from "react";
import tabApi from "apis/tabApi";
import vehicleApi from "apis/vehicleApi";

export const AppContext = createContext();

export default function Context({ children }) {
  const [vehicles, setVehicles] = useState([]);
  const [tabs, setTabs] = useState([]);
  const [hasChanged, setHasChanged] = useState(true);

  useEffect(() => {
    if (hasChanged === true) {
      tabApi.getAllTabs().then((response) => {
        if (response.success === true) {
          setTabs(response.tabs);
          setHasChanged(false);
        } else setTabs([]);
      });
      vehicleApi.getAllVehicles().then((response) => {
        if (response.success === true) {
          setVehicles(response.vehicles);
        } else setVehicles([]);
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
  };

  return <AppContext.Provider value={context}>{children}</AppContext.Provider>;
}
