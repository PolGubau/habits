export const initialNewFoodState = {
  name: "",
  location: "",
  date: new Date().toISOString().slice(0, 10),
  time: new Date().toISOString().slice(11, 16),
  ingredients: [""],
};

export interface IFood {
  id: number;
  name: string;
  location: string;
  date: string;
  time: string;
  ingredients: string[];
  userID: number;
}
