import { atom } from "recoil";
import { initialNewFoodState } from "src/components/Forms/ExpensesForm/utils/initialState";
import { initialNewExpenseState } from "src/pages/expenses/utils/initialStates";

export const expensesState = atom({
  key: "expensesState",
  default: [],
});
export const newExpenseState = atom({
  key: "expenseNewState",
  default: initialNewExpenseState,
});
//
//
export const foodState = atom({
  key: "foodState",
  default: [],
});
export const foodNewState = atom({
  key: "foodNewState",
  default: initialNewFoodState,
});
