import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/homepage";
import ProductsPage from "./pages/productsPage";
import ContactUsPage from "./pages/contactPage";
import Faq from "./pages/FaqPage";
import CheckOutPage from "./pages/checkOut";
import SearchPage from "./pages/searchPage";
import OrderPage from "./pages/account/order-page";
import ProductDetailPage from "./pages/productDetailPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/products",
    element: <ProductsPage />,
  },
  {
    path: "/product/:id",
    element: <ProductDetailPage />,
  },
  {
    path: "/search",
    element: <SearchPage />,
  },
  {
    path: "/contact",
    element: <ContactUsPage />,
  },
  {
    path: "/FAQ",
    element: <Faq />,
  },
  {
    path: "/checkout",
    element: <CheckOutPage />,
  },
  {
    path: "/account/orders",
    element: <OrderPage />,
  },
]);

function Router() {
  return <RouterProvider router={router} />;
}

export default Router;
