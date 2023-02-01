import { actualDate, actualHourMinutes } from "src/utils/date";

export const initialNewExpenseState = {
  name: "",
  price: 100,
  amount: 1,
  date: actualDate,
  time: actualHourMinutes,
  category: "",
  isMinus: true,
  shop: "",
};

export interface IExpense {
  id: number;
  name: string;
  price: number;
  amount: number;
  date: string;
  time: string;
  category: string;
  shop: string;
  isMinus: boolean;
  userID: number;
}
