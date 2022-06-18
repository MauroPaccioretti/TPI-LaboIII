import React from "react";

const ExpensesByLand = ({ arrExpense }) => {
  const landId = arrExpense[0].landId;
  arrExpense.map((x) => console.log(x, x.landId));

  return arrExpense.length > 0 ? (
    <div>
      <h4>{landId}</h4>
      {arrExpense.map((x) => (
        <div key={x.id}>
          <p>Costo de la expensa: {x.totalCost}</p>
          <p>Fecha de vencimiento: {x.expirationDate}</p>
          <p>Fecha de pago: {x.datePaid ? x.datePaid : "Sin pagar"}</p>
        </div>
      ))}
    </div>
  ) : (
    <div>El lote no tiene expensas</div>
  );
};

export default ExpensesByLand;
