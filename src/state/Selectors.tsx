import { selector } from "recoil";
import { expensesState, foodNewState, newExpenseState } from "./Atoms";

export const getExpenses = selector({
  key: "getExpenses",
  get: ({ get }) => {
    return get(expensesState);
  },
  set: ({ set }, newValue) => {
    set(expensesState, newValue);
  },
});
export const getNewExpense = selector({
  key: "getNewExpense",
  get: ({ get }) => {
    return get(newExpenseState);
  },
  set: ({ set }, newValue) => {
    set(newExpenseState, newValue);
  },
});
//
export const getFood = selector({
  key: "getFood",
  get: ({ get }) => {
    return get(expensesState);
  },
  set: ({ set }, newValue) => {
    set(expensesState, newValue);
  },
});
export const FoodFormState = selector({
  key: "FoodFormState",
  get: ({ get }) => {
    return get(foodNewState);
  },
  set: ({ set }, newValue) => {
    set(foodNewState, newValue);
  },
});
