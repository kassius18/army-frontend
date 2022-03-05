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
    // path: "/test",
    // element: ,
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
