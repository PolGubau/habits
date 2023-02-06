import { actualDate, actualHourMinutes } from "src/utils/date";

export const initialNewExpenseState = {
  id: 0,
  name: "",
  price: 100,
  amount: 1,
  date: actualDate,
  time: actualHourMinutes,
  category: "Fruit",
  isMinus: true,
  shop: "Mercadona",
  currency: "EURO",
};

export interface IExpense {
  id?: number;
  name: string;
  price: number;
  amount: number;
  date: string;
  time: string;
  category: string;
  shop: string;
  isMinus: boolean;
  currency: string;
  userID: number;
}
