import Admin_Login from "../pages/Admin_Login";
import Admin_products from "../pages/Admin_products";
import HomePage from "../pages/Homepage";
// import WrongPage from "../pages/WrongPage";

import { createHashRouter } from "react-router-dom";

const routers = [
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/admin/login",
    element: <Admin_Login />,
  },
  {
    path: "/admin/products",
    element: <Admin_products />,
  },
  //   {
  //     path: "*",
  //     element: <WrongPage />,
  //   },
];

const router = createHashRouter(routers);
export default router;
