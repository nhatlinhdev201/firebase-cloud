import * as React from "react";
import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import About from "../pages/About";
import Listen from "../pages/Listen";

const routers = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "about",
    element: <About />,
  },
  {
    path: "listen",
    element: <Listen />,
  },
];

const router = createBrowserRouter(routers);
export default router;