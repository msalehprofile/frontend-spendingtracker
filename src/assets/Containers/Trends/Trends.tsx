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

type TrendsProps = {
  daysInMonth: number[];
  usersCurrentMonthSpends: SubmittedSpends[];
  today: Date;
  usersAllTimeSpends: SubmittedSpends[];
}

const Trends = ({daysInMonth, usersCurrentMonthSpends, today, usersAllTimeSpends}: TrendsProps) => {
  const [spendsByDay, setSpendsByDay] = useState<number[]>([]);

  useEffect(() => {
    const startingSpends: number[] = [];

    for (let i=0; i < daysInMonth.length; i++) {
      startingSpends.push(0)
    }

    setSpendsByDay(startingSpends);
    getAmountSpentPerDay()
  }, [usersCurrentMonthSpends]);
  
  const getAmountSpentPerDay = () => {
    let dailySpendsToAmends = Array(daysInMonth.length).fill(0); 
    for (let i=0; i < usersCurrentMonthSpends.length; i++) {
      const date: number = Number(usersCurrentMonthSpends[i].date.slice(8))
      if (dailySpendsToAmends[date] !== undefined) {
        dailySpendsToAmends[date] += usersCurrentMonthSpends[i].amount;
      } else {
        dailySpendsToAmends[date] = usersCurrentMonthSpends[i].amount;  
      }
    }
    setSpendsByDay(dailySpendsToAmends)
  }
  
  ChartJS.register(CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend);

    const options = {};

    const barChartData = {
      labels: daysInMonth,
      datasets: [
        {
          label: "Amount spent ber day (£)",
          data: spendsByDay,
        }
      ]
    }

  return (
    <div className="trends">
      <Header />
      <h2 className="trends__date">{String(`${today.getDate()} / ${today.getMonth()+1} / ${today.getFullYear()}`)}</h2>
      <Bar options={options} data={barChartData}/>
      <h2 className="trends__heading">Recent Transactions:</h2>
      {usersAllTimeSpends.map((spend) => <TransactionTile vendor={spend.vendor} amount={spend.amount} category={spend.category} date={spend.date}/>)}
      <DashboardNav />
    </div>
  );
};

export default Trends;
