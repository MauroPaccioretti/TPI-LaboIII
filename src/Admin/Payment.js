import React, { useContext, useEffect, useState } from "react";
import { customFetchWithBody, handleServerError } from "utils/helpers.js";
import { useAuth, useAuthDispatch } from "../Context/AuthContextProvider";
import Loading from "components/Loading";
import Expense from "components/Expense";
import "assets/style/Payment.css";
import { DarkModeContext } from "Context/DarkModeContext";
import { toast } from "react-toastify";

const Payment = () => {
  const auth = useAuth();
  const dispatch = useAuthDispatch();
  const { darkMode } = useContext(DarkModeContext);
  const [expenseGenerated, setExpenseGenerated] = useState([]);
  const [monthSelect, setMonthSelect] = useState("");
  const [yearSelect, setYearSelect] = useState("");
  const [noContent, setNoContent] = useState(false);
  const [loading, setLoading] = useState(false);
  const periodList = Array.from({ length: 12 }, (_, i) => i + 1);
  const yearList = Array.from({ length: 5 }, (_, i) => i + 2022);
  const handleMonthChange = (e) => {
    setMonthSelect(e.target.value);
  };
  const handleYearChange = (e) => {
    setYearSelect(e.target.value);
  };

  const btnGeneratePayHandler = (month, year) => {
    if (!month || !year) {
      toast.error("Debe seleccionar un período");
      return;
    }
    const formattedMonth = ("0" + month).slice(-2);
    setLoading(true);
    customFetchWithBody(
      "POST",
      "/expense/",
      { expirationDate: `${year}-${formattedMonth}-10` },
      auth.token
    )
      .then((res) => {
        const err = handleServerError(dispatch, res);
        if (err) {
          return;
        }
        if (res.status === 204) {
          return Promise.reject("noContent");
        }

        return res.json();
      })
      // .then((res) => {
      //   // console.log(res);
      //   if (res.status === 204) {
      //     return Promise.reject("noContent");
      //   }
      //   return res.json();
      // })
      .then((body) => {
        setExpenseGenerated(body);
        setLoading(false);
        setNoContent(false);
      })
      .catch(function (error) {
        setLoading(false);
        if (error === "noContent") {
          setNoContent(true);
          return;
        }
        return Promise.reject(error);
      });
  };

  return (
    <div className="div-container-admin">
      <div className="expense-container-admin">
        <div className="selector d-flex flex-wrap justify-content-center">
          <select
            className="select my-2"
            value={monthSelect}
            onChange={handleMonthChange}
          >
            <option value={null}>Seleccione...</option>
            {periodList.map((x) => (
              <option key={x} value={x}>
                Mes {x}
              </option>
            ))}
          </select>
          <select
            className="select my-2"
            value={yearSelect}
            onChange={handleYearChange}
          >
            <option value={null}>Seleccione...</option>
            {yearList.map((x) => (
              <option key={x} value={x}>
                {x}
              </option>
            ))}
          </select>
          <button
            className={`m-2 addPayment-btn ${darkMode ? "dark" : ""}`}
            onClick={() => btnGeneratePayHandler(monthSelect, yearSelect)}
          >
            GENERAR COMPROBANTES
          </button>
        </div>
        {loading ? (
          <Loading />
        ) : !noContent ? (
          expenseGenerated.length > 0 ? (
            <table className="table table-hover">
              <thead>
                <tr>
                  <th scope="col">Lote</th>
                  <th scope="col">Monto</th>
                  <th scope="col">Vencimiento</th>
                </tr>
              </thead>
              <tbody className="">
                {expenseGenerated.map((e) => (
                  <tr
                    className={`${
                      new Date(e.expirationDate) < Date.now() ? "late-row" : ""
                    }`}
                  >
                    <th scope="row">
                      {"#"} {e.landId}
                    </th>
                    <td>$ {e.totalCost}</td>
                    <td>{new Date(e.expirationDate).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            ""
          )
        ) : (
          <span className={darkMode ? "span-exists dark" : "span-exists"}>
            Las expensas para ese Periodo YA EXISTEN
          </span>
        )}
      </div>
    </div>
  );
};

export default Payment;
