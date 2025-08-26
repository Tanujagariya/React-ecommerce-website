import { createBrowserRouter, Navigate } from "react-router-dom";
import RootLayout from "../Layouts/RootLayout";
import Products from "../Pages/Products";
import ProductDetails from "../Pages/ProductDetails";
import Category from "../Pages/Categories";
import Wishlist from "../Pages/Wishlist";
import NotFound404 from "../Pages/NotFound404";
import Cart from "../Pages/Cart";
import Home from "../Layouts/Home";
import CategoryLayout from "../Layouts/CategoryLayout";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import Account from "../Pages/Account";

const MainRouter = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <Home /> },

      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
      { path: "account", element: <Account /> },
      { path: "wishlist", element: <Wishlist /> },
      { path: "cart", element: <Cart /> },

      {
        path: "products",
        element: <CategoryLayout />,
        children: [
          { index: true, element: <Products /> },
          { path: "category/:slug", element: <Category /> },
          { path: "product/:id", element: <ProductDetails /> },
        ],
      },

    ],
  },
  { path: "/404", element: <NotFound404 /> },
  { path: "*", element: <Navigate to="/404" /> },
]);

export default MainRouter;
