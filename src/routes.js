import MainLayout from "./layouts/MainLayout";
import GetRequests from "./pages/request/GetRequests";
import NewRequest from "./pages/request/NewRequest";
import ListRequests from "./pages/request/ListRequests";
import ListVehicles from "pages/vehicle/ListVehicles";
import OneVehicle from "pages/vehicle/OneVehicle";
import ListTabs from "pages/tab/ListTabs";
import OneTab from "pages/tab/OneTab";
import TabTable from "tables/tab/TabTable";

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
  {
    path: "/test",
    element: (
      <TabTable
        parts={[
          {
            dateRecieved: "1-2-2019",
            pieNumber: "",
            amountRecieved: 15,
            tabUsed: "",
            dateUsed: "",
            amountUsed: "",
            id: 33,
            partTotal: 15,
          },
          {
            dateRecieved: "1-1-2021",
            pieNumber: "",
            amountRecieved: 3,
            tabUsed: "",
            dateUsed: "",
            amountUsed: "",
            id: 30,
            partTotal: 18,
          },
          {
            dateRecieved: "1-2-2022",
            pieNumber: "",
            amountRecieved: 11,
            tabUsed: "",
            dateUsed: "",
            amountUsed: "",
            id: 31,
            partTotal: 29,
          },
          {
            dateRecieved: "2-2-2023",
            pieNumber: "",
            amountRecieved: 22,
            tabUsed: "",
            dateUsed: "",
            amountUsed: "",
            id: 32,
            partTotal: 51,
          },
          {
            dateRecieved: "2-3-2023",
            pieNumber: "",
            amountRecieved: 10,
            tabUsed: "",
            dateUsed: "",
            amountUsed: "",
            id: 35,
            partTotal: 61,
          },
          {
            dateRecieved: "1-1-2025",
            pieNumber: "",
            amountRecieved: 15,
            tabUsed: "",
            dateUsed: "",
            amountUsed: "",
            id: 36,
            partTotal: 76,
          },
        ]}
      />
    ),
  },
];

export default routes;
