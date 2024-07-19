import { useEffect, useState } from "react";
import DashboardNav from "../../Components/DashboardNav/DashboardNav";
import Header from "../../Components/Header/Header";
import "./ShowBudgetPage.scss";
import { SubmittedSpends, UserBudget } from "../../DataTypes/DataTypes";
import Button from "../../Components/Button/Button";
import { Link } from "react-router-dom";

type ShowSpentPageProps = {
  brandName: string;
  amountSpentInCurrentMonth: number;
  userHealthSpent: string;
  userGroceriesSpent: string;
  userShoppingSpent: string;
  userGiftsSpent: string;
  userBillsSpent: string;
  userEatingOutSpent: string;
  userEntertainmentSpent: string;
  today: Date;
};

const ShowSpentPage = ({
  brandName,
  amountSpentInCurrentMonth,
  userHealthSpent,
  userGroceriesSpent,
  userShoppingSpent,
  userGiftsSpent,
  userBillsSpent,
  userEntertainmentSpent,
  userEatingOutSpent,
  today,
}: ShowSpentPageProps) => {
  const [userBudget, setUserBudget] = useState<UserBudget>();
  const [noBudget, setNoBudget] = useState<boolean>(true)
  const lastDayOfMonth =  new Date(today.getFullYear(), today.getMonth() + 1, 0);
  const currentMixOfMonth = today.getDate() / lastDayOfMonth.getDate();
  const [targetMixOfMonthsBudget, setTargetMixOfMonthsBudget] = useState<number>(0)
  const [moneySpentVsTargetSpend, setMoneySpentVsTargetSpend] = useState<number>(0)
  

  const calculateSpendPerformance = () => {
    console.log(lastDayOfMonth)
    console.log(currentMixOfMonth)
    let mix = 2000 * currentMixOfMonth
    setTargetMixOfMonthsBudget(mix)
    console.log(targetMixOfMonthsBudget)
    setMoneySpentVsTargetSpend(targetMixOfMonthsBudget - amountSpentInCurrentMonth)
    // if(userBudget == undefined ) {
    //   setNoBudget(true)
    // } else {
    //   setNoBudget(false)
    //   targetMixOfMonthsBudget = 1000 / today.getDate()
    //   moneySpentVsTargetSpend = targetMixOfMonthsBudget - amountSpentInCurrentMonth 
    // }
  }

  console.log("target", targetMixOfMonthsBudget)
  console.log("left", moneySpentVsTargetSpend)

  useEffect(() => {
    calculateSpendPerformance();
  }, []);

  return (
    <div>
      <Header brandName={brandName} />
      <div className="budget-page">
      <h2 className="budget-page__heading">Monthly Spents </h2>
      <p className="budget-page__income">£{userBudget?.monthlyIncome} income for the month</p>
      <p className="budget-page__comment">See how you are tracking compared to your budget:</p>
      <p className="budget-page__subheading">Total:</p>
      <p className="budget-page__spent">
        £{amountSpentInCurrentMonth} out of £{userBudget?.monthlyIncome} spent
      </p>
      {noBudget && <p className="budget-page__spent">
        £{amountSpentInCurrentMonth} out of £{userBudget?.monthlyIncome} spent
      </p>}
      
      <p className="budget-page__subheading">Bills:</p>
      <p className="budget-page__spent">
        £{userBillsSpent} out of £{userBudget?.bills} spent
      </p>
      <p className="budget-page__subheading">Eating Out:</p>
      <p className="budget-page__spent">
        £{userEatingOutSpent} out of £{userBudget?.eatingOut} spent
      </p>
      <p className="budget-page__subheading">Entertainment:</p>
      <p className="budget-page__spent">
        £{userEntertainmentSpent} out of £{userBudget?.entertainment} spent
      </p>
      <p className="budget-page__subheading">Gifts:</p>
      <p className="budget-page__spent">
        £{userGiftsSpent} out of £{userBudget?.gifts} spent
      </p>
      <p className="budget-page__subheading">Shopping:</p>
      <p className="budget-page__spent">
        £{userShoppingSpent} out of £{userBudget?.shopping} spent
      </p>
      <p className="budget-page__subheading">Groceries:</p>
      <p className="budget-page__spent">
        £{userGroceriesSpent} out of £{userBudget?.groceries} spent
      </p>
      <p className="budget-page__subheading">Health:</p>
      <p className="budget-page__spent">
        £{userHealthSpent} out of £{userBudget?.health} spent
      </p>
      <Link to="/setsbudgets">
        <Button label="Update budgets" color="primary" size="medium" />
      </Link>
      </div>
      <DashboardNav />
    </div>
  );
};

export default ShowSpentPage;
