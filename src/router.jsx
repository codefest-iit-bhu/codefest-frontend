import { createBrowserRouter } from "react-router-dom";
import Index from "./routes/Index";
import Home from "./routes/Home";
import Login from "./routes/Login";
import Signup from "./routes/Signup";
import Events from "./routes/Events";
import CA from "./routes/CA";
import NewUser from "./routes/NewUser";
import { Event } from "./routes/Event";
import VerifyEmail from "./routes/VerifyEmail";

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
    path: "/verifyEmail",
    element: <VerifyEmail />,
  },
  {
    path: "/events",
    element: <Events />,
  },
  {
    path: "/event/:name",
    element: <Event />,
  },
  {
    path: "/CA",
    element: <CA />,
  },
  {
    path:"/newUser",
    element:<NewUser/>
  }
]);
