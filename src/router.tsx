import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/homepage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
]);

function Router() {
  return <RouterProvider router={router} />;
}

export default Router;
