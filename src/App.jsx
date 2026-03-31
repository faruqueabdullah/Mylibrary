import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";

import Loginpage from "./pages/login/Loginpage";
import Signuppage from "./pages/signup/Signuppage";
import Home from "./pages/home/Home";
import Members from "./pages/members/Members";
import Books from "./pages/books/Books";
import Checkouts from "./pages/checkouts/Checkouts";
import Global from "./appContainer/Global";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: < Global/>,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/app/members",
          element: <Members />,
        },
        {
          path: "/app/books",
          element: <Books />,
        },
        {
          path: "/app/checkouts",
          element: <Checkouts />,
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
