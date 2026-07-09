import { createBrowserRouter } from "react-router";
import RootLayout from "../layout/RootLayout";
import NotFound from "../pages/NotFound";
import Products from "../pages/Products";
import Orders from "../pages/Orders";
import Cart from "../pages/Cart";
import Home from "../pages/Home";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />, 
    errorElement: <NotFound />, 
    children: [
      {
        index: true, 
        element: <Home />,
      },
      {
        path: "products", 
        element: <Products />,
      },
            {
        path: "profile/:profileId", 
        element: <Products />,
      },
    {
        path: "orders", 
        element: <Orders />,
      },
    {
        path: "cart", 
        element: <Cart />,
      },
       {
        path: "cart", 
        element: <Cart />,
      },
    ],
  },
  {
    path: "*", 
    element: <NotFound />,
  },
]);
