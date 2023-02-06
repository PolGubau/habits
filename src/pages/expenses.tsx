import React, { useEffect } from "react";
import { IExpense } from "../utils/initialStates";
import { useRecoilState, useRecoilValue } from "recoil";
import useExpensesFunctions from "../hooks/useExpensesFunctions";
import LayoutPage from "src/Layouts/Layout";
import {
  expensesState,
  newExpenseMethodAtom,
  newExpenseState,
} from "src/Recoil/Atoms";
import { Button, message, Table, Tabs, TabsProps, Tag } from "antd";
import { NewExpenseForm } from "src/components/Forms/ExpensesForm/NewExpenseForm";
import moment from "moment";
import { ExpensesPageStyle } from "src/styles/PageStyles/ExpensesPageStyles";
import LineChart from "../components/Screens/Charts";
import { RiDeleteBin7Line } from "react-icons/ri";
import PATH from "src/utils/path";
import { useRouter } from "next/router";
import { convertToEuro } from "src/utils/currency";
import ExpensesEstadistics from "src/components/Stadistics/Expenses/ExpensesEstadistics";
import { RedoOutlined, EditOutlined } from "@ant-design/icons";

const Expenses = () => {
  const f = useExpensesFunctions();
  const [seeTotalPrice, setSeeTotalPrice] = React.useState(true);
  const [, setNewExpenses] = useRecoilState(newExpenseState);
  const [newExpenseMethod, setNewExpenseMethod] =
    useRecoilState(newExpenseMethodAtom);
  const router = useRouter();
  const expenses = useRecoilValue(expensesState);
  const [messageApi, contextHolder] = message.useMessage();

  useEffect(() => {
    if (!localStorage.getItem("user")) {
      router.push(PATH.LOGIN);
      return;
    }
    if (expenses.length === 0) {
      f.getExpenses();
    }
  }, [expenses.length, f, router]);

  const messageSuccess = () => {
    messageApi.open({
      type: "success",
      content: "Your expense has been deleted",
    });
  };
  const dateFormater = (date: string) => {
    return new Date(date).getTime();
  };
  const handleDeleteRow = (id: number | string) => {
    f.deleteExpense(Number(id));
  };
  const handleEditRow = (id: number | string) => {
    const expense: IExpense | undefined = expenses.find(
      (expense) => expense.id === Number(id)
    );
    if (expense) {
      setNewExpenses(expense as any);
    }
  };

  const dataSource = expenses?.map((expense: IExpense) => {
    const formalizedPrice = () => {
      const priceInEuro = convertToEuro(expense.currency, expense.price);
      const price = seeTotalPrice ? priceInEuro * expense.amount : priceInEuro;

      return expense.isMinus ? price * -1 : price;
    };
    return {
      key: expense.id,
      name: expense.name,
      price: formalizedPrice(),
      category: expense.category,
      shop: expense.shop,
      date: dateFormater(expense.date),
    };
  });

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },

    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      sorter: (a: any, b: any) => a.price - b.price,
      render: (price: number) => (
        <Tag color={price > 0 ? "green" : "red"}>{price + " €"}</Tag>
      ),
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
    },
    {
      title: "Shop",
      dataIndex: "shop",
      key: "shop",
    },

    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      sorter: (a: any, b: any) =>
        new Date(a.date).getTime() - new Date(b.date).getTime(),
      render: (date: any) => moment(date).format("YYYY/MM/DD"),
      defaultSortOrder: "descend",
    },
    {
      title: "",
      key: "action",
      render: () => (
        <>
          <Tag
            className="editAction"
            onClick={(e) => {
              e.preventDefault();
              const id =
                e.currentTarget.parentElement?.parentElement?.getAttribute(
                  "data-row-key"
                );
              setNewExpenseMethod("Edit");
              if (id) handleEditRow(id);
            }}
          >
            <EditOutlined />
          </Tag>
          <Tag
            className="deleteAction"
            onClick={(e) => {
              e.preventDefault();
              const id =
                e.currentTarget.parentElement?.parentElement?.getAttribute(
                  "data-row-key"
                );
              if (id) handleDeleteRow(id);

              messageSuccess();
            }}
          >
            <RiDeleteBin7Line />
          </Tag>
        </>
      ),
    },
  ];
  const [loadingState, setLoadingState] = React.useState(false);
  const handleRefresh = () => {
    f.getExpenses();
    setLoadingState(true);

    setTimeout(() => {
      setLoadingState(false);
    }, 300);
  };

  const items: TabsProps["items"] = [
    {
      key: "1",
      label: `Tabla`,
      children: (
        <>
          <Button
            type="primary"
            icon={<RedoOutlined />}
            loading={loadingState}
            value={"Refresh"}
            onClick={handleRefresh}
          >
            Refresh
          </Button>

          <Table
            loading={loadingState}
            dataSource={dataSource}
            columns={columns as any}
            pagination={{ pageSize: 5 }}
            sticky
          />
        </>
      ),
    },
    {
      key: "2",
      label: `Gráfico`,
      children: <LineChart />,
    },
  ];

  return (
    <LayoutPage>
      <ExpensesPageStyle>
        {contextHolder}

        {/* <Switch
          defaultChecked
          onChange={() => setSeeTotalPrice(!seeTotalPrice)}
        /> */}

        <Tabs defaultActiveKey="1" items={items} />
      </ExpensesPageStyle>
      <ExpensesEstadistics />
      <NewExpenseForm />
    </LayoutPage>
  );
};
export default Expenses;
