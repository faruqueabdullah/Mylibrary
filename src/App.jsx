import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";

import Loginpage from "./pages/login/Loginpage";
import Signuppage from "./pages/signup/Signuppage";
import Home from "./pages/home/Home";
import Members from "./pages/members/Members";
import Books from "./pages/books/Books";
import Checkouts from "./pages/checkouts/Checkouts";
import Global from "./appContainer/Global";
import ProtectedRoute from "./routes/ProtectedRoute";
import Settings from "./pages/settings/Settings";
import UserHelp from "./pages/userhelp/Userhelp";

function App() {
  const router = createBrowserRouter([
    {
      element: <ProtectedRoute />,
      children: [
        {
          path: "/",
          element: <Global />,
          children: [
            {
              path: "/",
              element: <Home />,
            },
            {
              path: "/members",
              element: <Members />,
            },
            {
              path: "/books",
              element: <Books />,
            },
            {
              path: "/checkouts",
              element: <Checkouts />,
            },
            {
              path: "/setting",
              element: <Settings />,
            },
            {
              path: "/userhelp",
              element: <UserHelp />,
            },
          ],
        },
      ],
    },
    {
      path: "/userlogin",
      element: <Loginpage />,
    },
    {
      path: "/usersignup",
      element: <Signuppage />,
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
