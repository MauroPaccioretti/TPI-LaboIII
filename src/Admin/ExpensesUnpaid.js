import React, { useEffect, useState, useContext } from "react";
import {
  customFetch,
  handleServerError,
  customFetchWithBody,
} from "utils/helpers.js";
import { useAuth, useAuthDispatch } from "../Context/AuthContextProvider";
import Loading from "components/Loading";
import "assets/style/TableExpense.css";
import { toast } from "react-toastify";
import { DarkModeContext } from "Context/DarkModeContext";

const ExpensesUnpaid = () => {
  const auth = useAuth();
  const dispatch = useAuthDispatch();
  const { darkMode } = useContext(DarkModeContext);
  const [expensesUnpaid, setExpensesUnpaid] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showInputDate, setShowInputDate] = useState(false);
  const [expenseId, setExpenseId] = useState(0);
  var curr = new Date();
  curr.setDate(curr.getDate() - 0.125);
  var date = curr.toISOString().substring(0, 10);
  const [inputPayDate, setInputPayDate] = useState(date);
  useEffect(() => {
    customFetch("GET", "/expense/unpaid/", auth.token)
      .then((res) => {
        const err = handleServerError(dispatch, res);
        if (err) {
          return;
        }
        return res.json();
      })
      .then((body) => {
        setExpensesUnpaid(body);
        setLoading(false);
      });
  }, []);

  const btnAddPay = (PayDate, idExpense) => {
    setLoading(true);
    setShowInputDate(false);
    customFetchWithBody(
      "PUT",
      "/expense/" + idExpense,
      { datePaid: PayDate },
      auth.token
    )
      .then((res) => {
        const err = handleServerError(dispatch, res);
        if (err) {
          return;
        }
      })
      .then(() => {
        customFetch("GET", "/expense/unpaid/", auth.token)
          .then((res) => {
            const err = handleServerError(dispatch, res);
            if (err) {
              return;
            }
            return res.json();
          })
          .then((body) => {
            setExpensesUnpaid(body);
            setLoading(false);
            toast.success("Pago Exitoso");
          });
      })
      .catch(function (error) {
        if (error === "noContent") {
          return;
        }
        return Promise.reject(error);
      });
  };
  const inputPayDateHandler = (e) => {
    setInputPayDate(e.target.value);
  };

  return (
    <div className="table-container">
      {showInputDate ? (
        <div>
          <label>
            <h6>Ingrese una Fecha:</h6>
          </label>
          <span> </span>
          <input
            type="date"
            value={inputPayDate}
            onInput={inputPayDateHandler}
          ></input>
          <button
            className={`addPay-btn ${darkMode ? "dark" : ""}`}
            onClick={() => {
              btnAddPay(inputPayDate, expenseId);
            }}
          >
            Agregar
          </button>
          <button
            className={`addPay-btn ${darkMode ? "dark" : ""}`}
            onClick={() => {
              setShowInputDate(false);
            }}
          >
            Cancelar
          </button>
        </div>
      ) : (
        <span> </span>
      )}

      {loading ? (
        <Loading />
      ) : !expensesUnpaid ? (
        <p>No hay expensas para mostrar</p>
      ) : (
        <table className="table table-hover">
          <thead>
            <tr>
              <th scope="col">Lote</th>
              <th scope="col">Periodo</th>
              <th scope="col">Monto</th>
              <th scope="col">Vencimiento</th>
              <th scope="col">Estado</th>
            </tr>
          </thead>
          <tbody className="">
            {expensesUnpaid.map((L) =>
              L.map((e) => (
                <tr
                  className={`${
                    new Date(e.expirationDate) < Date.now() ? "late-row" : ""
                  }`}
                >
                  <th scope="row">
                    {"#"} {e.landId}
                  </th>
                  <td>
                    {new Date(e.expirationDate).getMonth() + 1}/
                    {new Date(e.expirationDate).getFullYear()}
                  </td>
                  <td>$ {e.totalCost}</td>
                  <td>{new Date(e.expirationDate).toLocaleDateString()}</td>
                  <td>
                    {new Date(e.expirationDate) < Date.now()
                      ? "Vencida"
                      : "Vigente"}
                  </td>
                  <td>
                    <button
                      className={`addPay-btn ${darkMode ? "dark" : ""}`}
                      onClick={() => {
                        setShowInputDate(true);
                        setExpenseId(e.id);
                      }}
                    >
                      Agregar Pago
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};
export default ExpensesUnpaid;
