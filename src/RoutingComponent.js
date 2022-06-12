import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./Context/AuthContextProvider";

import Login from "./Login";
import MainAdmin from "./Admin/MainAdmin";
import MainUsers from "./Users/MainUsers";
import { NotFound } from "./Views/NotFound";

const RoutingComponent = () => {
  const auth = useAuth();
  const [routes, setRoutes] = useState("login");
  useEffect(() => {
    setRoutes(routesFunction());
  }, [auth.currentUser]);

  // {/* <Route path="*" element={<Navigate to="user" replace />} /> */}
  const routesFunction = () => {
    switch (auth.currentUser?.role) {
      case "Usuario": {
        return (
          <Routes>
            <Route path="user" element={<MainUsers />} />
            <Route path="*" element={<Navigate replace to="user" />} />
          </Routes>
        );
      }
      case "Admin": {
        return (
          <Routes>
            <Route path="admin" element={<MainAdmin />} />
          </Routes>
        );
      }
      case "Super Admin": {
        return (
          <Routes>
            <Route path="super-admin" element={<NotFound />} />
          </Routes>
        );
      }
      default: {
        return (
          <Routes>
            <Route path="/" element={<Login />} />;
            <Route path="*" element={<Navigate replace to="/" />} />
          </Routes>
        );
      }
    }
  };

  //Routes segun rol renderizar algunas u otras si es ['Usuario', 'Admin', 'Super Admin']

  //auth.currentUser.role ['Usuario', 'Admin', 'Super Admin']
  return (
    <BrowserRouter>
      {routes}

      {/* <Routes>
        <Route path="/" element={<Login />} />
        <Route path="login" element={<Login />} />
        <Route path="admin" element={<MainAdmin />} />
        <Route path="user" element={<MainUsers />} />
        <Route path="*" element={<NotFound />} />
      </Routes> */}
    </BrowserRouter>
  );
};

export default RoutingComponent;