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
import AllUsers from "./routes/Admin/AllUsers";
import AllCaRequests from "./routes/Admin/AllCaRequests";

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
    path: "/allUsers",
    element: <AllUsers />,
  },
  {
    path: "/allCaRequests",
    element: <AllCaRequests />,
  },
  {
    path:"/newUser",
    element:<NewUser/>
  }
]);
