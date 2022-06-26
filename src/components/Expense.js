import React, { useContext } from "react";
import "assets/style/Expense.css";
import { DarkModeContext } from "Context/DarkModeContext";

const Expense = ({ expense }) => {
  const { darkMode } = useContext(DarkModeContext);
  const { datePaid, expirationDate, totalCost } = expense;
  let state = "";
  if (!datePaid && new Date(expirationDate) < Date.now()) {
    state = "late";
  }
  if (!datePaid && new Date(expirationDate) > Date.now()) {
    state = "to-pay";
  }
  if (datePaid && new Date(datePaid) > new Date(expirationDate)) {
    state = "paid-late";
  }
  console.log(datePaid, new Date(datePaid));
  //   console.log(new Date(expirationDate).toLocaleDateString());
  //   console.log(typeof expirationDate);
  const month = new Date(expirationDate).getMonth() + 1;
  return (
    <div className={`expense-element ${state} ${darkMode ? "dark" : ""}`}>
      <h5>
        Periodo {month} / {new Date(expirationDate).getFullYear()}
      </h5>
      <ul>
        <li>Costo de la expensa: ${totalCost}</li>
        <li>
          Fecha de vencimiento: {new Date(expirationDate).toLocaleDateString()}
        </li>
        <li>
          Fecha de pago:{" "}
          {datePaid ? new Date(datePaid).toLocaleDateString() : "Sin pagar"}
        </li>
      </ul>
    </div>
  );
};

export default Expense;
