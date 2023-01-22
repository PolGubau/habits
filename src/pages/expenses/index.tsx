import { useEffect } from "react";
import { IExpense } from "./utils/initialStates";
import { useRecoilValue } from "recoil";
import useExpensesFunctions from "./utils/useExpensesFunctions";
import { getExpenses } from "src/state/Selectors";
import { NewExpenseForm } from "src/components/Forms/ExpensesForm/NewExpenseForm";

const Expenses = () => {
  const f = useExpensesFunctions();
  const expenses = useRecoilValue(getExpenses);

  useEffect(() => {
    f.getExpenses();
  }, []);

  return (
    <>
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
      <NewExpenseForm />
    </>
  );
};
export default Expenses;
