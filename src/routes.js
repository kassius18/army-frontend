import MainLayout from "./layouts/MainLayout";
import GetRequests from "./pages/request/components/GetRequests";
import NewRequest from "./pages/request/components/NewRequest";
import ListRequests from "./pages/request/components/ListRequests";
import Vehicle from "pages/vehicle/Vehicle";
import OneVehicle from "pages/vehicle/components/OneVehicle";
import AllTabs from "pages/tab/AllTabs";
import OneTab from "pages/tab/OneTab";
import TabTable from "tables/tab/TabTable";
import RequestTable from "tables/request/RequestTable";

const routes = [
  {
    path: "/",
    element: <MainLayout />,
    children: [
      // { path: "request", element: <Request /> },
      { path: "requests/new", element: <NewRequest /> },
      { path: "requests/", element: <GetRequests /> },
      { path: "requests/:phi/:year", element: <ListRequests /> },
      { path: "requests/list", element: <ListRequests /> },

      { path: "tabs", element: <AllTabs /> },
      { path: "tabs/:id", element: <OneTab /> },

      { path: "vehicles", element: <Vehicle /> },
      { path: "vehicles/:id", element: <OneVehicle /> },

      // { path: "customers", element: <CustomerList /> },
      // { path: "dashboard", element: <Dashboard /> },
      // { path: "products", element: <ProductList /> },
      // { path: "settings", element: <Settings /> },
      // { path: "*", element: <Navigate to="/404" /> },
    ],
  },
  {
    path: "/test",
    element: (
      <TabTable
        parts={[
          {
            dateRecieved: "",
            pieNumber: "",
            amountRecieved: "",
            tabUsed: "",
            dateUsed: "1-1-2018",
            amountUsed: 2,
            id: 20,
            partTotal: "8",
          },
          {
            dateRecieved: "3-1-2020",
            pieNumber: "",
            amountRecieved: 22,
            tabUsed: "",
            dateUsed: "",
            amountUsed: "",
            id: 22,
            partTotal: 30,
          },
          {
            dateRecieved: "1-2-2020",
            pieNumber: "",
            amountRecieved: 1,
            tabUsed: "",
            dateUsed: "",
            amountUsed: "",
            id: 19,
            partTotal: 31,
          },
          {
            dateRecieved: "",
            pieNumber: "",
            amountRecieved: "",
            tabUsed: "",
            dateUsed: "1-2-2020",
            amountUsed: 20,
            id: 23,
            partTotal: "11",
          },
          {
            dateRecieved: "4-3-2022",
            pieNumber: "",
            amountRecieved: 13,
            tabUsed: "",
            dateUsed: "",
            amountUsed: "",
            id: 16,
            partTotal: 24,
          },
          {
            dateRecieved: "4-1-2023",
            pieNumber: "",
            amountRecieved: 1,
            tabUsed: "",
            dateUsed: "2023-1-4",
            amountUsed: 1,
            id: 21,
            partTotal: 24,
          },
          {
            dateRecieved: "5-4-2023",
            pieNumber: "",
            amountRecieved: 5,
            tabUsed: "",
            dateUsed: "",
            amountUsed: "",
            id: 18,
            partTotal: 29,
          },
        ]}
      />
    ),
    //   children: [
    //     { path: "login", element: <Login /> },
    //     { path: "register", element: <Register /> },
    //     { path: "404", element: <NotFound /> },
    //     { path: "/", element: <Navigate to="/app/dashboard" /> },
    //     { path: "*", element: <Navigate to="/404" /> },
    //   ],
  },
];

export default routes;
