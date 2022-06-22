import React, { useEffect, useState } from "react";
import { customFetchWithBody } from "../utils/helpers";
import { useAuth } from "../Context/AuthContextProvider";
import Loading from "components/Loading";
import Expense from "components/Expense";

const Payment = () => {
  const auth = useAuth();
  const [expenseGenerated, setExpenseGenerated] = useState([]);
  const [catchError, setCatchError] = useState("");
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    customFetchWithBody(
      "POST",
      "/expense/",
      { expirationDate: "2022-07-02" },
      auth.token
    )
      .then((res) => res.json())
      .then((body) => {
        setExpenseGenerated(body);
        setLoading(false);
      })
      .catch(function (error) {
        console.log("Show", error);
        return Promise.reject(error);
      });
  }, []);

  const btnGeneratePayHandler = () => {
    console.log("generated");
  };

  return (
    <div>
      <button onClick={btnGeneratePayHandler}>GENERAR COMPROBANTES</button>
      {/* {loading ? (
        <Loading />
      ) : (
        // <div className="my-expenses-card-container">
        //   {expenseGenerated.map((x) => (
        //     <Expense expense={x} />
        //   ))}
        // </div>
      )} */}
    </div>
  );
};

export default Payment;
