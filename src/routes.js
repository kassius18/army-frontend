import { Navigate } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Request from "./pages/Request";
import NewRequest from "./pages/NewRequest";

const routes = [
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { path: "request", element: <Request /> },
      { path: "test", element: <NewRequest /> },

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
