import axios from "axios";
import React from "react";
import { useRecoilState } from "recoil";
import { initialNewExpenseState } from "src/pages/expenses/utils/initialStates";
import useExpensesFunctions from "src/pages/expenses/utils/useExpensesFunctions";
import { getNewExpense } from "src/Recoil/Selectors";
import PATH from "src/utils/path";

export const NewExpenseForm = () => {
  const f = useExpensesFunctions();

  const [newExpenses, setNewExpenses] = useRecoilState(getNewExpense);

  const modifyNewExpense = (e: { target: { name: string; value: string } }) => {
    setNewExpenses({ ...newExpenses, [e.target.name]: e.target.value });
  };
  const floatToInteger = (e: any) => {
    setNewExpenses({ ...newExpenses, [e.target.name]: e.target.value * 100 });
  };

  const sendNewExpense = (e: any) => {
    e.preventDefault();
    try {
      axios.post(PATH.API.EXPENSES, newExpenses);
      setNewExpenses(initialNewExpenseState);
      f.getExpenses();
    } catch (error) {
      console.log("error", error);
    }
  };
  return (
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
  );
};
