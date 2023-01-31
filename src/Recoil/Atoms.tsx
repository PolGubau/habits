import { atom } from "recoil";
import { initialNewExpenseState } from "src/pages/expenses/utils/initialStates";
import { initialValueShops } from "./initialValues/InitialValueShops";

export const loadingAtom = atom({
  key: "loadingStateAtom",
  default: false,
});

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

export const yourCategoriessAtom = atom({
  key: "yourCategoriessAtom",
  default: [
    { label: "Fruta", value: "Fruta" },
    { label: "Verdura", value: "Verdura" },
    { label: "Carne", value: "Carne" },
    { label: "Pescado", value: "Pescado" },
    { label: "Dulces", value: "Dulces" },
    { label: "Alquiler", value: "Alquiler" },
  ],
});

export const yourShopsAtom = atom({
  key: "yourShopsAtom",
  default: initialValueShops,
});
