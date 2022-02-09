import React, { useState, useEffect } from "react";
import Tab from "pages/tabs/Tab";
import tabApi from "apis/tabApi";

function AllTabs() {
  const [tabs, setTabs] = useState([]);

  useEffect(() => {
    tabApi.getAllTabs().then((response) => {
      setTabs(response.tabs);
    });
  }, []);

  return (
    <div>
      <ul>
        {tabs.map((tab) => {
          return <Tab key={tab.id} tab={tab} />;
        })}
      </ul>
    </div>
  );
}

export default AllTabs;
