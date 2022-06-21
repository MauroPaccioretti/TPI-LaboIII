import React, { useEffect, useState } from "react";
import { customFetch } from "../utils/helpers";
import { useAuth } from "../Context/AuthContextProvider";
import Loading from "components/Loading";
import ExpensesByLand from "components/ExpensesByLand";
import "assets/style/MyExpenses.css";

const MyExpenses = () => {
  const auth = useAuth();
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    customFetch("GET", "/expense/" + auth.currentUser.id, auth.token)
      .then((res) => res.json())
      .then((body) => {
        setExpenses(body);
        setLoading(false);
      });
  }, []);

  return (
    <div>
      {loading ? (
        <Loading />
      ) : (
        <div className="my-expenses-card-container">
          {expenses.length > 0 ? (
            expenses.map((x) => <ExpensesByLand key={x.id} arrExpense={x} />)
          ) : (
            <p className="no-expenses-text">No hay expensas para mostrar</p>
          )}
        </div>
      )}
    </div>
  );
};

export default MyExpenses;
