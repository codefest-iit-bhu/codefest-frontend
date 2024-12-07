import { createBrowserRouter } from "react-router-dom";
import Index from "./routes/Index";
import Home from "./routes/Home";
import Login from "./routes/Login";
import Signup from "./routes/Signup";
import Events from "./routes/Events";
import CA from "./routes/CA";
import CARegistration from "./routes/CA_register";
import MyTeams from "./routes/MyTeams";
import NewUser from "./routes/NewUser";
import { Event } from "./routes/Event";
import SetPasswordRoute from "./routes/SetPassword";
import VerifyEmail from "./routes/VerifyEmail";
import AllUsers from "./routes/Admin/AllUsers";
import AllCaRequests from "./routes/Admin/AllCaRequests";
import BackendRedirection from "./routes/BackendRedirection";
import { UserProvider } from "./context/context";
import PrivateRoute from "./components/ProtectedRoute";
import Layout from "./layout/Layout";
import PageTitle from "./components/PageTitle";

export const router = createBrowserRouter([
  {
    path: "",
    element: (
      <UserProvider>
        <Layout />
      </UserProvider>
    ),
    children: [
      {
        path: "/",
        element: <Index />,
      },
      {
        path: "/home",
        element: <Home />,
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
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
    ],
  },
  {
    path: "/verifyEmail",
    element: <VerifyEmail />,
  },
  {
    path: "",
    element: (
      <UserProvider>
        <PrivateRoute>
          <Layout />
        </PrivateRoute>
      </UserProvider>
    ),
    children: [
      {
        path: "/myTeams",
        element: (
          <>
            <PageTitle title="My Teams | Codefest'25" />
            <MyTeams />
          </>
        ),
      },
      {
        path: "/ca-register",
        element: (
          <>
            <PageTitle title="CA Registration | Codefest'25" />
            <CARegistration />
          </>
        ),
      },
      {
        path: "/allCaRequests",
        element: (
          <>
            <PageTitle title="All CA Requests | Codefest'25" />
            <AllCaRequests />
          </>
        ),
      },
      {
        path: "/allUsers",
        element: (
          <>
            <PageTitle title="All Users | Codefest'25" />
            <AllUsers />
          </>
        ),
      }
    ],
  },
  {
    path: "/SetPassword",
    element: <SetPasswordRoute />,
  },
  {
    path: "/backend_redirect",
    element: <BackendRedirection />,
  },
]);
