import axios from "axios";
import PATH from "src/utils/path";
import { useSetRecoilState } from "recoil";
import { expensesState } from "src/Recoil/Atoms";

const useExpensesFunctions = () => {
  const setExpenses = useSetRecoilState(expensesState);

  return {
    getExpenses: async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user") || "");
        const { id } = user;
        const userID = id;
        const res = await axios.get(`${PATH.API.EXPENSES}`, {
          params: { userID },
        });
        setExpenses(res.data);
      } catch (error) {
        console.log(error);
      }
    },

    //

    getExpenseByID: async (id: number) => {
      try {
        const res = await axios.get(`${PATH.API.EXPENSES}/${id}`);
        setExpenses(res.data);
      } catch (error) {
        return error;
      }
    },

    //

    deleteExpense: async (id: number) => {
      try {
        await axios.delete(`${PATH.API.EXPENSES}/${id}`);
        setExpenses((oldExpenses) =>
          oldExpenses.filter((expense: any) => expense.id !== id)
        );
      } catch (error) {
        console.log(error);
      }
    },
  };
};

export default useExpensesFunctions;
