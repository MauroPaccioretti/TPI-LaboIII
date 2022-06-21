import React, { useEffect, useState } from "react";
import { customFetch } from "../utils/helpers";
import { useAuth } from "../Context/AuthContextProvider";
import Loading from "components/Loading";
import ExpensesByLand from "components/ExpensesByLand";

const ExpensesUnpaid = () => {
  const auth = useAuth();
  const [expensesUnpaid, setExpensesUnpaid] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    customFetch("GET", "/expense/unpaid/", auth.token)
      .then((res) => res.json())
      .then((body) => {
        setExpensesUnpaid(body);
        setLoading(false);
      });
  }, []);

  return (
    <div>
      {loading ? (
        <Loading />
      ) : (
        <div className="my-expenses-card-container">
          {expensesUnpaid.map((x) => (
            <ExpensesByLand arrExpense={x} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ExpensesUnpaid;
