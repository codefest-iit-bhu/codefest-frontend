
import { createBrowserRouter } from "react-router-dom";
import { UserProvider } from "./context/context";
import Index from "./routes/Index";
import Home from "./routes/Home";
import Login from "./routes/Login";
import Signup from "./routes/Signup";
import Events from "./routes/Events";
import CA from "./routes/CA";
import CARegistration from "./routes/CA_register";
import MyTeams from "./routes/MyTeams";
import { Event } from "./routes/Event";
import SetPasswordRoute from "./routes/SetPassword";
import VerifyEmail from "./routes/VerifyEmail";
import AllUsers from "./routes/Admin/AllUsers";
import AllCaRequests from "./routes/Admin/AllCaRequests";
import BackendRedirection from "./routes/BackendRedirection";
import PrivateRoute from "./components/ProtectedRoute";
import Layout from "./layout/Layout";
import PageTitle from "./components/PageTitle";
import CALeaderboard from "./routes/CALeaderboard";
import AllTeams from "./routes/Admin/AllTeams";
import UploadUsernames from "./routes/Admin/UploadUsernames";
import WinzoLeaderboard from "./routes/WinzoLeaderboard";
import WinzoReferrals from "./routes/WinzoReferrals";

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
      {
        path: "/myTeams",
        element: (
          <PrivateRoute>
            <PageTitle title="My Teams | Codefest IIT (BHU)" />
            <MyTeams />
          </PrivateRoute>
        ),
      },
      {
        path: "/ca-register",
        element: (
          <PrivateRoute>
            <PageTitle title="CA Registration | Codefest IIT (BHU)" />
            <CARegistration />
          </PrivateRoute>
        ),
      },
      {
        path: "/allCaRequests",
        element: (
          <PrivateRoute>
            <PageTitle title="All CA Requests | Codefest IIT (BHU)" />
            <AllCaRequests />
          </PrivateRoute>
        ),
      },
      {
        path: "/allUsers",
        element: (
          <PrivateRoute>
            <PageTitle title="All Users | Codefest IIT (BHU)" />
            <AllUsers />
          </PrivateRoute>
        ),
      },
      {
        path: "/ca_leaderboard",
        element: <>
          <PageTitle title="CA Leaderboard | Codefest IIT (BHU)" />
          <CALeaderboard />,
        </>
      },
      {
        path: "/event/teams/:eventId",
        element: (
          <PrivateRoute>
            <PageTitle title="All Teams | Codefest IIT (BHU)" />
            <AllTeams />
          </PrivateRoute>
        ),
      },
      {
        path: "/winzo-referrals",
        element: (
          <PrivateRoute>
            <WinzoReferrals />
          </PrivateRoute>
        )
      },
      {
        path: "/upload",
        element: (
          <PrivateRoute>
            <PageTitle title="Upload Winzo usernames | Codefest IIT (BHU)" />
            <UploadUsernames />
          </PrivateRoute>
        ),
      },
      {
        path: "/winzo_leaderboard",
        element: (
          <PrivateRoute>
            <PageTitle title="Winzo Leaderboard | Codefest IIT (BHU)" />
            <WinzoLeaderboard />
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "/verifyEmail",
    element: <VerifyEmail />,
  },
  {
    path: "/SetPassword",
    element: <SetPasswordRoute />,
  },
  {
    path: "/backend_redirect",
    element: <BackendRedirection />,
  }
]);
