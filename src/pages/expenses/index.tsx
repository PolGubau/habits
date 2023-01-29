import { useEffect } from "react";
import { IExpense } from "./utils/initialStates";
import { useRecoilState, useRecoilValue } from "recoil";
import useExpensesFunctions from "./utils/useExpensesFunctions";
import LayoutPage from "src/Layouts/Layout";
import { expensesState, loadingAtom } from "src/Recoil/Atoms";
import ExpenseForm from "src/components/Forms/ExpensesForm/ExpenseForm";
import { NewExpenseForm } from "src/components/Forms/ExpensesForm/NewExpenseForm";

const Expenses = () => {
  const [, setLoading] = useRecoilState(loadingAtom);
  useEffect(() => {
    setLoading(false);
  }, []);

  const f = useExpensesFunctions();
  const expenses = useRecoilValue(expensesState);

  useEffect(() => {
    f.getExpenses();
  }, []);

  return (
    <LayoutPage>
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
      <ExpenseForm />
      <NewExpenseForm />
    </LayoutPage>
  );
};
export default Expenses;
