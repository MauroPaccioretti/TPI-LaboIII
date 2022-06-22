import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./Context/AuthContextProvider";

import Login from "./Login";
import MainAdmin from "./Admin/MainAdmin";
import ViewUsers from "Admin/ViewUsers";
import ExpensesUnpaid from "Admin/ExpensesUnpaid";
import Payment from "Admin/Payment";
import MainUsers from "./Users/MainUsers";
import { NotFound } from "./Views/NotFound";
import MyLands from "Users/MyLands";
import MyExpenses from "Users/MyExpenses";
import EditLand from "Users/EditLand";

const RoutingComponent = () => {
  const auth = useAuth();

  const [routes, setRoutes] = useState("login");
  useEffect(() => {
    const loggedInUser = localStorage.getItem("user");
    if (loggedInUser) {
      const foundUser = JSON.parse(loggedInUser);
      auth.currentUser = foundUser;
    }
  }, []);

  useEffect(() => {
    setRoutes(routesFunction());
  }, [auth.currentUser]);

  // {/* <Route path="*" element={<Navigate to="user" replace />} /> */}
  const routesFunction = () => {
    switch (auth.currentUser?.role) {
      case "Usuario": {
        return (
          <Routes>
            <Route path="user" element={<MainUsers />}>
              <Route index element={<MyLands />} />
              <Route path="mylands" element={<MyLands />} />
              <Route path="myexpenses" element={<MyExpenses />} />
              <Route path="editland" element={<EditLand />} />
            </Route>
            <Route path="*" element={<Navigate replace to="user" />} />
          </Routes>
        );
      }
      case "Admin": {
        return (
          <Routes>
            <Route path="admin" element={<MainAdmin />}>
              <Route index element={<ExpensesUnpaid />} />
              <Route path="expensesunpaid" element={<ExpensesUnpaid />} />
              <Route path="viewusers" element={<ViewUsers />} />
              <Route path="payment" element={<Payment />} />
              {/* Generar comprobantes (crear expensas) Ingresar pago (de 1 expensa) */}
            </Route>
            <Route path="*" element={<Navigate replace to="admin" />} />
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
