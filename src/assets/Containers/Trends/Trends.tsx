import DashboardNav from "../../Components/DashboardNav/DashboardNav";
import Header from "../../Components/Header/Header";
import { SubmittedSpends } from "../../DataTypes/DataTypes";
import "./Trends.scss";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js/auto";
import { useEffect, useState } from "react";
import TransactionTile from "../../Components/TransactionTile/TransactionTile";
import PieChart from "../../Components/PieChart/PieChart";
import Button from "../../Components/Button/Button";

type TrendsProps = {
  daysInMonth: number[];
  usersCurrentMonthSpends: SubmittedSpends[];
  today: Date;
  listOfUsersAllTimeSpends: SubmittedSpends[];
  brandName: string;
  amountSpentInCurrentMonth: number;
  variance: number;
  spendEqualToLastMonth: boolean;
  spendDifferenceVsLastMonth: boolean;
  userFirstName: string;
  userHealthSpent: string;
  userGroceriesSpent: string;
  userShoppingSpent: string;
  userGiftsSpent: string;
  userBillsSpent: string;
  userEatingOutSpent: string;
  userEntertainmentSpent: string;
  userTransportSpent: string;
};

const Trends = ({
  daysInMonth,
  usersCurrentMonthSpends,
  today,
  listOfUsersAllTimeSpends,
  brandName,
  amountSpentInCurrentMonth,
  variance,
  spendEqualToLastMonth,
  userFirstName,
  spendDifferenceVsLastMonth,
  userHealthSpent,
  userGroceriesSpent,
  userShoppingSpent,
  userGiftsSpent,
  userBillsSpent,
  userEntertainmentSpent,
  userEatingOutSpent,
  userTransportSpent,
}: TrendsProps) => {
  const [spendsByDay, setSpendsByDay] = useState<number[]>([]);
  const [pieChart, setPieChart] = useState<boolean>(true);
  const [barChart, setBarChart] = useState<boolean>(false);

  useEffect(() => {
    const startingSpends: number[] = [];

    for (let i = 0; i < daysInMonth.length; i++) {
      startingSpends.push(0);
    }

    setSpendsByDay(startingSpends);
    getAmountSpentPerDay();
  }, [usersCurrentMonthSpends]);

  const getAmountSpentPerDay = () => {
    let dailySpendsToAmends = Array(daysInMonth.length).fill(0);
    for (let i = 0; i < usersCurrentMonthSpends.length; i++) {
      const date: number = Number(usersCurrentMonthSpends[i].date.slice(8));
      if (dailySpendsToAmends[date] !== undefined) {
        dailySpendsToAmends[date] += usersCurrentMonthSpends[i].amount;
      } else {
        dailySpendsToAmends[date] = usersCurrentMonthSpends[i].amount;
      }
    }
    setSpendsByDay(dailySpendsToAmends);
  };

  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );

  const options = {
    scales: {
      y: {
        beginAtZero: true,
        max: Math.max(...spendsByDay) + 10,
      },
    },
    plugins: {
      title: {
        display: true,
        text: "Amount spent per day (£)",
        position: "bottom" as "bottom",
        padding: {
          top: 10,
          bottom: 0,
        },
      },
      legend: {
        display: false,
      },
    },
  };

  const barChartData = {
    labels: daysInMonth,
    datasets: [
      {
        label: "Amount spent (£)",
        data: spendsByDay,
        backgroundColor: ["#92ddce"],
        borderColor: ["#92ddce"],
        borderWidth: 3,
      },
    ],
  };

  const handleClickSpendsByDay = () => {
    setBarChart(true);
    setPieChart(false);
  };

  const handleClickCats = () => {
    setBarChart(false);
    setPieChart(true);
  };
  return (
    <>
      <Header brandName={brandName} />
      <div className="trends">
        <h2 className="trends__date">
          {String(
            `${today.getDate()} / ${
              today.getMonth() + 1
            } / ${today.getFullYear()}`
          )}
        </h2>
        <h2 className="trends__heading">
          {userFirstName} here are your trends:
        </h2>
        <div className="trends__buttons">
          <Button
            onClick={handleClickSpendsByDay}
            label="By day"
            size="medium"
            color="primary"
          />
          <Button
            onClick={handleClickCats}
            label="By category"
            size="medium"
            color="primary"
          />
        </div>
        {barChart && <Bar options={options} data={barChartData} />}
        {pieChart && (
          <PieChart
            userHealthSpent={userHealthSpent}
            userGroceriesSpent={userGroceriesSpent}
            userShoppingSpent={userShoppingSpent}
            userGiftsSpent={userGiftsSpent}
            userBillsSpent={userBillsSpent}
            userEatingOutSpent={userEatingOutSpent}
            userEntertainmentSpent={userEntertainmentSpent}
            userTransportSpent={userTransportSpent}
          />
        )}
        <h2 className="trends__spends">
          Total spent this month: £{amountSpentInCurrentMonth}
        </h2>
        {spendDifferenceVsLastMonth && (
          <h2 className="trends__comparison">
            This is {variance}% vs last month!
          </h2>
        )}
        {spendEqualToLastMonth && (
          <h2 className="trends__comparison">
            This is the same amount as last month!
          </h2>
        )}
        <h2 className="trends__heading">Recent Transactions:</h2>
        {listOfUsersAllTimeSpends.map((spend) => (
          <TransactionTile
            key={spend.id}
            vendor={spend.vendor}
            amount={Number(spend.amount).toFixed(2)}
            category={spend.category}
            date={spend.date}
          />
        ))}
      </div>
      <DashboardNav />
    </>
  );
};

export default Trends;
