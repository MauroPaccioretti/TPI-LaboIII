import React from "react";
import Expense from "./Expense";

const ExpensesByLand = ({ arrExpense }) => {
  const landId = arrExpense[0].landId;

  return arrExpense.length > 0 ? (
    <div className="expenses-by-land">
      <h4 className="expense-by-land--landid">Lote #{landId}</h4>

      <div className="expenses-by-land--elements">
        {arrExpense.map((x) => (
          <Expense key={x.id} expense={x} />
        ))}
      </div>
    </div>
  ) : (
    <div>El lote no tiene expensas</div>
  );
};

export default ExpensesByLand;
