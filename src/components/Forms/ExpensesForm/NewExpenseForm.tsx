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
import {
  lastExpenseState,
  newExpenseMethodAtom,
  newExpenseState,
} from "src/Recoil/Atoms";
import { currencies } from "src/utils/currency";
import PATH from "src/utils/path";
import { ExpensesFormStyle } from "./Styles";
import { useRouter } from "next/router";
import dayjs from "dayjs";
import { categories } from "./categories";
import { shops } from "./shops";

export const NewExpenseForm = () => {
  const router = useRouter();
  const f = useExpensesFunctions();

  const [newExpenses, setNewExpenses] = useRecoilState(newExpenseState);
  const [lastExpenses, setLastExpenses] = useRecoilState(lastExpenseState);
  const [allShops, setShops] = useState(shops);
  const [name, setName] = useState("");
  const [newExpenseMethod, setNewExpenseMethod] =
    useRecoilState(newExpenseMethodAtom);
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
    setNewExpenses({ ...newExpenses, [e.target.name]: e.target.value });
  };
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

  const sendNewExpense = (e: any) => {
    e.preventDefault();

    setLastExpenses(newExpenses);
    const userUnparsed = localStorage.getItem("user");
    if (!userUnparsed) {
      router.push(PATH.LOGIN);
    }
    const user = JSON.parse(userUnparsed || "");
    const { id } = user;

    const product = () => {
      const {
        name,
        amount,
        price,
        date,
        time,
        category,
        currency,
        shop,
        isMinus,
      } = newExpenses;
      return {
        name,
        amount,
        price: price * 100,
        currency,
        date,
        time,
        category,
        shop,
        isMinus,
        userID: id,
      };
    };
    checkValid() &&
      axios
        .post(PATH.API.EXPENSES, product())
        .then(() => {
          // message if success or error
          message.success("Expense added");
        })
        .catch((err) => {
          console.log(err);
          message.error("Error adding expense");
        });

    f.getExpenses();
    setNewExpenses({
      ...initialNewExpenseState,
      date: lastExpenses.date,
      time: lastExpenses.time,
      shop: lastExpenses.shop,
      category: lastExpenses.category,
      currency: lastExpenses.currency,
      isMinus: lastExpenses.isMinus,
    });
  };
  const editExpense = (e: { preventDefault: () => void }) => {
    e.preventDefault();

    const userUnparsed = localStorage.getItem("user");
    if (!userUnparsed) {
      router.push(PATH.LOGIN);
    }
    const user = JSON.parse(userUnparsed || "");
    const { id: userID } = user;

    const product = () => {
      const {
        id,
        name,
        amount,
        price,
        date,
        time,
        category,
        currency,
        shop,
        isMinus,
      } = newExpenses;
      return {
        id,
        name,
        amount,
        price: price * 100,
        currency,
        date,
        time,
        category,
        shop,
        isMinus,
        userID,
      };
    };
    checkValid() &&
      axios
        .put(`${PATH.API.EXPENSES}/${product().id}`, product())
        .then(() => {
          message.success("Expense edited");
        })
        .catch((err) => {
          console.log(err);
          message.error("Error editing expense");
        });
    setNewExpenseMethod("Add");
    f.getExpenses();
    setNewExpenses({
      ...initialNewExpenseState,
      date: lastExpenses.date,
      time: lastExpenses.time,
      shop: lastExpenses.shop,
      category: lastExpenses.category,
      currency: lastExpenses.currency,
      isMinus: lastExpenses.isMinus,
    });
  };

  return (
    <ExpensesFormStyle
      onSubmit={() => {
        if (newExpenseMethod === "Add") {
          sendNewExpense;
        } else if (newExpenseMethod === "Edit") {
          editExpense;
        }
      }}
    >
      <div className="line">
        <Input
          autoFocus
          required
          className="name"
          name="name"
          value={newExpenses.name}
          onChange={(e) => modifyNewExpense(e)}
          placeholder="Name of the poduct"
          prefix={<UserOutlined />}
        />

        <Select
          dropdownMatchSelectWidth={false}
          showSearch
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
          dropdownMatchSelectWidth={false}
          showSearch
          value={newExpenses.shop}
          placeholder="Shop"
          onChange={(e) =>
            setNewExpenses({
              ...newExpenses,
              shop: e as string,
            })
          }
          options={allShops}
          dropdownRender={(menu) => (
            <>
              {menu}
              <Divider style={{ margin: "8px 0" }} />
              <Space style={{ padding: "0 8px 4px" }}>
                <Input
                  autoComplete="off"
                  placeholder="Add a shop"
                  name="shop"
                  ref={inputRef}
                  value={name}
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
        />
      </div>
      <div className="line">
        <div className="money">
          <Select
            dropdownMatchSelectWidth={false}
            className="minusSelect"
            onChange={(e) => {
              setNewExpenses({
                ...newExpenses,
                isMinus: e as boolean,
              });
            }}
            options={[
              { label: "-", value: true },
              { label: "+", value: false },
            ]}
            value={newExpenses.isMinus}
          />

          <input
            required
            type="number"
            min="0.00"
            className="price"
            max="10000.00"
            step="0.01"
            name={"price"}
            value={newExpenses.price}
            placeholder={"price"}
            onChange={floatToInteger}
          />

          <Select
            dropdownMatchSelectWidth={false}
            onChange={(e) => {
              setNewExpenses({
                ...newExpenses,
                currency: e as string,
              });
            }}
            options={currencies}
            value={newExpenses.currency}
          />
        </div>
        <div className="amount-box">
          <span className="prefix">x</span>
          <input
            type="number"
            min="1"
            max="100"
            className="amount"
            step="1"
            name={"amount"}
            value={newExpenses.amount}
            placeholder={"amount"}
            onChange={(e) => modifyNewExpense(e)}
          />
        </div>

        <DatePicker
          value={dayjs(newExpenses.date, "YYYY/MM/DD")}
          onChange={(e) => setNewExpenses({ ...newExpenses, date: e as any })}
        />

        <TimePicker
          name={"time"}
          value={dayjs(newExpenses.time, "HH:mm:ss")}
          onChange={(e) => setNewExpenses({ ...newExpenses, time: e as any })}
        />
      </div>

      <Button
        type="primary"
        onClick={(e) => {
          if (newExpenseMethod === "Add") {
            sendNewExpense(e);
          } else if (newExpenseMethod === "Edit") {
            editExpense(e);
          }
        }}
      >
        {newExpenseMethod}
      </Button>
    </ExpensesFormStyle>
  );
};
