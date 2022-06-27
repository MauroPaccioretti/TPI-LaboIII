import React, { useContext, useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuth, useAuthDispatch } from "./Context/AuthContextProvider";
import Login from "./Login";
import MainAdmin from "./Admin/MainAdmin";
import ViewUsers from "Admin/ViewUsers";
import ExpensesUnpaid from "Admin/ExpensesUnpaid";
import Payment from "Admin/Payment";
import MainUsers from "./Users/MainUsers";
import MyLands from "Users/MyLands";
import MyExpenses from "Users/MyExpenses";
import EditLand from "Users/EditLand";
import EditLandTable from "components/EditLandTable";
import { DarkModeContext } from "Context/DarkModeContext";
import MainSuperAdmin from "superAdmin/MainSuperAdmin";
import CreateUser from "superAdmin/CreateUser";

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
            <Route path="superadmin" element={<MainSuperAdmin />}>
              <Route path="viewusers" element={<ViewUsers />} />
              <Route path="createuser" element={<CreateUser />} />
            </Route>
            <Route
              path="*"
              element={<Navigate replace to="superadmin/viewusers" />}
            />
          </Routes>
        );
      }
      default: {
        return (
          <Routes>
            <Route path="login" element={<Login />} />;
            <Route path="*" element={<Navigate replace to="login" />} />
          </Routes>
        );
      }
    }
  };

  return <BrowserRouter>{routes}</BrowserRouter>;
};

export default RoutingComponent;
