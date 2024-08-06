import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import App from "./App.jsx";
import Error from "./pages/Error";
import DrawCards from "./pages/DrawCards";
import Profile from "./pages/Profile";
import Card from "./pages/Card";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    error: < Error />,
    children: [
      {
        index: true,
        element: <DrawCards />,
      }, {
        path: "/profile",
        element: <Profile />,
      }, {
        path: "/cards",
        element: <Card />,
      }
    ]
  }
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);