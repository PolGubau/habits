import axios from "axios";
import PATH from "src/utils/path";
import { useSetRecoilState } from "recoil";
import { expensesState } from "src/Recoil/Atoms";

const useFoodFunctions = () => {
  const setExpenses = useSetRecoilState(expensesState);

  return {
    getFood: async () => {
      try {
        const res = await axios.get(PATH.API.FOOD);
        setExpenses(res.data);
      } catch (error) {
        console.log(error);
      }
    },
    getFoodByID: async (id: number) => {
      try {
        const res = await axios.get(`${PATH.API.FOOD}/${id}`);
        setExpenses(res.data);
      } catch (error) {
        return error;
      }
    },
    deleteFood: async (id: number) => {
      try {
        await axios.delete(`${PATH.API.FOOD}/${id}`);
        setExpenses((oldExpenses) =>
          oldExpenses.filter((expense: any) => expense.id !== id)
        );
      } catch (error) {
        console.log(error);
      }
    },
  };
};

export default useFoodFunctions;
