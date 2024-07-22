import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, Tooltip, Legend, ArcElement } from "chart.js/auto";

type PieChartProps = {
  userHealthSpent: string;
  userGroceriesSpent: string;
  userShoppingSpent: string;
  userGiftsSpent: string;
  userBillsSpent: string;
  userEatingOutSpent: string;
  userEntertainmentSpent: string;
  userTransportSpent: string;
};

const PieChart = ({
  userHealthSpent,
  userGroceriesSpent,
  userShoppingSpent,
  userGiftsSpent,
  userBillsSpent,
  userEntertainmentSpent,
  userEatingOutSpent,
  userTransportSpent,
}: PieChartProps) => {
  ChartJS.register(Tooltip, Legend, ArcElement);

  const options = {
    plugins: {
      title: {
        display: true,
        text: "Amount spent by category",
        position: "top" as "top",
        padding: {
          top: 10,
          bottom: 10,
        },
      },
      legend: {
        position: "bottom" as "bottom",
      },
    },};

  const pieChartData = {
    labels: [
      "Bills",
      "Health",
      "Transport",
      "Groceries",
      "Eating Out",
      "Entertainment",
      "Shopping",
      "Gifts",
    ],
    datasets: [
      {
        label: "Amount spent",
        data: [
          userBillsSpent,
          userHealthSpent,
          userTransportSpent,
          userGroceriesSpent,
          userEatingOutSpent,
          userEntertainmentSpent,
          userShoppingSpent,
          userGiftsSpent,
        ],
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF", "#FF9F40", "#E7E9ED", "#9AD0F5"],
        hoverOffSet: 4,
      },
    ],
  };

  return (
    <div>
      <Pie options={options} data={pieChartData} />
    </div>
  );
};

export default PieChart;
