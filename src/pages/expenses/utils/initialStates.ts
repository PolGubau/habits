export const initialState = {
  name: "",
  amount: 0,
  date: new Date().toISOString().slice(0, 10),
  time: new Date().toISOString().slice(11, 16),
  category: "",
  shop: "",
};

export interface IExpense {
  id: number;
  name: string;
  amount: number;
  date: string;
  time: string;
  category: string;
  shop: string;
  userID: number;
}
