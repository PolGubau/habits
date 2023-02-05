import React, { useEffect } from "react";
import { IExpense } from "../utils/initialStates";
import { useRecoilValue } from "recoil";
import useExpensesFunctions from "../hooks/useExpensesFunctions";
import LayoutPage from "src/Layouts/Layout";
import { expensesState } from "src/Recoil/Atoms";
import { message, Switch, Table, Tabs, TabsProps, Tag } from "antd";
import { NewExpenseForm } from "src/components/Forms/ExpensesForm/NewExpenseForm";
import moment from "moment";
import { ExpensesPageStyle } from "src/styles/PageStyles/ExpensesPageStyles";
import LineChart from "../components/Screens/Charts";
import { RiDeleteBin7Line } from "react-icons/ri";
import PATH from "src/utils/path";
import { useRouter } from "next/router";
import { convertToEuro } from "src/utils/currency";
import ExpensesEstadistics from "src/components/Stadistics/Expenses/ExpensesEstadistics";

const Expenses = () => {
  const f = useExpensesFunctions();
  const [seeTotalPrice, setSeeTotalPrice] = React.useState(true);
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
  const handleDeleteRow = (id: any) => {
    f.deleteExpense(Number(id));
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
      amount: expense.amount,
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
      title: "Amount",
      dataIndex: "amount",
      key: "amount",

      sorter: (a: any, b: any) => a.amount - b.amount,
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      sorter: (a: any, b: any) =>
        new Date(a.date).getTime() - new Date(b.date).getTime(),
      render: (date: any) => moment(date).format("DD/MM/YYYY HH:mm"),
      defaultSortOrder: "descend",
    },
    {
      title: "",
      key: "action",
      render: () => (
        <Tag
          className="deleteAction"
          onClick={(e) => {
            e.preventDefault();
            const id =
              e.currentTarget.parentElement?.parentElement?.getAttribute(
                "data-row-key"
              );
            handleDeleteRow(id);
            messageSuccess();
          }}
        >
          <RiDeleteBin7Line />
        </Tag>
      ),
    },
  ];

  const items: TabsProps["items"] = [
    {
      key: "1",
      label: `Tabla`,
      children: (
        <Table
          dataSource={dataSource}
          columns={columns as any}
          pagination={{ pageSize: 5 }}
          sticky
        />
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
