import { atom } from "recoil";
import { IExpense, initialNewExpenseState } from "src/utils/initialStates";
import { initialValueShops } from "./initialValues/InitialValueShops";

export const expensesState = atom({
  key: "expensesState",
  default: [] as IExpense[],
});
export const newExpenseState = atom({
  key: "expenseNewState",
  default: initialNewExpenseState,
});
export const lastExpenseState = atom({
  key: "expenseLastAtom",
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
