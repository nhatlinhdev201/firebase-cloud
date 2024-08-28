import { RouterProvider } from "react-router-dom";
import "./messaging_init_in_sw"; 
import router from "./router/router";

const App = () => (
  <RouterProvider router={router} />
);

export default App;