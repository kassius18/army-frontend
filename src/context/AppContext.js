import React, { createContext, useEffect, useState } from "react";
import tabApi from "apis/tabApi";
import vehicleApi from "apis/vehicleApi";

export const AppContext = createContext();

function Context({ children }) {
  const [vehicles, setVehicles] = useState([]);
  const [tabs, setTabs] = useState([]);
  const [hasChanged, setHasChanged] = useState(true);
  const [isFailure, setIsFailure] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (hasChanged === true) {
      setIsLoading(true);

      let tabsLoaded = false;
      let vehiclesLoaded = false;

      tabApi.getAllTabs().then((response) => {
        if (response.success === true) {
          tabsLoaded = true;
          setTabs(response.tabs);
          if (tabsLoaded && vehiclesLoaded) {
            setIsFailure(false);
            setIsLoading(false);
          }
        } else {
          setIsFailure(true);
          setIsLoading(false);
          setTabs([]);
        }
      });
      vehicleApi.getAllVehicles().then((response) => {
        if (response.success === true) {
          vehiclesLoaded = true;
          setVehicles(response.vehicles);
          if (tabsLoaded && vehiclesLoaded) {
            setIsFailure(false);
            setIsLoading(false);
          }
        } else {
          setIsFailure(true);
          setIsLoading(false);
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
    isLoading: isLoading,
  };

  return <AppContext.Provider value={context}>{children}</AppContext.Provider>;
}
export default AppContext;
