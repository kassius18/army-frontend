import MainLayout from "./layouts/MainLayout";
import GetRequests from "./pages/request/components/GetRequests";
import Request from "./pages/request/Request";
import PrintRequest from "./pages/request/components/PrintRequest";
import Vehicle from "pages/vehicle/Vehicle";
import OneVehicle from "pages/vehicle/components/OneVehicle";

const routes = [
  {
    path: "/",
    element: <MainLayout />,
    children: [
      // { path: "request", element: <Request /> },
      { path: "request/new", element: <Request /> },
      { path: "request/", element: <GetRequests /> },
      { path: "request/print", element: <PrintRequest /> },
      { path: "vehicles", element: <Vehicle /> },
      { path: "vehicles/:id", element: <OneVehicle /> },
      // { path: "customers", element: <CustomerList /> },
      // { path: "dashboard", element: <Dashboard /> },
      // { path: "products", element: <ProductList /> },
      // { path: "settings", element: <Settings /> },
      // { path: "*", element: <Navigate to="/404" /> },
    ],
  },
  // {
  //   path: "/",
  //   element: <MainLayout />,
  //   children: [
  //     { path: "login", element: <Login /> },
  //     { path: "register", element: <Register /> },
  //     { path: "404", element: <NotFound /> },
  //     { path: "/", element: <Navigate to="/app/dashboard" /> },
  //     { path: "*", element: <Navigate to="/404" /> },
  //   ],
  // },
];

export default routes;
