import { createBrowserRouter } from "react-router-dom";

import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import Home from "../pages/home/Home";
import PanelLayout from "../pages/panel/layout/PanelLayout";
import Conversation from "../pages/panel/sections/conversation/Conversation";
import Friendship from "../pages/panel/sections/friendship/Friendship";
import RouteGuard from "./RouteGuard";
import RoutePublic from "./RoutePublic";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: (
      <RoutePublic>
        <Login />
      </RoutePublic>
    ),
  },
  {
    path: "/register",
    element: (
      <RoutePublic>
        <Register />
      </RoutePublic>
    ),
  },
  {
    element: (
      <RouteGuard>
        <PanelLayout />
      </RouteGuard>
    ),
    children: [
      {
        path: "/friendships",
        element: <Friendship />,
      },
      {
        path: "/conversations",
        element: <Conversation />,
      },
      {
        path: "/conversations/:id",
        element: <Conversation />,
        handle: { hideMobileMenu: true },
      },
    ],
  },
]);
