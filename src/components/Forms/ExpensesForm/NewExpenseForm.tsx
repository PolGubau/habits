import axios from "axios";
import React from "react";
import { useRecoilState } from "recoil";
import useExpensesFunctions from "src/pages/expenses/utils/useExpensesFunctions";
import { newExpenseState } from "src/Recoil/Atoms";
import { convertToEuro, currencies } from "src/utils/currency";
import PATH from "src/utils/path";

export const NewExpenseForm = () => {
  const f = useExpensesFunctions();

  const [newExpenses, setNewExpenses] = useRecoilState(newExpenseState);
  const [isMinus, setIsMinus] = React.useState(1);

  const modifyNewExpense = (e: { target: { name: string; value: string } }) => {
    setNewExpenses({ ...newExpenses, [e.target.name]: e.target.value });
  };
  const floatToInteger = (e: any) => {
    setNewExpenses({ ...newExpenses, [e.target.name]: e.target.value * 100 });
  };

  const sendNewExpense = (e: any) => {
    e.preventDefault();

    const product = () => {
      const { name, amount, price, date, time, category, shop, isMinus } =
        newExpenses;
      return {
        name,
        amount,
        price: convertToEuro("EURO", price),
        date,
        time,
        category,
        shop,
        isMinus,
      };
    };
    console.log(product());

    axios.post(PATH.API.EXPENSES, product());
    f.getExpenses();
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
      <div>
        <select
          name="isMinus"
          value={isMinus}
          onChange={() => {
            setIsMinus(isMinus === 1 ? 0 : 1);
            setNewExpenses({
              ...newExpenses,
              isMinus: isMinus === 1 ? false : true,
            });
          }}
        >
          <option value={1}>-</option>
          <option value={0}>+</option>
        </select>

        <input
          required
          type="number"
          min="0.00"
          max="10000.00"
          step="0.01"
          name={"price"}
          placeholder={"price"}
          onChange={floatToInteger}
        />
        <select>
          {currencies.map((currency) => {
            return (
              <option key={currency.value} value={currency.label}>
                {currency.value}
              </option>
            );
          })}
        </select>
      </div>
      <input
        required
        type="number"
        min="0.00"
        max="10000.00"
        step="0.01"
        name={"amount"}
        placeholder={"amount"}
        value={newExpenses.amount}
        onChange={modifyNewExpense}
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
