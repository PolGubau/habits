import { useEffect } from "react";

import { useRecoilValue } from "recoil";
import useExpensesFunctions from "./utils/useExpensesFunctions";
import { FoodFormState, getExpenses, getFood } from "src/state/Selectors";
import { NewExpenseForm } from "src/components/Forms/ExpensesForm/NewExpenseForm";
import { IFood } from "src/components/Forms/ExpensesForm/utils/initialState";
import { NewFoodForm } from "src/components/Forms/Food/FoodNewForm";

const FoodPage = () => {
  const f = useExpensesFunctions();
  const food = useRecoilValue(getFood);

  useEffect(() => {
    f.getExpenses();
  }, []);

  return (
    <>
      <div>
        {food &&
          food.map((item: IFood) => (
            <div key={item.id}>
              <p>{item.id}</p>
              <p>{item.name}</p>

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
      <NewFoodForm />
    </>
  );
};
export default FoodPage;
