import {
  Button,
  DatePicker,
  Divider,
  Input,
  message,
  Select,
  Space,
  InputRef,
  TimePicker,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import axios from "axios";
import { UserOutlined } from "@ant-design/icons";
import React, { useRef, useState } from "react";
import { useRecoilState } from "recoil";
import { initialNewExpenseState } from "src/utils/initialStates";
import useExpensesFunctions from "src/hooks/useExpensesFunctions";
import { lastExpenseState, newExpenseState } from "src/Recoil/Atoms";
import { currencies } from "src/utils/currency";
import PATH from "src/utils/path";
import { ExpensesFormStyle } from "./Styles";
import { useRouter } from "next/router";
import dayjs from "dayjs";
import { categories, shops } from "./valuesForForm";

export const NewExpenseForm = () => {
  const router = useRouter();
  const f = useExpensesFunctions();

  const [newExpenses, setNewExpenses] = useRecoilState(newExpenseState);
  const [lastExpenses, setLastExpenses] = useRecoilState(lastExpenseState);
  const [isMinus, setIsMinus] = React.useState(true);
  const [allShops, setShops] = useState(shops);
  const [name, setName] = useState("");
  //

  const inputRef = useRef<InputRef>(null);
  const addItem = (
    e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>
  ) => {
    e.preventDefault();
    const newShop = {
      label: name,
      value: name,
    };
    setShops([...allShops, newShop]);
    setName("");
    setTimeout(() => {
      inputRef.current?.focus();
    }, 0);
  };
  //
  const modifyNewExpense = (e: { target: { name: string; value: string } }) => {
    setNewExpenses({ ...newExpenses, [e.target.name]: e.target.value });
  };
  const floatToInteger = (e: any) => {
    setNewExpenses({ ...newExpenses, [e.target.name]: e.target.value * 100 });
  };
  const [currency, setCurrency] = React.useState("EURO");

  const sendNewExpense = (e: any) => {
    e.preventDefault();

    setLastExpenses(newExpenses);
    const userUnparsed = localStorage.getItem("user");
    if (!userUnparsed) {
      router.push(PATH.LOGIN);
    }
    const user = JSON.parse(userUnparsed || "");
    const { id } = user;

    const checkValid = () => {
      if (newExpenses.name === "") {
        message.error("Introduce un nombre");
        return false;
      }
      if (newExpenses.amount === 0) {
        message.error("Introduce una cantidad");
        return false;
      }
      if (newExpenses.price === 0) {
        message.error("Introduce un precio");
        return false;
      }
      if (newExpenses.date === "") {
        message.error("Introduce una fecha");
        return false;
      }
      if (newExpenses.time === "") {
        message.error("Introduce una hora");
        return false;
      }
      if (newExpenses.category === "") {
        message.error("Introduce una categoría");
        return false;
      }
      if (newExpenses.shop === "") {
        message.error("Introduce una tienda");
        return false;
      }
      return true;
    };
    const product = () => {
      const { name, amount, price, date, time, category, shop, isMinus } =
        newExpenses;
      return {
        name,
        amount,
        price,
        currency,
        date,
        time,
        category,
        shop,
        isMinus,
        userID: id,
      };
    };
    checkValid() && axios.post(PATH.API.EXPENSES, product());
    f.getExpenses();
    setNewExpenses({
      ...initialNewExpenseState,
      date: dayjs().format("YYYY-MM-DD"),
      time: dayjs().format("HH:mm:ss"),
      shop: lastExpenses.shop,
      category: lastExpenses.category,
      currency: lastExpenses.currency,
    });
  };

  const dateFormat = "DD/MM/YYYY";

  return (
    <ExpensesFormStyle onSubmit={sendNewExpense}>
      <Input
        required
        name="name"
        value={newExpenses.name}
        onChange={(e) => modifyNewExpense(e)}
        placeholder="Name of the poduct"
        prefix={<UserOutlined />}
      />

      <Select
        showSearch
        style={{ minWidth: 150 }}
        options={categories}
        value={newExpenses.category}
        placeholder="Category"
        onChange={(e) =>
          setNewExpenses({
            ...newExpenses,
            category: e as string,
          })
        }
      />
      <Select
        showSearch
        style={{ minWidth: 200 }}
        value={newExpenses.shop}
        placeholder="Shop"
        onChange={(e) =>
          setNewExpenses({
            ...newExpenses,
            shop: e as string,
          })
        }
        dropdownRender={(menu) => (
          <>
            {menu}
            <Divider style={{ margin: "8px 0" }} />
            <Space style={{ padding: "0 8px 4px" }}>
              <Input
                name="shop"
                ref={inputRef}
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
              <Button
                type="primary"
                icon={<PlusOutlined />}
                onClick={addItem}
              ></Button>
            </Space>
          </>
        )}
        options={allShops}
      />
      <div className="money">
        <Select
          onChange={() => {
            setIsMinus(!isMinus);
            setNewExpenses({
              ...newExpenses,
              isMinus: !isMinus,
            });
          }}
          options={[
            { label: "-", value: true },
            { label: "+", value: false },
          ]}
          value={isMinus}
        />

        <input
          required
          type="number"
          min="0.00"
          max="10000.00"
          step="0.01"
          name={"price"}
          value={newExpenses.price / 100}
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
        type="number"
        min="1"
        max="100"
        step="1"
        name={"amount"}
        value={newExpenses.amount}
        placeholder={"amount"}
        onChange={(e) => modifyNewExpense(e)}
      />
      <DatePicker defaultValue={dayjs(newExpenses.date, dateFormat)} />

      <TimePicker
        name={"time"}
        value={dayjs(newExpenses.time, "HH:mm:ss")}
        onChange={(e) => setNewExpenses({ ...newExpenses, time: e as any })}
      />

      <Button type="primary" onClick={sendNewExpense}>
        Enviar
      </Button>
    </ExpensesFormStyle>
  );
};
