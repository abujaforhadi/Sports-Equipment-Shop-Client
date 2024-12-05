import Home from "../Pages/Home";
import MainLayout from "../Layout/MainLayout";
import Login from "../Components/Login";
import Registration from "../Components/Registration";
import { createBrowserRouter } from "react-router";
import PrivateRouter from "./PrivateRouter";
import AllProducts from "../Components/allProducts";
import MyEquipment from "../Components/MyEquipment";
import ProductDetails from "../Components/ProductDetails";
import AddEquipment from "../Components/AddEquipment.Jsx";
import UpdateEquipment from "../Components/UpdateEquipment";

// Updated router definition
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
        path: "/equipment/:id",
        element: (
          <PrivateRouter>
           <ProductDetails />
          </PrivateRouter>
        ),
        loader: ({ params }) => fetch(`http://localhost:3000/data/${params._id}`)

      },
      {
        path: "/update-equipment/:id",
        element: (
          <PrivateRouter>
            <UpdateEquipment />
          </PrivateRouter>
        ),
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
