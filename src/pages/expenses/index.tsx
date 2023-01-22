import PATH from "src/utils/path";
import { useState, useEffect } from "react";
import axios from "axios";
import { IExpense, initialState } from "./utils/initialStates";
import { useRecoilValue } from "recoil";
import useExpensesFunctions from "./utils/useExpensesFunctions";
import { getExpenses } from "src/state/Selectors";

const Expenses = () => {
  const f = useExpensesFunctions();
  const [newExpenses, setNewExpenses] = useState(initialState);
  useEffect(() => {
    f.getExpenses();
  }, []);

  const modifyNewExpense = (e: any) => {
    setNewExpenses({ ...newExpenses, [e.target.name]: e.target.value });
  };
  const floatToInteger = (e: any) => {
    setNewExpenses({ ...newExpenses, [e.target.name]: e.target.value * 100 });
  };

  const sendNewExpense = (e: any) => {
    e.preventDefault();
    try {
      axios.post(PATH.API.EXPENSES, newExpenses);
      setNewExpenses(initialState);
      f.getExpenses();
    } catch (error) {
      console.log("error", error);
    }
  };
  const expenses = useRecoilValue(getExpenses);

  return (
    <>
      <div>
        {expenses &&
          expenses.map((item: IExpense) => (
            <div key={item.id}>
              <p>{item.id}</p>
              <p>{item.name}</p>
              <p>{item.amount / 100}</p>
              <p>{item.date}</p>
              <p>{item.category}</p>
              <p>{item.shop}</p>
              <button
                onClick={() => {
                  f.deleteExpense(item.id);
                }}
              >
                X
              </button>
            </div>
          ))}
      </div>
      <form onSubmit={sendNewExpense}>
        <input
          placeholder="name"
          type="text"
          name="name"
          onChange={modifyNewExpense}
          required
          value={newExpenses.name}
        />
        <input
          placeholder="category"
          type="text"
          name="category"
          onChange={modifyNewExpense}
          required
          value={newExpenses.category}
        />
        <input
          placeholder="shop"
          type="text"
          name="shop"
          onChange={modifyNewExpense}
          required
          value={newExpenses.shop}
        />
        <input
          required
          type="number"
          min="0.00"
          max="10000.00"
          step="0.01"
          name={"amount"}
          value={newExpenses.amount / 100}
          onChange={floatToInteger}
        />

        {/* Input to get date and time */}
        <input
          required
          type={"date"}
          name={"date"}
          value={newExpenses.date}
          onChange={modifyNewExpense}
        />
        <input
          type={"time"}
          value={newExpenses.time}
          name={"time"}
          onChange={modifyNewExpense}
        />
        <input type={"submit"} value="enviar" />
      </form>
    </>
  );
};
export default Expenses;
