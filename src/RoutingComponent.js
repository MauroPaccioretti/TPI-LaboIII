import React, { useContext, useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuth, useAuthDispatch } from "./Context/AuthContextProvider";

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
import EditLandTable from "components/EditLandTable";
import { DarkModeContext } from "Context/DarkModeContext";

const RoutingComponent = () => {
  const auth = useAuth();
  const dispatch = useAuthDispatch();
  const { darkMode } = useContext(DarkModeContext);

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [darkMode]);
  const [routes, setRoutes] = useState("login");
  useEffect(() => {
    const loggedInUser = localStorage.getItem("user");
    const token = localStorage.getItem("token");
    let foundUser = "";
    if (loggedInUser) {
      foundUser = JSON.parse(loggedInUser);
    }
    dispatch.setLogin(foundUser, token);
  }, []);

  useEffect(() => {
    setRoutes(routesFunction());
  }, [auth.currentUser]);

  const routesFunction = () => {
    switch (auth.currentUser?.role) {
      case "Usuario": {
        return (
          <Routes>
            <Route path="user" element={<MainUsers />}>
              <Route path="mylands" element={<MyLands />} />
              <Route path="myexpenses" element={<MyExpenses />} />
              <Route path="editland" element={<EditLand />}>
                <Route path=":landId" element={<EditLandTable />} />
              </Route>
            </Route>
            <Route path="*" element={<Navigate replace to="user/mylands" />} />
          </Routes>
        );
      }
      case "Admin": {
        return (
          <Routes>
            <Route path="admin" element={<MainAdmin />}>
              <Route path="expensesunpaid" element={<ExpensesUnpaid />} />
              <Route path="viewusers" element={<ViewUsers />} />
              <Route path="payment" element={<Payment />} />
              {/* Generar comprobantes (crear expensas) Ingresar pago (de 1 expensa) */}
            </Route>
            <Route
              path="*"
              element={<Navigate replace to="admin/expensesunpaid" />}
            />
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

  return <BrowserRouter>{routes}</BrowserRouter>;
};

export default RoutingComponent;
