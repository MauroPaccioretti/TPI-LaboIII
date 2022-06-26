import React, { useContext, useEffect, useState } from "react";
import { customFetchWithBody } from "../utils/helpers";
import { useAuth } from "../Context/AuthContextProvider";
import Loading from "components/Loading";
import Expense from "components/Expense";
import "assets/style/Payment.css";
import { DarkModeContext } from "Context/DarkModeContext";
import { toast } from "react-toastify";

const Payment = () => {
  const auth = useAuth();
  const { darkMode } = useContext(DarkModeContext);
  const [expenseGenerated, setExpenseGenerated] = useState([]);
  const [monthSelect, setMonthSelect] = useState("");
  const [yearSelect, setYearSelect] = useState("");
  const [noContent, setNoContent] = useState(false);
  const [loading, setLoading] = useState(false);
  const periodList = Array.from({ length: 12 }, (_, i) => i + 1);
  const yearList = Array.from({ length: 5 }, (_, i) => i + 2022);
  const handleMonthChange = (e) => {
    console.log(e.target.value);
    setMonthSelect(e.target.value);
  };
  const handleYearChange = (e) => {
    console.log(e.target.value);
    setYearSelect(e.target.value);
  };

  const btnGeneratePayHandler = (month, year) => {
    if (!month || !year) {
      toast.error("Debe seleccionar un período");
      return;
    }
    const formattedMonth = ("0" + month).slice(-2);
    console.log(month);
    console.log(year);
    setLoading(true);
    customFetchWithBody(
      "POST",
      "/expense/",
      { expirationDate: `${year}-${formattedMonth}-10` },
      auth.token
    )
      .then((res) => {
        console.log(res);
        if (res.status === 204) {
          return Promise.reject("noContent");
        }
        return res.json();
      })
      .then((body) => {
        console.log(body);
        setExpenseGenerated(body);
        setLoading(false);
        setNoContent(false);
      })
      .catch(function (error) {
        setLoading(false);
        if (error == "noContent") {
          setNoContent(true);
          return;
        }
        return Promise.reject(error);
      });
  };

  return (
    <div className="div-container-admin">
      <div className="expense-container-admin">
        <div className="selector">
          <select
            className="select"
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
            className="select"
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
            className={`addPayment-btn ${darkMode ? "dark" : ""}`}
            onClick={() => btnGeneratePayHandler(monthSelect, yearSelect)}
          >
            GENERAR COMPROBANTES
          </button>
        </div>
        <div className="expense-container-admin-inside">
          {loading ? (
            <Loading />
          ) : !noContent ? (
            <div className="my-expenses-card-container-admin">
              {expenseGenerated.map((x) => (
                <Expense expense={x} />
              ))}
            </div>
          ) : (
            <span className={darkMode ? "span-exists dark" : "span-exists"}>
              Las expensas para ese Periodo YA EXISTEN
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default Payment;
