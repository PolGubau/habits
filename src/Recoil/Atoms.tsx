import { atom } from "recoil";
import { initialNewFoodState } from "src/components/Forms/Food/utils/initialState";
import { initialNewExpenseState } from "src/pages/expenses/utils/initialStates";

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
export const foodNewState = atom({
  key: "foodNewState",
  default: initialNewFoodState,
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
const shops = [
  {
    label: "Manager",
    options: [
      { label: "Jack", value: "jack" },
      { label: "Lucy", value: "lucy" },
    ],
  },
  {
    label: "Engineer",
    options: [{ label: "yiminghe", value: "Yiminghe" }],
  },
];
const initialValueShops = [
  { label: "Ikea", value: "Ikea" },
  { label: "Coop", value: "Coop" },
  { label: "Maxi ICA", value: "ICA" },
  { label: "Lidl", value: "Lidl" },
  { label: "Alcampo", value: "Alcampo" },
  { label: "Mercadona", value: "Mercadona" },
  { label: "Carrefour", value: "Carrefour" },
  { label: "Dia", value: "Dia" },
  { label: "Aldi", value: "Aldi" },
  { label: "Eroski", value: "Eroski" },
  { label: "Leroy Merlin", value: "Leroy Merlin" },
  { label: "Bricomart", value: "Bricomart" },
  { label: "Bricodepot", value: "Bricodepot" },
  { label: "Decathlon", value: "Decathlon" },
  { label: "Media Markt", value: "Media Markt" },
  { label: "El Corte Inglés", value: "El Corte Inglés" },
  { label: "Zara", value: "Zara" },
  { label: "Pull & Bear", value: "Pull & Bear" },
  { label: "Bershka", value: "Bershka" },
  { label: "Stradivarius", value: "Stradivarius" },
  { label: "H&M", value: "H&M" },
  { label: "Bimba y Lola", value: "Bimba y Lola" },
  { label: "Massimo Dutti", value: "Massimo Dutti" },
  { label: "Oysho", value: "Oysho" },
];
export const yourShopsAtom = atom({
  key: "yourShopsAtom",
  default: initialValueShops,
});
