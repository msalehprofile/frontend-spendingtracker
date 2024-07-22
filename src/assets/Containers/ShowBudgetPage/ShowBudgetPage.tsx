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
  userTransportSpent: string;
  today: Date;
  userBudget: UserBudget | undefined;
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
  userBudget,
  userTransportSpent
}: ShowSpentPageProps) => {

  const [noBudget, setNoBudget] = useState<boolean>(true);
  const lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
  const currentMixOfMonth = today.getDate() / lastDayOfMonth.getDate();
  const [moneySpentVsTargetSpend, setMoneySpentVsTargetSpend] =
    useState<string>("");
  const [overBudget, setOverBudget] = useState<boolean>(false);
  const [underBudget, setUnderBudget] = useState<boolean>(false);
  const [onBudget, setOnBudget] = useState<boolean>(false);

  const calculateSpendPerformance = () => {
    if (userBudget == undefined) {
      setNoBudget(true);
    } else {
      let mix = userBudget.monthlyIncome * currentMixOfMonth;
      let targetVsSpent = (mix - amountSpentInCurrentMonth).toFixed(2);
      setMoneySpentVsTargetSpend((targetVsSpent));
      setNoBudget(false);
    }
    confirmVarToBudget();
  };

  const confirmVarToBudget = () => {
    if (Number(moneySpentVsTargetSpend) < -50) {
      setOverBudget(true);
      setUnderBudget(false);
      setOnBudget(false);
    } else if (Number(moneySpentVsTargetSpend) > 50) {
      setOverBudget(false);
      setUnderBudget(true);
      setOnBudget(false);
    } else {
      setOverBudget(false);
      setUnderBudget(false);
      setOnBudget(true);
    }
  };

  console.log(userEntertainmentSpent)

  useEffect(() => {
    calculateSpendPerformance();
  }, [userBudget]);

  return (
    <div>
      <Header brandName={brandName} />
      <div className="budget-page">
        <h2 className="budget-page__heading">Monthly Spends </h2>
        <p className="budget-page__income">
          £{userBudget?.monthlyIncome} income for the month
        </p>
        <p className="budget-page__comment">
          See how you are tracking compared to your budget:
        </p>
        <p className="budget-page__subheading">Total:</p>
        <p className="budget-page__spent">
          £{amountSpentInCurrentMonth} out of £{userBudget?.monthlyIncome} spent
        </p>
        {noBudget && (
          <p className="budget-page__spent">You haven't set a budget yet</p>
        )}
        {overBudget &&  (
          <p className="budget-page__spent">You are currently £{String(Number(moneySpentVsTargetSpend)*-1)} over budget.</p>
        )}
         {underBudget &&  (
          <p className="budget-page__spent">You are currently £{moneySpentVsTargetSpend} under budget.</p>
        )}
        {onBudget && !noBudget &&(
          <p className="budget-page__spent">You are currently spending how much you planned.</p>
        )}
        <p className="budget-page__subheading">Bills:</p>
        <p className="budget-page__spent">
          £{userBillsSpent} out of £{userBudget?.bills} spent
        </p>
        <p className="budget-page__subheading">Transport:</p>
        <p className="budget-page__spent">
          £{userTransportSpent} out of £{userBudget?.transport} spent
        </p>
        <p className="budget-page__subheading">Groceries:</p>
        <p className="budget-page__spent">
          £{userGroceriesSpent} out of £{userBudget?.groceries} spent
        </p>
        <p className="budget-page__subheading">Health:</p>
        <p className="budget-page__spent">
          £{userHealthSpent} out of £{userBudget?.health} spent
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
        <Link to="/setsbudgets">
          <Button label="Update budgets" color="primary" size="medium" />
        </Link>
      </div>
      <DashboardNav />
    </div>
  );
};

export default ShowSpentPage;
