import Home from "../Pages/Home";
import MainLayout from "../Layout/MainLayout";
import Login from "../Components/Login";
import Registration from "../Components/Registration";
import { createBrowserRouter } from "react-router";
import AddEquipment from "../Components/AddEquipment.Jsx";
import PrivateRouter from "./PrivateRouter";
import AllProducts from "../Components/allProducts";
import MyEquipment from "../Components/MyEquipment";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/all-products",
        element: <AllProducts />,
      },
      {
        path: "/registration",
        element: <Registration />,
      },
      {
        path: "/add-equipment",
        element: (
          <PrivateRouter>
            <AddEquipment />
          </PrivateRouter>
        ),
      },
      {
        path: "/my-equipment",
        element: (
          <PrivateRouter>
            <MyEquipment />
          </PrivateRouter>
        ),
      },
    ],
  },
]);
