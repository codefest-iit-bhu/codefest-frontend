import { createBrowserRouter } from "react-router-dom";
import Index from "./routes/Index";
import Home from "./routes/Home";
import Login from "./routes/Login";
import Signup from "./routes/Signup";
import Events from "./routes/Events";
import CA from "./routes/CA";
import CARegistration from "./routes/CA_register"
export const router = createBrowserRouter([
  {
    path: "/",
    element: <Index />,
  },
  {
    path: "/home",
    element: <Home />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/events",
    element: <Events />,
  },
  {
    path: "/CA",
    element: <CA />,
  },
  {
    path: "/ca-register",
    element: <CARegistration />,
  },
]);
