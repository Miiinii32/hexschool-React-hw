import { createHashRouter } from "react-router-dom";
import Admin_Login from "../pages/Admin_login";
import Admin_products from "../pages/Admin_products";
import Home from "../pages/Home";
import Products from "../pages/Products";
import WrongPage from "../pages/WrongPage";
import FrontLayout from "../pages/FrontLayout";
import SingleProduct from "../pages/SingleProduct";
import Carts from "../pages/Carts";

const routers = [
  {
    path: "/",
    element: <FrontLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "products",
        element: <Products />,
        children: [
          {
            path: ":id",
            element: <SingleProduct />,
          },
        ],
      },

      {
        path: "cart",
        element: <Carts />,
      },
    ],
  },
  {
    path: "/admin/login",
    element: <Admin_Login />,
  },
  {
    path: "/admin/products",
    element: <Admin_products />,
  },
  {
    path: "*",
    element: <WrongPage />,
  },
];

const router = createHashRouter(routers);
export default router;
