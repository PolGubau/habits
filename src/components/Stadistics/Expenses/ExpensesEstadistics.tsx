import { Statistic } from "antd";
import { ArrowDownOutlined, ArrowUpOutlined } from "@ant-design/icons";
import { StadisticsStyled } from "./Style";
import { useRecoilValue } from "recoil";
import { expensesState } from "src/Recoil/Atoms";
import { getTotalExpenses } from "src/utils/functions/expenses/moneyFunctions";

const ExpensesEstadistics = () => {
  const expenses = useRecoilValue(expensesState);
  const { positiveTotal, negativeTotal, totalBalance } =
    getTotalExpenses(expenses);
  return (
    <StadisticsStyled>
      <div className="estadisticas">
        <Statistic
          className="stadistic"
          title="Ingresos"
          value={positiveTotal}
          precision={2}
          valueStyle={{ color: "#3f8600" }}
          prefix={<ArrowUpOutlined />}
          suffix="€"
        />
        <Statistic
          className="stadistic"
          title="Gastos"
          value={negativeTotal}
          precision={2}
          valueStyle={{ color: "#cf1322" }}
          prefix={<ArrowDownOutlined />}
          suffix="€"
        />
        <Statistic
          className="stadistic"
          title="Ganacias"
          value={totalBalance}
          precision={2}
          suffix="€"
        />
      </div>
    </StadisticsStyled>
  );
};

export default ExpensesEstadistics;
