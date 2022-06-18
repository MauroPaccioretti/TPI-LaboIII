import React, { useEffect, useState } from "react";
import { customFetch } from "../utils/helpers";
import { useAuth } from "../Context/AuthContextProvider";
import Loading from "components/Loading";
import ExpensesByLand from "components/ExpensesByLand";

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
        <div className="card-container">
          {expenses.map((x) => (
            <ExpensesByLand arrExpense={x} />
          ))}
        </div>
      )}
    </div>
  );
};

export default MyExpenses;