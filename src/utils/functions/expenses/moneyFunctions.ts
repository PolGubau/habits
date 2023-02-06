import { convertToEuro } from "src/utils/currency";
import { IExpense } from "src/utils/initialStates";

export const getTotalExpenses = (expenses: IExpense[]) => {
  const positiveExpenses = expenses.filter((expense) => !expense.isMinus);
  const negativeExpenses = expenses.filter((expense) => expense.isMinus);

  const positiveTotal = positiveExpenses.reduce((acc, expense) => {
    return acc + convertToEuro(expense.currency, expense.price);
  }, 0);

  const negativeTotal = negativeExpenses.reduce((acc, expense) => {
    return acc + convertToEuro(expense.currency, expense.price);
  }, 0);

  const totalBalance = positiveTotal - negativeTotal;

  return { positiveTotal, negativeTotal, totalBalance };
};
