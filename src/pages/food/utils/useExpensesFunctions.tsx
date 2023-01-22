import axios from "axios";
import PATH from "src/utils/path";
import { useSetRecoilState } from "recoil";
import { expensesState } from "src/state/Atoms";

const useExpensesFunctions = () => {
  const setExpenses = useSetRecoilState(expensesState);

  return {
    getExpenses: async () => {
      try {
        const res = await axios.get(PATH.API.EXPENSES);

        setExpenses(res.data);
      } catch (error) {
        console.log(error);
      }
    },
    getExpenseByID: async (id: number) => {
      try {
        const res = await axios.get(`${PATH.API.EXPENSES}/${id}`);
        setExpenses(res.data);
      } catch (error) {
        return error;
      }
    },
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
