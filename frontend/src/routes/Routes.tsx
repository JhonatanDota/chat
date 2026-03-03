import { Route, Routes as RouterDomRoutes } from "react-router-dom";

import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import Home from "../pages/home/Home";
import PanelLayout from "../pages/panel/layout/PanelLayout";
import Conversation from "../pages/panel/sections/conversation/Conversation";
import Friendship from "../pages/panel/sections/friendship/Friendship";
import RouteGuard from "./RouteGuard";
import RoutePublic from "./RoutePublic";

export default function Routes() {
  return (
    <RouterDomRoutes>
      <Route path="/" element={<Home />} />
      <Route
        path="/login"
        element={
          <RoutePublic>
            <Login />
          </RoutePublic>
        }
      />
      <Route
        path="/register"
        element={
          <RoutePublic>
            <Register />
          </RoutePublic>
        }
      />

      <Route
        element={
          <RouteGuard>
            <PanelLayout />
          </RouteGuard>
        }
      >
        <Route path="/friendships" element={<Friendship />} />
        <Route path="/conversations" element={<Conversation />} />
      </Route>
    </RouterDomRoutes>
  );
}
