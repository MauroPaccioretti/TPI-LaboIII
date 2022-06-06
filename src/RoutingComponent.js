import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import { useAuth } from "./Context/AuthContextProvider";

import Login from "./Login";
import MainAdmin from "./Admin/MainAdmin";
import MainUsers from "./Users/MainUsers";
import { NotFound } from "./Views/NotFound";

const RoutingComponent = () => {
  // const auth = useAuth();
  // console.log("usuario:", auth);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="login" element={<Login />} />
        <Route path="admin" element={<MainAdmin />} />
        <Route path="user" element={<MainUsers />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default RoutingComponent;
