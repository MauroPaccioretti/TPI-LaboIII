import React, { useEffect, useState } from "react";
import {
  customFetch,
  handleServerError,
  customFetchWithBody,
} from "utils/helpers.js";
import { useAuth, useAuthDispatch } from "../Context/AuthContextProvider";
import Loading from "components/Loading";
import "assets/style/TableExpense.css";
import { toast } from "react-toastify";

const ExpensesUnpaid = () => {
  const auth = useAuth();
  const dispatch = useAuthDispatch();
  const [expensesUnpaid, setExpensesUnpaid] = useState([]);
  const [loading, setLoading] = useState(true);
  // const [showInput, setShowInput] = useState(false);
  // const [noContent, setNoContent] = useState(false);
  const [inputPayDate, setInputPayDate] = useState("");
  // let state;

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
        // console.log(body);
        setExpensesUnpaid(body);
        setLoading(false);
      });
  }, []);

  const btnAddPay = (PayDate, idExpense) => {
    setLoading(true);
    // if (!PayDate) {
    //   return;
    // }
    // console.log(PayDate);
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
        // setNoContent(false);
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
            // console.log(body);
            setExpensesUnpaid(body);
            setLoading(false);
            setInputPayDate("");
          });
      })
      .catch(function (error) {
        if (error === "noContent") {
          // setNoContent(true);
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
      {loading ? (
        <Loading />
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
                    <input
                      type="date"
                      value={inputPayDate}
                      onInput={inputPayDateHandler}
                    ></input>
                    <button
                      className="addPay-btn"
                      onClick={() => {
                        btnAddPay(inputPayDate, e.id);
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
      ;
    </div>
  );
};
export default ExpensesUnpaid;
