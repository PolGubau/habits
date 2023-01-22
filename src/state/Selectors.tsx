import { selector } from "recoil";
import { expensesState } from "./Atoms";

export const getExpenses = selector({
  key: "getExpenses",
  get: ({ get }) => {
    return get(expensesState);
  },
});
