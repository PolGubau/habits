import { useEffect } from "react";
import { IExpense } from "./utils/initialStates";
import { useRecoilState, useRecoilValue } from "recoil";
import useExpensesFunctions from "./utils/useExpensesFunctions";
import LayoutPage from "src/Layouts/Layout";
import { expensesState, loadingAtom } from "src/Recoil/Atoms";
import { message, notification, Table, Tabs, TabsProps, Tag } from "antd";
import { NewExpenseForm } from "src/components/Forms/ExpensesForm/NewExpenseForm";
import moment from "moment";
import { ExpensesPageStyle } from "src/styles/PageStyles/ExpensesPageStyles";

const Expenses = () => {
  const [, setLoading] = useRecoilState(loadingAtom);
  useEffect(() => {
    setLoading(false);
  }, []);
  const [messageApi, contextHolder] = message.useMessage();

  const openNotification = () => {
    messageApi.open({
      type: "success",
      content: "This is a success message",
    });
  };
  //

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
    return {
      key: expense.id,
      name: expense.name,
      price: expense.isMinus ? -expense.price : expense.price,
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
      width: 100,
      sorter: (a: any, b: any) => a.price - b.price,
      render: (price: any) => (
        <Tag color={price > 0 ? "green" : "red"}>{price / 100 + " €"}</Tag>
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
            // handleDeleteRow(id);
            openNotification("top");
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
      children: `Content of Tab Pane 2`,
    },
  ];
  return (
    <LayoutPage>
      <ExpensesPageStyle>
        {contextHolder}

        <Tabs defaultActiveKey="1" items={items} />
      </ExpensesPageStyle>
      <NewExpenseForm />
    </LayoutPage>
  );
};
export default Expenses;
