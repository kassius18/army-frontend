import React, { createContext, useEffect, useState } from "react";
import tabApi from "apis/tabApi";
import vehiclesApi from "apis/vehiclesApi";

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
        } else setTabs([]);
      });
      vehiclesApi.getAllVehicles().then((response) => {
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
  };

  return <AppContext.Provider value={context}>{children}</AppContext.Provider>;
}
