import { createBrowserRouter } from "react-router-dom";
import Index from "./routes/Index";
import Home from "./routes/Home";
import Login from "./routes/Login";
import Signup from "./routes/Signup";
import Events from "./routes/Events";
import CA from "./routes/CA";
import CARegistration from "./routes/CA_register"
import MyTeams from "./routes/MyTeams";
import NewUser from "./routes/NewUser";
import { Event } from "./routes/Event";
import SetPasswordRoute from "./routes/SetPassword";
import VerifyEmail from "./routes/VerifyEmail";
import AllUsers from "./routes/Admin/AllUsers";
import AllCaRequests from "./routes/Admin/AllCaRequests";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Index />,
  },
  {
    path: "/main",
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
    path:"/SetPassword",
    element:<SetPasswordRoute/>
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
    path: "/ca-register",
    element: <CARegistration />,
  },
  {
    path: "/newUser",
    element: <NewUser />,
  },
  {
    path: "/myTeams",
    element: <MyTeams />,
  },
]);
