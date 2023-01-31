import { Button, Input } from "antd";
import axios from "axios";
import { UserOutlined } from "@ant-design/icons";
import React from "react";
import { useRecoilState } from "recoil";
import { initialNewExpenseState } from "src/pages/expenses/utils/initialStates";
import useExpensesFunctions from "src/pages/expenses/utils/useExpensesFunctions";
import { newExpenseState } from "src/Recoil/Atoms";
import { convertToEuro, currencies } from "src/utils/currency";
import PATH from "src/utils/path";
import { ExpensesFormStyle } from "./Styles";
import dayjs from "dayjs";

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
  const [currency, setCurrency] = React.useState("EURO");

  const sendNewExpense = (e: any) => {
    e.preventDefault();

    const product = () => {
      const { name, amount, price, date, time, category, shop, isMinus } =
        newExpenses;
      return {
        name,
        amount,
        price: convertToEuro(currency, price),
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
    setNewExpenses(initialNewExpenseState);
  };

  return (
    <ExpensesFormStyle onSubmit={sendNewExpense}>
      <Input
        required
        name="name"
        value={newExpenses.name}
        onChange={modifyNewExpense}
        placeholder="Name of the poduct"
        prefix={<UserOutlined />}
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
      <div className="money">
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
        <select
          defaultValue={currency}
          onChange={(e) => setCurrency(e.target.value)}
        >
          {currencies.map((currency) => {
            return (
              <option key={currency.value} value={currency.value}>
                {currency.label}
              </option>
            );
          })}
        </select>
      </div>

      <input
        type={"number"}
        min={1}
        name="amount"
        required
        step={1}
        max={10000}
        placeholder={"amount"}
        defaultValue={newExpenses.amount}
        onChange={(e: any) => modifyNewExpense(e)}
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
      <Button type="primary" onClick={sendNewExpense}>
        Enviar
      </Button>
    </ExpensesFormStyle>
  );
};
