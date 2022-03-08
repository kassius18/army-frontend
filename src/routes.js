import MainLayout from "./layouts/MainLayout";
import GetRequests from "./pages/request/components/GetRequests";
import NewRequest from "./pages/request/components/NewRequest";
import ListRequests from "./pages/request/components/ListRequests";
import Vehicle from "pages/vehicle/Vehicle";
import OneVehicle from "pages/vehicle/components/OneVehicle";
import AllTabs from "pages/tab/AllTabs";
import OneTab from "pages/tab/OneTab";

const routes = [
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { path: "requests/new", element: <NewRequest /> },
      { path: "requests/", element: <GetRequests /> },
      { path: "requests/:phi/:year", element: <ListRequests /> },
      { path: "requests/list", element: <ListRequests /> },

      { path: "tabs", element: <AllTabs /> },
      { path: "tabs/:id", element: <OneTab /> },

      { path: "vehicles", element: <Vehicle /> },
      { path: "vehicles/:id", element: <OneVehicle /> },
    ],
  },
  {},
];

export default routes;
