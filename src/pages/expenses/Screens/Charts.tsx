import React from "react";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";
import { useRecoilValue } from "recoil";
import { expensesState } from "src/Recoil/Atoms";

const LineChartScreen = () => {
  const data = useRecoilValue(expensesState);

  const [width, setWidth] = React.useState(0);

  React.useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    setWidth(window.innerWidth);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const percent = width / 100;
  return (
    <LineChart width={percent * 60} height={300} data={data}>
      <Line type="monotone" dataKey="price" stroke="#8884d8" />
      <CartesianGrid stroke="#ddd" />
      <XAxis dataKey="date" />
      <YAxis />
      <Legend />
      <Tooltip />
    </LineChart>
  );
};

export default LineChartScreen;
