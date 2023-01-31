import { useEffect } from "react";
import { IExpense } from "./utils/initialStates";
import { useRecoilState, useRecoilValue } from "recoil";
import useExpensesFunctions from "./utils/useExpensesFunctions";
import LayoutPage from "src/Layouts/Layout";
import { expensesState, loadingAtom } from "src/Recoil/Atoms";
import { message, Switch, Table, Tabs, TabsProps, Tag, Tooltip } from "antd";
import { NewExpenseForm } from "src/components/Forms/ExpensesForm/NewExpenseForm";
import moment from "moment";
import { ExpensesPageStyle } from "src/styles/PageStyles/ExpensesPageStyles";
import LineChart from "./Screens/Charts";
import React from "react";
import PATH from "src/utils/path";
import { useRouter } from "next/router";

const Expenses = () => {
  const [, setLoading] = useRecoilState(loadingAtom);
  const router = useRouter();
  useEffect(() => {
    setLoading(false);
    if (!localStorage.getItem("user")) {
      router.push(PATH.LOGIN);
    }
  }, []);

  const [messageApi, contextHolder] = message.useMessage();

  const messageSuccess = () => {
    messageApi.open({
      type: "success",
      content: "Your expense has been deleted",
    });
  };
  //
  const [seeTotalPrice, setSeeTotalPrice] = React.useState(true);

  const f = useExpensesFunctions();
  const expenses = useRecoilValue(expensesState);
  console.log(expenses);

  useEffect(() => {
    f.getExpenses();
  }, []);

  const dateFormater = (date: string) => {
    return new Date(date).getTime();
  };
  const handleDeleteRow = (id: any) => {
    f.deleteExpense(Number(id));
  };

  const dataSource = expenses?.map((expense: IExpense) => {
    const formalizedPrice = () => {
      const price = seeTotalPrice
        ? expense.price * expense.amount
        : expense.price;

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
      width: 200,
    },

    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      width: 100,
      sorter: (a: any, b: any) => a.price - b.price,
      render: (price: number) => (
        <Tag color={price > 0 ? "green" : "red"}>{price / 100 + " €"}</Tag>
      ),
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      width: 130,
    },
    {
      title: "Shop",
      dataIndex: "shop",
      key: "shop",
      width: 130,
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      width: 100,

      sorter: (a: any, b: any) => a.amount - b.amount,
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      width: 200,
      sorter: (a: any, b: any) =>
        new Date(a.date).getTime() - new Date(b.date).getTime(),
      render: (date: any) => moment(date).format("DD/MM/YYYY HH:mm"),
      defaultSortOrder: "descend",
    },
    {
      title: "Action",
      width: 100,
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
          Delete
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

        <Switch
          defaultChecked
          onChange={() => setSeeTotalPrice(!seeTotalPrice)}
        />

        <Tabs defaultActiveKey="1" items={items} style={{}} />
      </ExpensesPageStyle>
      <NewExpenseForm />
    </LayoutPage>
  );
};
export default Expenses;
