import MainLayout from "./layouts/MainLayout";
import GetRequests from "./pages/request/GetRequests";
import NewRequest from "./pages/request/NewRequest";
import ListRequests from "./pages/request/ListRequests";
import ListVehicles from "pages/vehicle/ListVehicles";
import OneVehicle from "pages/vehicle/OneVehicle";
import ListTabs from "pages/tab/ListTabs";
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

      { path: "tabs", element: <ListTabs /> },
      { path: "tabs/:id", element: <OneTab /> },

      { path: "vehicles", element: <ListVehicles /> },
      { path: "vehicles/:id", element: <OneVehicle /> },
    ],
  },
  {},
];

export default routes;
